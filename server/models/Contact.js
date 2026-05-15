import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    hoTen: { type: String, required: true },
    email: { type: String, required: true },
    dichVu: { type: String },
    goiDichVu: { type: String },
    tinNhan: { type: String },
    soDienThoai: { type: String },
    // Bonus thêm trường quản lý nội bộ
    trangThai: { type: String, default: 'new' } 
}, { 
    // Tự động tạo cột "createdAt" (Ngày Gửi) và "updatedAt"
    timestamps: true 
});

const Contact = mongoose.model('contacts', ContactSchema);

export default Contact;
