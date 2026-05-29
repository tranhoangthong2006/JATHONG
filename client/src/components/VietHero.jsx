import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const VietHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0A0D14]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video 
          src="/video1.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-100 scale-105"
        />
        {/* Transparent overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-[#0A0D14]/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#0A6CF0]/30 bg-[#0A0D14]/60 text-xs sm:text-sm text-white font-medium backdrop-blur-sm shadow-[0_0_15px_rgba(10,108,240,0.15)]">
            Giải pháp thiết kế web tối ưu cho sinh viên
          </div>

          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight text-white uppercase">
            Chúng tôi tạo nên <br className="hidden md:block" />
            <span className="viet-text-gradient font-orbitron">Trải nghiệm đẳng cấp.</span>
          </h1>

          {/* Laser Streak line */}
          <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-[#0A6CF0] to-transparent mx-auto mb-8 relative shadow-[0_0_8px_#0A6CF0]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0A6CF0] shadow-[0_0_10px_#0A6CF0]"></div>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-white mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Nâng tầm thương hiệu cá nhân hoặc ý tưởng khởi nghiệp của bạn. Chúng tôi chuyên thiết kế landing page cao cấp và website mô phỏng chuyên nghiệp dành riêng cho sinh viên đầy tham vọng.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/portfolio" className="w-full sm:w-auto flex items-center justify-center gap-2 liquid-glass-btn text-white px-8 py-3.5 text-base sm:text-lg">
              Xem Mẫu Giao Diện
              <FiArrowRight className="text-xl" />
            </Link>
            <Link to="/services" className="w-full sm:w-auto flex items-center justify-center liquid-glass-btn-secondary px-8 py-3.5 text-base sm:text-lg">
              Bảng Giá Dịch Vụ
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default VietHero;
