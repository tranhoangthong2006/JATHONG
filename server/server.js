import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import mongoose from 'mongoose';
import dns from 'dns';
import Contact from './models/Contact.js';
import Setting from './models/Setting.js';

// Khắc phục lỗi DNS SRV (ECONNREFUSED) trên Node.js
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
const MONGODB_URL = process.env.MONGODB_URL;
if (MONGODB_URL) {
  mongoose.connect(MONGODB_URL)
    .then(() => console.log('Đã kết nối thành công với MongoDB Atlas'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));
} else {
  console.warn("CẢNH BÁO: Chưa cấu hình MONGODB_URL trong file .env");
}

let doc;
try {
  // Đọc credentials từ file JSON
  const credentials = JSON.parse(fs.readFileSync('./google-credentials.json'));
  
  // Khởi tạo JWT Auth
  const jwt = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  // Khởi tạo Google Spreadsheet với ID từ .env
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  if (SHEET_ID) {
    doc = new GoogleSpreadsheet(SHEET_ID, jwt);
    console.log('Đã cấu hình Google Sheets kết nối qua Service Account.');
  } else {
    console.warn("CẢNH BÁO: Chưa cấu hình GOOGLE_SHEET_ID trong file .env");
  }
} catch (error) {
  console.error("Lỗi khi đọc file google-credentials.json. Hãy chắc chắn file tồn tại và đúng định dạng.", error.message);
}

app.use(cors());
app.use(express.json());

// API kiểm tra server
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server đang hoạt động' });
});

// API nhận form liên hệ và gửi đến Google Sheets
app.post('/api/lien-he', async (req, res) => {
  try {
    const { hoTen, email, soDienThoai, dichVu, goiDichVu, tinNhan } = req.body;

    if (!hoTen || !email || !soDienThoai || !dichVu || !tinNhan) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    // Kiểm tra trạng thái quá tải
    const setting = await Setting.findOne();
    if (setting && setting.isOverloaded) {
      return res.status(403).json({ message: 'Hệ thống hiện đang tạm ngưng nhận yêu cầu do quá tải. Mong quý khách thông cảm.' });
    }

    // 1. LƯU VÀO MONGODB (PRIORITY 1)
    let newContact;
    try {
      newContact = new Contact({ hoTen, email, soDienThoai, dichVu, goiDichVu, tinNhan });
      await newContact.save();
      console.log('Đã lưu contact vào MongoDB thành công!');
    } catch (dbError) {
      console.error('Lỗi lưu vào MongoDB:', dbError);
      return res.status(500).json({ message: 'Lỗi Database: Không thể lưu trữ dữ liệu.' });
    }

    // 2. GHI VÀO GOOGLE SHEETS (PRIORITY 2)
    try {
      if (doc) {
        await doc.loadInfo(); 
        let sheet = doc.sheetsByTitle['bang-lienhe'];

        if (!sheet) {
          const availableSheets = Object.keys(doc.sheetsByTitle).join(', ');
          console.warn(`[CẢNH BÁO] Không tìm thấy tab tên 'bang-lienhe'. Sẽ tự động dùng tab đầu tiên. Các tab hiện có: ${availableSheets}`);
          sheet = doc.sheetsByIndex[0]; // Fallback về sheet đầu tiên
        }

        if (sheet) {
          const ngayGui = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
          // Order: Họ và Tên, Email, Dịch Vụ, Gói Dịch Vụ, Tin Nhắn, Số Điện Thoại, Ngày Gửi
          await sheet.addRow([hoTen, email, dichVu, goiDichVu || '', tinNhan, soDienThoai, ngayGui]);
          console.log('Gửi dữ liệu thành công vào Google Sheets!');
        } else {
           console.warn('Lỗi: Bảng tính không có bất kỳ sheet nào.');
        }
      } else {
        console.warn('Bỏ qua Google Sheets do chưa cấu hình.');
      }
    } catch (sheetError) {
      console.error('Lỗi lưu vào Google Sheets (Dữ liệu vẫn an toàn trong MongoDB):', sheetError.message);
      // Không throw error để Client vẫn nhận được success response
    }

    res.status(200).json({ message: 'Gửi thành công! Chúng tôi sẽ liên hệ bạn sớm.' });

  } catch (error) {
    console.error('Lỗi chi tiết:', error.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu, vui lòng thử lại.' });
  }
});

// Middleware xác thực Admin
const adminAuth = (req, res, next) => {
  const adminPass = req.headers['x-admin-password'];
  if (adminPass && process.env.ADMIN_PASSWORD && adminPass.trim() === process.env.ADMIN_PASSWORD.trim()) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// API lấy danh sách contact cho Admin
app.get('/api/contacts', adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu.' });
  }
});

// API cập nhật trạng thái contact
app.put('/api/contacts/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'replied'].includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { trangThai: status },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Không tìm thấy contact.' });
    }
    
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái.' });
  }
});

// API xóa contact
app.delete('/api/contacts/:id', adminAuth, async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Không tìm thấy contact.' });
    }
    res.status(200).json({ message: 'Xóa thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa dữ liệu.' });
  }
});

// API lấy trạng thái hệ thống
app.get('/api/settings', async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ isOverloaded: false });
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy cấu hình.' });
  }
});

// API cập nhật chế độ quá tải
app.put('/api/settings/overload', adminAuth, async (req, res) => {
  try {
    const { isOverloaded } = req.body;
    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting({ isOverloaded });
    } else {
      setting.isOverloaded = isOverloaded;
    }
    await setting.save();
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật cấu hình.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});
