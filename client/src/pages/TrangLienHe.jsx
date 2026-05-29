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
    <div className="bg-[#0A0D14] text-white min-h-screen relative overflow-hidden">
      {/* Background space/nebula elements */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-[#0077FF]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#0077FF]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 px-4 md:px-8 pt-4">
        <div className="animated-border-pill max-w-7xl mx-auto">
          <div className="animated-border-pill-inner bg-[#0A0D14]/80 backdrop-blur-xl px-6 py-3 flex justify-between items-center w-full border border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
              <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-[#0A0D14] px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300">JATHONG</span></span>
            </Link>
            <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-[#00B8FF] transition-colors font-medium text-sm font-orbitron uppercase tracking-wider">
              <FiArrowLeft className="text-lg" />
              <span className="hidden sm:inline">Quay Về Trang Chủ</span>
              <span className="sm:hidden">Quay Về</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-extrabold tracking-tight mb-4 md:mb-6 text-white uppercase">
              LIÊN HỆ <span className="viet-text-gradient font-orbitron">NGAY.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl font-light">
              Điền thông tin bên dưới, chúng tôi sẽ phản hồi nhanh nhất có thể.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="luxury-card p-6 sm:p-8 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
          >
            {isOverloaded ? (
              <div className="text-center py-10 md:py-16">
                <div className="text-5xl md:text-6xl mb-4 md:mb-6 animate-bounce">🥺🙏</div>
                <h3 className="text-2xl md:text-3xl font-orbitron font-black mb-3 md:mb-4 tracking-tight text-white">Tạm Ngưng Nhận Khách</h3>
                <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-lg mx-auto">
                  Vì số lượng quá lớn JATHONG xin tạm ngưng không nhận thêm khách hàng, xin lỗi quý khách rất rất rất nhiều vì sự bất tiện này.
                </p>
              </div>
            ) : trangThai === 'thanh_cong' ? (
              <div className="text-center py-10 md:py-12">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#0077FF] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-[0_0_20px_#0077FF]">
                  <FiCheck className="text-white text-2xl md:text-3xl" />
                </div>
                <h3 className="text-xl md:text-2xl font-orbitron font-bold mb-3 text-white">GỬI THÀNH CÔNG!</h3>
                <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-8 font-light">{thongBao}</p>
                <button
                  onClick={() => setTrangThai('')}
                  className="liquid-glass-btn text-white px-8 py-3 text-sm font-semibold"
                >
                  Gửi Tin Nhắn Khác
                </button>
              </div>
            ) : (
              <form onSubmit={xuLyGuiForm} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-orbitron">Họ và Tên</label>
                    <input
                      type="text"
                      name="hoTen"
                      value={formData.hoTen}
                      onChange={xuLyThayDoi}
                      placeholder="Tên của bạn"
                      required
                      className="bg-[#0A0D14]/80 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0077FF] focus:ring-1 focus:ring-[#0077FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:shadow-[0_0_15px_rgba(0,119,255,0.2)] transition-all duration-300 font-light"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-orbitron">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={xuLyThayDoi}
                      placeholder="email@example.com"
                      required
                      className="bg-[#0A0D14]/80 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0077FF] focus:ring-1 focus:ring-[#0077FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:shadow-[0_0_15px_rgba(0,119,255,0.2)] transition-all duration-300 font-light"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-orbitron">Số Điện Thoại</label>
                  <input
                    type="tel"
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    onChange={xuLyThayDoi}
                    placeholder="Số điện thoại của bạn"
                    required
                    className="bg-[#0A0D14]/80 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0077FF] focus:ring-1 focus:ring-[#0077FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:shadow-[0_0_15px_rgba(0,119,255,0.2)] transition-all duration-300 font-light"
                  />
                </div>

                {/* Gói Dịch Vụ Chính */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-orbitron">Gói Dịch Vụ Chính (Bắt buộc)</label>
                  <div className="relative">
                    <select
                      name="dichVu"
                      value={formData.dichVu}
                      onChange={xuLyThayDoi}
                      className="w-full bg-[#0A0D14]/80 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#0077FF] focus:ring-1 focus:ring-[#0077FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 appearance-none font-bold"
                    >
                      <option value="Student Landing" className="bg-[#0A0D14] text-white">Student Landing</option>
                      <option value="Personal Branding Web" className="bg-[#0A0D14] text-white">Personal Branding Web</option>
                      <option value="Sales Landing Page" className="bg-[#0A0D14] text-white">Sales Landing Page</option>
                      <option value="Business Website" className="bg-[#0A0D14] text-white">Business Website</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Gói Nâng Cấp & Bảo Trì */}
                <div className="flex flex-col gap-3 mt-2 p-6 bg-[#0A1220]/80 border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <label className="text-sm font-bold text-gray-300 uppercase tracking-wide border-b border-white/[0.08] pb-2 mb-2 font-orbitron">Gói Nâng Cấp & Bảo Trì (Tùy chọn thêm)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {extraServicesList.map((service, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input
                            type="checkbox"
                            value={service}
                            checked={dichVuPhu.includes(service)}
                            onChange={xuLyThayDoiPhu}
                            className="peer appearance-none w-5 h-5 border border-white/20 rounded focus:outline-none checked:bg-[#0077FF] checked:border-[#0077FF] transition-colors cursor-pointer bg-[#0A0D14] shadow-[0_0_10px_rgba(0,119,255,0.2)]"
                          />
                          <FiCheck className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs" />
                        </div>
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-orbitron">Tin Nhắn</label>
                  <textarea
                    name="tinNhan"
                    value={formData.tinNhan}
                    onChange={xuLyThayDoi}
                    rows="4"
                    placeholder="Hãy cho chúng tôi biết về tổng quan yêu cầu của bạn"
                    required
                    className="bg-[#0A0D14]/80 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0077FF] focus:ring-1 focus:ring-[#0077FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:shadow-[0_0_15px_rgba(0,119,255,0.2)] transition-all duration-300 resize-none font-light"
                  ></textarea>
                </div>

                {trangThai === 'loi' && (
                  <div className="text-red-400 text-sm font-bold bg-red-950/30 p-4 rounded-xl border border-red-900">{thongBao}</div>
                )}

                <button
                  type="submit"
                  disabled={trangThai === 'dang_gui'}
                  className="liquid-glass-btn mt-6 w-full py-3.5 font-bold disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider font-orbitron text-white"
                >
                  {trangThai === 'dang_gui' ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 bg-[#0A0D14] text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white cursor-pointer block">
            <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-[#0A0D14] px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300">JATHONG</span></span>
          </Link>
          <div className="text-sm font-medium text-gray-500">&copy; {new Date().getFullYear()} JATHONG. Khách hàng là trên hết.</div>
        </div>
      </footer>
    </div>
  );
};

export default TrangLienHe;
