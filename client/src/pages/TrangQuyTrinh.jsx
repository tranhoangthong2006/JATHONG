import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiTarget, FiDatabase, FiLayers, FiCode, FiCheckCircle } from 'react-icons/fi';

const steps = [
  {
    icon: <FiSearch className="text-3xl text-black" />,
    step: "01",
    title: "Discover",
    desc: "Chúng tôi bắt đầu bằng việc hiểu bạn là ai, bạn đang làm gì và bạn muốn người khác nhớ đến mình như thế nào."
  },
  {
    icon: <FiTarget className="text-3xl text-black" />,
    step: "02",
    title: "Define",
    desc: "JATHONG xác định định vị cá nhân, phong cách hình ảnh, thông điệp chính và cấu trúc portfolio phù hợp."
  },
  {
    icon: <FiDatabase className="text-3xl text-black" />,
    step: "03",
    title: "Data",
    desc: "Bạn cung cấp hình ảnh, video, số liệu, case study và các thông tin cần thiết để JATHONG xây dựng nội dung website."
  },
  {
    icon: <FiLayers className="text-3xl text-black" />,
    step: "04",
    title: "Design",
    desc: "Chúng tôi thiết kế giao diện website theo mood & tone riêng, đảm bảo đẹp, rõ, có gu và đúng cá tính."
  },
  {
    icon: <FiCode className="text-3xl text-black" />,
    step: "05",
    title: "Develop",
    desc: "Website được dựng hoàn chỉnh, tối ưu trên desktop/mobile, gắn link social, form liên hệ và các tính năng cần thiết."
  },
  {
    icon: <FiCheckCircle className="text-3xl text-black" />,
    step: "06",
    title: "Deliver",
    desc: "JATHONG bàn giao website, hướng dẫn sử dụng và hỗ trợ bảo hành/cập nhật sau khi hoàn thành."
  }
];

const TrangQuyTrinh = () => {
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
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 text-black">
              Quy Trình <span className="viet-text-gradient">Làm Việc.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Quy trình 6D chuẩn hóa giúp bạn sở hữu một website chuyên nghiệp và đúng bản sắc cá nhân.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="viet-glass p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col md:flex-row gap-4 md:gap-6 items-start shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-5xl font-black text-gray-200">{item.step}</span>
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-black">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Sẵn sàng bắt đầu?</h2>
          <p className="text-gray-600 mb-8">Liên hệ ngay để khởi động dự án của bạn.</p>
          <Link to="/contact" className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300">
            Liên Hệ Ngay
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-gray-50 text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-black cursor-pointer block">
            <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-white px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300">JATHONG</span></span>
          </Link>
          <div className="text-sm font-medium">&copy; {new Date().getFullYear()} JATHONG. Khách hàng là trên hết.</div>
        </div>
      </footer>
    </div>
  );
};

export default TrangQuyTrinh;
