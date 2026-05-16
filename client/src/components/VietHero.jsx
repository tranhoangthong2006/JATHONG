import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const VietHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background animated gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50/50 text-xs sm:text-sm text-gray-600 font-medium backdrop-blur-sm">
            Giải pháp thiết kế web tối ưu cho sinh viên
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 leading-tight text-black">
            Chúng tôi tạo nên <br className="hidden md:block" />
            <span className="viet-text-gradient">Trải nghiệm đẳng cấp.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Nâng tầm thương hiệu cá nhân hoặc ý tưởng khởi nghiệp của bạn. Chúng tôi chuyên thiết kế landing page cao cấp và website mô phỏng chuyên nghiệp dành riêng cho sinh viên đầy tham vọng.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
              Xem Sản Phẩm
              <FiArrowRight className="text-xl" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base sm:text-lg text-black border border-gray-300 hover:bg-gray-100 transition-colors duration-300">
              Bảng Giá
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mouse scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-sm tracking-widest uppercase">Cuộn xuống</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default VietHero;
