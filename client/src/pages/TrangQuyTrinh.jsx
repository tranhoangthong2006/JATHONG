import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMessageCircle, FiFileText, FiCheckCircle, FiSend } from 'react-icons/fi';

const steps = [
  {
    icon: <FiMessageCircle className="text-3xl text-black" />,
    step: "01",
    title: "Trao Đổi Yêu Cầu",
    desc: "Bạn liên hệ và mô tả ý tưởng, mục tiêu, phong cách mong muốn. Chúng tôi sẽ tư vấn giải pháp phù hợp nhất."
  },
  {
    icon: <FiFileText className="text-3xl text-black" />,
    step: "02",
    title: "Thiết Kế & Phát Triển",
    desc: "Đội ngũ bắt tay vào thiết kế giao diện và code website. Bạn sẽ được xem bản demo trong quá trình làm."
  },
  {
    icon: <FiCheckCircle className="text-3xl text-black" />,
    step: "03",
    title: "Chỉnh Sửa & Hoàn Thiện",
    desc: "Bạn phản hồi, chúng tôi chỉnh sửa đến khi bạn hài lòng 100%. Không giới hạn số lần sửa."
  },
  {
    icon: <FiSend className="text-3xl text-black" />,
    step: "04",
    title: "Bàn Giao Sản Phẩm",
    desc: "Bàn giao toàn bộ source code, hỗ trợ deploy lên hosting, hướng dẫn sử dụng và bảo trì."
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
              Chỉ với 4 bước đơn giản, bạn sẽ sở hữu một website chuyên nghiệp.
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
