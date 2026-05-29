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

// Cấu hình không tự động treo lệnh khi MongoDB mất kết nối
mongoose.set('bufferCommands', false);

// Kết nối MongoDB
const MONGODB_URL = process.env.MONGODB_URL;
if (MONGODB_URL) {
  mongoose.connect(MONGODB_URL)
    .then(() => console.log('Đã kết nối thành công với MongoDB Atlas'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err.message));
} else {
  console.warn("CẢNH BÁO: Chưa cấu hình MONGODB_URL trong file .env");
}

// ==========================================
// CẤU HÌNH DATABASE LOCAL FALLBACK (FILE JSON)
// ==========================================
const LOCAL_CONTACTS_PATH = './data/contacts.json';
const LOCAL_SETTINGS_PATH = './data/settings.json';

// Tạo thư mục data nếu chưa có
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data', { recursive: true });
}

const readLocalContacts = () => {
  try {
    if (fs.existsSync(LOCAL_CONTACTS_PATH)) {
      return JSON.parse(fs.readFileSync(LOCAL_CONTACTS_PATH, 'utf8'));
    }
  } catch (err) {
    console.error('Lỗi đọc contacts offline:', err.message);
  }
  return [];
};

const writeLocalContacts = (contacts) => {
  try {
    fs.writeFileSync(LOCAL_CONTACTS_PATH, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (err) {
    console.error('Lỗi ghi contacts offline:', err.message);
  }
};

const readLocalSettings = () => {
  try {
    if (fs.existsSync(LOCAL_SETTINGS_PATH)) {
      return JSON.parse(fs.readFileSync(LOCAL_SETTINGS_PATH, 'utf8'));
    }
  } catch (err) {
    console.error('Lỗi đọc settings offline:', err.message);
  }
  return { isOverloaded: false };
};

const writeLocalSettings = (settings) => {
  try {
    fs.writeFileSync(LOCAL_SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf8');
  } catch (err) {
    console.error('Lỗi ghi settings offline:', err.message);
  }
};
// ==========================================

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
  console.log("Bỏ qua cấu hình Google Sheets do thiếu hoặc lỗi file google-credentials.json.");
}

app.use(cors());
app.use(express.json());

// API kiểm tra server
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server đang hoạt động' });
});

// API nhận form liên hệ và gửi đến Google Sheets + MongoDB/JSON
app.post('/api/lien-he', async (req, res) => {
  try {
    const { hoTen, email, soDienThoai, dichVu, goiDichVu, tinNhan } = req.body;

    if (!hoTen || !email || !soDienThoai || !dichVu || !tinNhan) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    // Kiểm tra trạng thái quá tải
    let isSystemOverloaded = false;
    try {
      if (mongoose.connection.readyState === 1) {
        const setting = await Setting.findOne();
        if (setting && setting.isOverloaded) isSystemOverloaded = true;
      } else {
        const setting = readLocalSettings();
        if (setting && setting.isOverloaded) isSystemOverloaded = true;
      }
    } catch (err) {
      console.warn("Không thể kiểm tra trạng thái quá tải từ DB, tiếp tục xử lý form.");
    }

    if (isSystemOverloaded) {
      return res.status(403).json({ message: 'Hệ thống hiện đang tạm ngưng nhận yêu cầu do quá tải. Mong quý khách thông cảm.' });
    }

    // 1. LƯU VÀO MONGODB HOẶC FILE LOCAL
    let newContact;
    try {
      if (mongoose.connection.readyState === 1) {
        newContact = new Contact({ hoTen, email, soDienThoai, dichVu, goiDichVu, tinNhan });
        await newContact.save();
        console.log('Đã lưu contact vào MongoDB thành công!');
      } else {
        console.log('Không có kết nối MongoDB, tự động lưu vào file local JSON...');
        const contacts = readLocalContacts();
        newContact = {
          _id: new Date().getTime().toString(),
          hoTen,
          email,
          soDienThoai,
          dichVu,
          goiDichVu: goiDichVu || '',
          tinNhan,
          trangThai: 'new',
          createdAt: new Date().toISOString()
        };
        contacts.push(newContact);
        writeLocalContacts(contacts);
        console.log('Đã lưu contact vào file local thành công!');
      }
    } catch (dbError) {
      console.error('Lỗi lưu vào DB/JSON:', dbError.message);
      return res.status(500).json({ message: 'Lỗi Database: Không thể lưu trữ dữ liệu.' });
    }

    // 2. GHI VÀO GOOGLE SHEETS
    try {
      const ngayGui = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      
      // Phương án A: Gửi qua Google Sheets Web App URL (Đường dẫn Apps Script Web App)
      const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
      if (webappUrl) {
        console.log('Đang gửi dữ liệu đến Google Sheets Web App...');
        fetch(webappUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hoTen, email, soDienThoai, dichVu, goiDichVu: goiDichVu || '', tinNhan, ngayGui })
        })
        .then(response => {
          console.log('Gửi dữ liệu đến Google Sheets Web App thành công! Status:', response.status);
        })
        .catch(err => {
          console.error('Lỗi gửi dữ liệu đến Google Sheets Web App:', err.message);
        });
      }

      // Phương án B: Gửi qua API Service Account (Nếu có cấu hình)
      if (doc) {
        await doc.loadInfo(); 
        let sheet = doc.sheetsByTitle['bang-lienhe'];

        if (!sheet) {
          const availableSheets = Object.keys(doc.sheetsByTitle).join(', ');
          console.warn(`[CẢNH BÁO] Không tìm thấy tab tên 'bang-lienhe'. Sẽ tự động dùng tab đầu tiên. Các tab hiện có: ${availableSheets}`);
          sheet = doc.sheetsByIndex[0]; // Fallback về sheet đầu tiên
        }

        if (sheet) {
          await sheet.addRow([hoTen, email, dichVu, goiDichVu || '', tinNhan, soDienThoai, ngayGui]);
          console.log('Gửi dữ liệu thành công vào Google Sheets (Service Account)!');
        } else {
           console.warn('Lỗi: Bảng tính không có bất kỳ sheet nào.');
        }
      } else if (!webappUrl) {
        console.warn('Bỏ qua Google Sheets do chưa cấu hình cả Service Account và Web App URL.');
      }
    } catch (sheetError) {
      console.error('Lỗi lưu vào Google Sheets (Dữ liệu vẫn an toàn):', sheetError.message);
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
// API lấy danh sách contact cho Admin (chỉ lấy liên hệ chưa bị xóa)
app.get('/api/contacts', adminAuth, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
      res.status(200).json(contacts);
    } else {
      const contacts = readLocalContacts();
      const activeContacts = contacts.filter(c => c.isDeleted !== true);
      activeContacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.status(200).json(activeContacts);
    }
  } catch (error) {
    console.error('Lỗi lấy danh sách contacts:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu.' });
  }
});

// API lấy danh sách contact đã xóa (trong Thùng Rác)
app.get('/api/contacts/trash', adminAuth, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find({ isDeleted: true }).sort({ updatedAt: -1 });
      res.status(200).json(contacts);
    } else {
      const contacts = readLocalContacts();
      const deletedContacts = contacts.filter(c => c.isDeleted === true);
      deletedContacts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      res.status(200).json(deletedContacts);
    }
  } catch (error) {
    console.error('Lỗi lấy thùng rác:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu thùng rác.' });
  }
});

// API khôi phục contact từ thùng rác
app.put('/api/contacts/:id/restore', adminAuth, async (req, res) => {
  try {
    let restoredContact;
    if (mongoose.connection.readyState === 1) {
      restoredContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { isDeleted: false },
        { new: true }
      );
    } else {
      const contacts = readLocalContacts();
      const contactIdx = contacts.findIndex(c => c._id === req.params.id);
      if (contactIdx !== -1) {
        contacts[contactIdx].isDeleted = false;
        restoredContact = contacts[contactIdx];
        writeLocalContacts(contacts);
      }
    }

    if (!restoredContact) {
      return res.status(404).json({ message: 'Không tìm thấy contact.' });
    }
    res.status(200).json(restoredContact);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi khôi phục contact.' });
  }
});

// API xóa vĩnh viễn contact
app.delete('/api/contacts/:id/permanent', adminAuth, async (req, res) => {
  try {
    let deletedContact;
    if (mongoose.connection.readyState === 1) {
      deletedContact = await Contact.findByIdAndDelete(req.params.id);
    } else {
      const contacts = readLocalContacts();
      const contactIdx = contacts.findIndex(c => c._id === req.params.id);
      if (contactIdx !== -1) {
        deletedContact = contacts[contactIdx];
        contacts.splice(contactIdx, 1);
        writeLocalContacts(contacts);
      }
    }

    if (!deletedContact) {
      return res.status(404).json({ message: 'Không tìm thấy contact.' });
    }
    res.status(200).json({ message: 'Xóa vĩnh viễn thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa vĩnh viễn dữ liệu.' });
  }
});

// API cập nhật trạng thái contact
app.put('/api/contacts/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'replied'].includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
    }
    
    let updatedContact;
    if (mongoose.connection.readyState === 1) {
      updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { trangThai: status },
        { new: true }
      );
    } else {
      const contacts = readLocalContacts();
      const contactIdx = contacts.findIndex(c => c._id === req.params.id);
      if (contactIdx !== -1) {
        contacts[contactIdx].trangThai = status;
        updatedContact = contacts[contactIdx];
        writeLocalContacts(contacts);
      }
    }
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Không tìm thấy contact.' });
    }
    
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái.' });
  }
});

// API xóa tạm thời contact (Đưa vào thùng rác)
app.delete('/api/contacts/:id', adminAuth, async (req, res) => {
  try {
    let deletedContact;
    if (mongoose.connection.readyState === 1) {
      deletedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
        { new: true }
      );
    } else {
      const contacts = readLocalContacts();
      const contactIdx = contacts.findIndex(c => c._id === req.params.id);
      if (contactIdx !== -1) {
        contacts[contactIdx].isDeleted = true;
        deletedContact = contacts[contactIdx];
        writeLocalContacts(contacts);
      }
    }
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Không tìm thấy contact.' });
    }
    res.status(200).json({ message: 'Đã đưa vào thùng rác.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đưa vào thùng rác.' });
  }
});

// API lấy trạng thái hệ thống
app.get('/api/settings', async (req, res) => {
  try {
    let setting;
    if (mongoose.connection.readyState === 1) {
      setting = await Setting.findOne();
      if (!setting) {
        setting = await Setting.create({ isOverloaded: false });
      }
    } else {
      setting = readLocalSettings();
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
    let setting;
    if (mongoose.connection.readyState === 1) {
      setting = await Setting.findOne();
      if (!setting) {
        setting = new Setting({ isOverloaded });
      } else {
        setting.isOverloaded = isOverloaded;
      }
      await setting.save();
    } else {
      setting = { isOverloaded };
      writeLocalSettings(setting);
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật cấu hình.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});
