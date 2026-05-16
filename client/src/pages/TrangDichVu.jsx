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
    // Chuyển hướng sang trang liên hệ với state
    navigate('/contact', { state: { selectedService: dichVuName } });
  };

  const handleBookAddon = (addonName) => {
    navigate('/contact', { state: { selectedAddon: addonName } });
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-4 md:px-8 pt-4">
        <div className="animated-border-pill max-w-7xl mx-auto">
          <div className="animated-border-pill-inner bg-white/90 backdrop-blur-md px-6 py-3 flex justify-between items-center w-full shadow-sm">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-black">
              <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-white px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300">JATHONG</span></span>
            </Link>
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-medium text-sm">
              <FiArrowLeft className="text-lg" />
              <span className="hidden sm:inline">Về Trang Chủ</span>
              <span className="sm:hidden">Quay Lại</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4 md:mb-6 text-black uppercase">
              DỊCH VỤ CỦA <span className="viet-text-gradient">JATHONG.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
              Giải pháp thiết kế và phát triển website chuyên nghiệp, tối ưu cho từng mục tiêu cụ thể từ cá nhân đến doanh nghiệp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 01. GÓI DỊCH VỤ CHÍNH */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-black text-white text-xs md:text-sm font-bold tracking-wider mb-4">01. GÓI DỊCH VỤ CHÍNH</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">Lựa Chọn Phù Hợp Nhất</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${pkg.isPopular ? 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'border-gray-200'}`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                    Được Ưa Chuộng Nhất
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-black mb-2">{pkg.name}</h3>
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-semibold mb-4 border border-gray-200">
                    Phù hợp: {pkg.target}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed min-h-[60px]">{pkg.desc}</p>
                </div>

                <div className="text-3xl font-black mb-6">
                  {pkg.price}
                </div>

                <div className="flex flex-col gap-3 mb-8 flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bao gồm:</p>
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm font-medium text-gray-700">
                      <FiCheckCircle className="text-black mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {(pkg.time || pkg.revisions) && (
                  <div className="border-t border-gray-100 pt-6 mb-6">
                    {pkg.time && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 font-medium">
                        <FiClock className="text-black" /> Thời gian: <span className="font-bold text-black">{pkg.time}</span>
                      </div>
                    )}
                    {pkg.revisions && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <FiRefreshCw className="text-black" /> Chỉnh sửa: <span className="font-bold text-black">{pkg.revisions}</span>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={() => handleBookService(pkg.linkDichVu)}
                  className={`w-full py-4 rounded-xl font-bold transition-colors ${pkg.isPopular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
                >
                  Chọn Gói Này
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. GÓI DỊCH VỤ PHỤ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-200 text-gray-800 text-xs md:text-sm font-bold tracking-wider mb-4">02. GÓI DỊCH VỤ PHỤ</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">Nâng Cấp & Bảo Trì</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Bảo hành / Duy trì */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
                  <FiShield />
                </div>
                <h3 className="text-2xl font-bold">Bảo hành & Duy trì</h3>
              </div>
              <div className="flex flex-col gap-4">
                {maintenancePackages.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleBookAddon(item.name)}
                    className="group p-6 rounded-2xl border-2 border-gray-100 hover:border-black transition-all cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded">Đăng Ký</span>
                    </div>
                    <div className="flex justify-between items-start mb-2 pr-12">
                      <h4 className="text-lg font-bold">{item.name}</h4>
                      <span className="font-black text-blue-600">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">Bao gồm:</p>
                      <p className="text-sm font-medium text-gray-700">{item.includes}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <FiRefreshCw /> Chu kỳ: <span className="text-black">{item.cycle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phí thiết kế */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-xl">
                  <FiPenTool />
                </div>
                <h3 className="text-2xl font-bold">Phí Thiết Kế (UI/UX)</h3>
              </div>
              <div className="flex flex-col gap-4">
                {designPackages.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleBookAddon(item.name)}
                    className="group p-6 rounded-2xl border-2 border-gray-100 hover:border-black transition-all cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded">Đăng Ký</span>
                    </div>
                    <div className="flex justify-between items-start mb-2 pr-12">
                      <h4 className="text-lg font-bold">{item.name}</h4>
                      <span className="font-black text-orange-600">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">Bao gồm:</p>
                      <p className="text-sm font-medium text-gray-700">{item.includes}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <FiClock /> Chu kỳ: <span className="text-black">{item.cycle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-black text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6">Sẵn sàng bắt đầu dự án?</h2>
          <p className="text-gray-400 font-medium text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
            Dù bạn cần một website cá nhân nhỏ gọn hay một nền tảng doanh nghiệp phức tạp, JATHONG Studio luôn có giải pháp phù hợp với ngân sách của bạn.
          </p>
          <Link to="/contact" className="inline-block bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
            Trò Chuyện Với Chúng Tôi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-black text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white cursor-pointer block">
            <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-white px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300">JATHONG</span></span>
          </Link>
          <div className="text-sm font-medium">&copy; {new Date().getFullYear()} JATHONG. Khách hàng là trên hết.</div>
        </div>
      </footer>
    </div>
  );
};

export default TrangDichVu;
