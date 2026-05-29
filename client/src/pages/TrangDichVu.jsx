import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiClock, FiRefreshCw, FiShield, FiPenTool } from 'react-icons/fi';

const mainPackages = [
  {
    name: "Student Landing",
    target: "Sinh viên cần web mô phỏng, bài môn học",
    desc: "Làm một landing page gọn, đẹp, đúng brief để nộp bài hoặc trình bày dự án.",
    features: ["01 landing page", "Hero, Giới thiệu, Nội dung chính", "CTA, Responsive cơ bản"],
    time: "1-3 ngày",
    revisions: "1–2 vòng",
    price: "Từ 1.500K",
    note: "Cứu deadline",
    linkDichVu: "Student Landing"
  },
  {
    name: "Personal Branding Web",
    target: "Freelancer, creator, sinh viên",
    desc: "Biến profile thành một website có gu, thay CV bằng trải nghiệm nhìn chuyên nghiệp hơn.",
    features: ["Homepage, About, Portfolio", "Skills, Contact, CTA booking", "UX/UI hiện đại"],
    time: "3-5 ngày",
    revisions: "2–3 vòng",
    price: "Từ 2.000K",
    note: "Làm profile xịn",
    isPopular: true,
    linkDichVu: "Personal Branding Web"
  },
  {
    name: "Sales Landing Page",
    target: "Người bán sản phẩm, workshop, dịch vụ",
    desc: "Landing page tập trung thuyết phục, kể chuyện sản phẩm và kéo khách nhắn tin/đăng ký.",
    features: ["Hero, Pain point, Benefit", "Feedback, Offer, FAQ", "Tích hợp Zalo/Messenger/Form"],
    price: "Liên hệ",
    note: "Tạo trang bán hàng",
    linkDichVu: "Sales Landing Page"
  },
  {
    name: "Business Website",
    target: "Doanh nghiệp nhỏ, thương hiệu cá nhân",
    desc: "Website giới thiệu chỉn chu như một mặt tiền online, giúp thương hiệu trông đáng tin hơn.",
    features: ["Trang chủ, Giới thiệu, Dịch vụ", "Dự án, Liên hệ", "UX/UI cơ bản"],
    price: "Liên hệ",
    note: "Xây web doanh nghiệp",
    linkDichVu: "Business Website"
  }
];

const maintenancePackages = [
  { name: "Bảo hành kỹ thuật", desc: "Sửa lỗi phát sinh từ phần đã bàn giao.", includes: "Fix lỗi hiển thị; lỗi link/nút; kiểm tra responsive", cycle: "01 tháng đầu", price: "Miễn phí" },
  { name: "Duy trì cơ bản", desc: "Giữ website hoạt động ổn định, phù hợp khách nhỏ.", includes: "Kiểm tra lỗi; hỗ trợ sửa nhỏ; backup thủ công", cycle: "Hằng tháng", price: "399K/tháng" },
  { name: "Duy trì tiêu chuẩn", desc: "Theo dõi, cập nhật nhẹ và hỗ trợ khách định kỳ.", includes: "Fix lỗi; update text/hình nhỏ; kiểm tra form/CTA", cycle: "Hằng tháng", price: "999K/tháng" },
  { name: "Duy trì nâng cao", desc: "Dành cho web cần thay đổi nội dung thường xuyên.", includes: "Cập nhật section; thay banner; tư vấn cải thiện UX", cycle: "Hằng tháng", price: "1.299K/tháng" }
];

const designPackages = [
  { name: "Thiết kế cơ bản", desc: "Thiết kế giao diện landing page trước khi code.", includes: "Hero; section nội dung; CTA; layout desktop/mobile", cycle: "Một lần", price: "1.000K" },
  { name: "Thiết kế tiêu chuẩn", desc: "Thiết kế trang chủ cho website/profile/business.", includes: "Header; hero; service; portfolio; contact; visual dir.", cycle: "Một lần", price: "1.000K – 2.500K" },
  { name: "Thiết kế nâng cao", desc: "Thiết kế trang chủ theo yêu cầu đặc biệt.", includes: "Tất cả các hạng mục theo yêu cầu cụ thể", cycle: "Một lần", price: "Liên hệ" }
];

const TrangDichVu = () => {
  const navigate = useNavigate();

  const handleBookService = (dichVuName) => {
    navigate('/contact', { state: { selectedService: dichVuName } });
  };

  const handleBookAddon = (addonName) => {
    navigate('/contact', { state: { selectedAddon: addonName } });
  };

  return (
    <div className="bg-[#0A0D14] text-white min-h-screen font-sans relative overflow-hidden">
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
              <span className="hidden sm:inline">Về Trang Chủ</span>
              <span className="sm:hidden">Quay Lại</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-extrabold tracking-tight mb-4 md:mb-6 text-white uppercase">
              DỊCH VỤ CỦA <span className="viet-text-gradient font-orbitron">JATHONG.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              Giải pháp thiết kế và phát triển website chuyên nghiệp, tối ưu cho từng mục tiêu cụ thể từ cá nhân đến doanh nghiệp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 01. GÓI DỊCH VỤ CHÍNH */}
      <section className="py-16 px-6 bg-[#0A0D14]/50 border-t border-b border-white/[0.05] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0077FF]/10 border border-[#0077FF]/25 text-[#00B8FF] text-xs md:text-sm font-bold tracking-wider mb-4 font-orbitron shadow-[0_0_15px_rgba(0,119,255,0.15)]">01. GÓI DỊCH VỤ CHÍNH</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-extrabold text-white uppercase tracking-wide">Lựa Chọn Phù Hợp Nhất</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`luxury-card flex flex-col p-8 group transition-all duration-300 relative ${pkg.isPopular ? 'border-[#0077FF]/60 shadow-[0_0_35px_rgba(0,119,255,0.2)]' : ''}`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0055FF] to-[#00B8FF] text-white px-4 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase shadow-[0_0_15px_#0077FF] font-orbitron z-20">
                    Được Ưa Chuộng Nhất
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-orbitron font-bold mb-2 text-white group-hover:text-[#00B8FF] transition-colors uppercase tracking-wider">{pkg.name}</h3>
                  <div className="inline-block bg-[#0A0D14] text-gray-300 px-3 py-1 rounded-md text-[11px] font-semibold mb-4 border border-white/[0.08]">
                    Phù hợp: {pkg.target}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed min-h-[60px] font-light">{pkg.desc}</p>
                </div>

                <div className="text-3xl font-orbitron font-extrabold mb-6 text-white">
                  {pkg.price}
                </div>

                <div className="flex flex-col gap-3 mb-8 flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-orbitron">Bao gồm:</p>
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm font-medium text-gray-300">
                      <FiCheckCircle className="text-[#00B8FF] mt-0.5 shrink-0 shadow-[0_0_8px_rgba(0,184,255,0.5)]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {(pkg.time || pkg.revisions) && (
                  <div className="border-t border-white/[0.05] pt-6 mb-6">
                    {pkg.time && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 font-light">
                        <FiClock className="text-[#00B8FF]" /> Thời gian: <span className="font-bold text-white">{pkg.time}</span>
                      </div>
                    )}
                    {pkg.revisions && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 font-light">
                        <FiRefreshCw className="text-[#00B8FF]" /> Chỉnh sửa: <span className="font-bold text-white">{pkg.revisions}</span>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={() => handleBookService(pkg.linkDichVu)}
                  className={`w-full py-3.5 font-bold ${pkg.isPopular ? 'liquid-glass-btn text-white' : 'liquid-glass-btn-secondary text-white'}`}
                >
                  Chọn Gói Này
                </button>

                {/* Oceanic Swoosh for cards */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#0077FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. GÓI DỊCH VỤ PHỤ */}
      <section className="py-24 px-6 bg-[#0A0D14] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0077FF]/10 border border-[#0077FF]/25 text-[#00B8FF] text-xs md:text-sm font-bold tracking-wider mb-4 font-orbitron shadow-[0_0_15px_rgba(0,119,255,0.15)]">02. GÓI DỊCH VỤ PHỤ</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-extrabold text-white uppercase tracking-wide">Nâng Cấp & Bảo Trì</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Bảo hành / Duy trì */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#0077FF]/10 text-[#00B8FF] rounded-2xl flex items-center justify-center text-xl border border-[#0077FF]/20 shadow-[0_0_10px_rgba(0,119,255,0.2)]">
                  <FiShield />
                </div>
                <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider">Bảo hành & Duy trì</h3>
              </div>
              <div className="flex flex-col gap-4">
                {maintenancePackages.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleBookAddon(item.name)}
                    className="group p-6 rounded-[22px] border border-white/10 hover:border-[#0077FF]/50 hover:shadow-[0_0_25px_rgba(0,119,255,0.25),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all cursor-pointer bg-[#0A1220]/50 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] font-bold bg-gradient-to-r from-[#0055FF] to-[#00B8FF] text-white px-2 py-1 rounded shadow-[0_0_8px_#0077FF]">Đăng Ký</span>
                    </div>
                    <div className="flex justify-between items-start mb-2 pr-12">
                      <h4 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide group-hover:text-[#00B8FF] transition-colors">{item.name}</h4>
                      <span className="font-extrabold text-[#00B8FF] text-lg font-orbitron">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 font-light">{item.desc}</p>
                    <div className="bg-[#0A0D14]/80 p-4 rounded-xl border border-white/10">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Bao gồm:</p>
                      <p className="text-sm font-light text-gray-300 leading-relaxed">{item.includes}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <FiRefreshCw className="text-[#00B8FF]" /> Chu kỳ: <span className="text-white">{item.cycle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phí thiết kế */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center text-xl border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                  <FiPenTool />
                </div>
                <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider">Phí Thiết Kế (UI/UX)</h3>
              </div>
              <div className="flex flex-col gap-4">
                {designPackages.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleBookAddon(item.name)}
                    className="group p-6 rounded-[22px] border border-white/10 hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.25),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all cursor-pointer bg-[#0A1220]/50 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2 py-1 rounded shadow-[0_0_8px_#f97316]">Đăng Ký</span>
                    </div>
                    <div className="flex justify-between items-start mb-2 pr-12">
                      <h4 className="text-lg font-bold text-white font-orbitron uppercase tracking-wide group-hover:text-orange-400 transition-colors">{item.name}</h4>
                      <span className="font-extrabold text-orange-400 text-lg font-orbitron">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 font-light">{item.desc}</p>
                    <div className="bg-[#0A0D14]/80 p-4 rounded-xl border border-white/10">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Bao gồm:</p>
                      <p className="text-sm font-light text-gray-300 leading-relaxed">{item.includes}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <FiClock className="text-orange-400" /> Chu kỳ: <span className="text-white">{item.cycle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#0A0D14] text-white px-6 relative z-10 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-[32px] bg-gradient-to-br from-[#0A1220]/80 to-[#0077FF]/10 border border-white/10 shadow-[0_0_50px_rgba(0,119,255,0.15),_inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold mb-4 md:mb-6 uppercase tracking-wider text-white">Sẵn sàng bắt đầu dự án?</h2>
          <p className="text-gray-400 font-light text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
            Dù bạn cần một website cá nhân nhỏ gọn hay một nền tảng doanh nghiệp phức tạp, JATHONG Studio luôn có giải pháp phù hợp với ngân sách của bạn.
          </p>
          <Link to="/contact" className="liquid-glass-btn text-white px-10 py-4 text-base sm:text-lg">
            Trò Chuyện Với Chúng Tôi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 bg-[#0A0D14] text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white cursor-pointer block">
            <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-[#0A0D14] px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300">JATHONG</span></span>
          </Link>
          <div className="text-sm font-medium text-gray-500">&copy; {new Date().getFullYear()} JATHONG. Khách hàng là trên hết.</div>
        </div>
      </footer>
    </div>
  );
};

export default TrangDichVu;
