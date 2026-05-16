import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

const extraServicesList = [
  "Bảo hành kỹ thuật (01 tháng đầu)",
  "Duy trì cơ bản (399K/tháng)",
  "Duy trì tiêu chuẩn (999K/tháng)",
  "Duy trì nâng cao (1.299K/tháng)",
  "Thiết kế cơ bản (1.000K)",
  "Thiết kế tiêu chuẩn (1.000K – 2.500K)",
  "Thiết kế nâng cao (Liên hệ)"
];

const TrangLienHe = () => {
  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    dichVu: 'Student Landing',
    tinNhan: ''
  });
  
  const [dichVuPhu, setDichVuPhu] = useState([]); // Chứa danh sách các gói phụ được chọn
  const [trangThai, setTrangThai] = useState(''); // '', 'dang_gui', 'thanh_cong', 'loi'
  const [thongBao, setThongBao] = useState('');
  const [isOverloaded, setIsOverloaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/settings`);
        if (res.ok) {
          const data = await res.json();
          setIsOverloaded(data.isOverloaded);
        }
      } catch (err) {
        console.error('Lỗi lấy cấu hình:', err);
      }
    };
    
    fetchSettings(); // Lần đầu tiên
    const intervalId = setInterval(fetchSettings, 5000); // Lặp lại mỗi 5 giây
    return () => clearInterval(intervalId); // Dọn dẹp khi unmount
  }, []);

  useEffect(() => {
    if (location.state) {
      if (location.state.selectedService) {
        setFormData(prev => ({ ...prev, dichVu: location.state.selectedService }));
      }
      if (location.state.note) {
        setFormData(prev => ({ ...prev, tinNhan: location.state.note }));
      }
      if (location.state.selectedAddon) {
        const matchedAddon = extraServicesList.find(s => s.startsWith(location.state.selectedAddon));
        if (matchedAddon) {
          setDichVuPhu(prev => {
            if (!prev.includes(matchedAddon)) {
              return [...prev, matchedAddon];
            }
            return prev;
          });
        }
      }
    }
  }, [location.state]);

  const xuLyThayDoi = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const xuLyThayDoiPhu = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setDichVuPhu([...dichVuPhu, value]);
    } else {
      setDichVuPhu(dichVuPhu.filter(item => item !== value));
    }
  };

  const xuLyGuiForm = async (e) => {
    e.preventDefault();
    setTrangThai('dang_gui');

    // Gửi riêng dịch vụ chính và phụ
    const payload = {
      ...formData,
      goiDichVu: dichVuPhu.join(', ')
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/lien-he`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setTrangThai('thanh_cong');
        setThongBao(data.message);
        setFormData({ hoTen: '', email: '', soDienThoai: '', dichVu: 'Student Landing', tinNhan: '' });
        setDichVuPhu([]);
      } else {
        setTrangThai('loi');
        setThongBao(data.message);
      }
    } catch {
      setTrangThai('loi');
      setThongBao('Không thể kết nối đến server. Vui lòng thử lại.');
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-4 md:px-8 pt-4">
        <div className="animated-border-pill max-w-7xl mx-auto">
          <div className="animated-border-pill-inner bg-white px-6 py-3 flex justify-between items-center w-full">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-black">
            <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-white px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300">JATHONG</span></span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-medium text-sm">
            <FiArrowLeft className="text-lg" />
            <span className="hidden sm:inline">Quay Về Trang Chủ</span>
            <span className="sm:hidden">Quay Về</span>
          </Link>
        </div>
      </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 text-black">
              LIÊN HỆ <span className="viet-text-gradient">NGAY.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Điền thông tin bên dưới, chúng tôi sẽ phản hồi nhanh nhất có thể.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="viet-glass p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl border-2 border-gray-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            {isOverloaded ? (
              <div className="text-center py-10 md:py-16">
                <div className="text-5xl md:text-6xl mb-4 md:mb-6 animate-bounce">🥺🙏</div>
                <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 tracking-tight">Tạm Ngưng Nhận Khách</h3>
                <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed max-w-lg mx-auto">
                  Vì số lượng quá lớn JATHONG xin tạm ngưng không nhận thêm khách hàng, xin lỗi quý khách rất rất rất nhiều vì sự bất tiện này.
                </p>
              </div>
            ) : trangThai === 'thanh_cong' ? (
              <div className="text-center py-10 md:py-12">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <FiCheck className="text-white text-2xl md:text-3xl" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Gửi Thành Công!</h3>
                <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">{thongBao}</p>
                <button
                  onClick={() => setTrangThai('')}
                  className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Gửi Tin Nhắn Khác
                </button>
              </div>
            ) : (
              <form onSubmit={xuLyGuiForm} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-800 uppercase tracking-wide">Họ và Tên</label>
                    <input
                      type="text"
                      name="hoTen"
                      value={formData.hoTen}
                      onChange={xuLyThayDoi}
                      placeholder="Tên của bạn"
                      required
                      className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-800 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={xuLyThayDoi}
                      placeholder="email@example.com"
                      required
                      className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-800 uppercase tracking-wide">Số Điện Thoại</label>
                  <input
                    type="tel"
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    onChange={xuLyThayDoi}
                    placeholder="Số điện thoại của bạn"
                    required
                    className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Gói Dịch Vụ Chính */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-800 uppercase tracking-wide">Gói Dịch Vụ Chính (Bắt buộc)</label>
                  <select
                    name="dichVu"
                    value={formData.dichVu}
                    onChange={xuLyThayDoi}
                    className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors appearance-none font-bold"
                  >
                    <option value="Student Landing">Student Landing</option>
                    <option value="Personal Branding Web">Personal Branding Web</option>
                    <option value="Sales Landing Page">Sales Landing Page</option>
                    <option value="Business Website">Business Website</option>
                  </select>
                </div>

                {/* Gói Nâng Cấp & Bảo Trì */}
                <div className="flex flex-col gap-3 mt-2 p-6 bg-gray-50 border-2 border-gray-200 rounded-2xl">
                  <label className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 border-gray-200 pb-2 mb-2">Gói Nâng Cấp & Bảo Trì (Tùy chọn thêm)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {extraServicesList.map((service, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input
                            type="checkbox"
                            value={service}
                            checked={dichVuPhu.includes(service)}
                            onChange={xuLyThayDoiPhu}
                            className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:outline-none checked:bg-black checked:border-black transition-colors cursor-pointer"
                          />
                          <FiCheck className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs" />
                        </div>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-sm font-bold text-gray-800 uppercase tracking-wide">Tin Nhắn</label>
                  <textarea
                    name="tinNhan"
                    value={formData.tinNhan}
                    onChange={xuLyThayDoi}
                    rows="4"
                    placeholder="Hãy cho chúng tôi biết về tổng quan yêu cầu của bạn"
                    required
                    className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors resize-none"
                  ></textarea>
                </div>

                {trangThai === 'loi' && (
                  <div className="text-red-600 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-200">{thongBao}</div>
                )}

                <button
                  type="submit"
                  disabled={trangThai === 'dang_gui'}
                  className="mt-6 bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  {trangThai === 'dang_gui' ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-gray-50 text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-black cursor-pointer block">
            <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-white px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300">JATHONG</span></span>
          </Link>
          <div className="text-sm font-medium">&copy; {new Date().getFullYear()} JATHONG. Khách hàng là trên hết.</div>
        </div>
      </footer>
    </div>
  );
};

export default TrangLienHe;
