import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiTarget, FiFileText, FiPenTool, FiCode, FiSend, FiArrowUpRight, FiChevronDown } from 'react-icons/fi';

const steps = [
  {
    icon: <FiUser className="text-2xl md:text-3xl text-zinc-400 group-hover:text-[#00B8FF] transition-colors duration-500" />,
    step: "01",
    title: "Discover",
    desc: "Chúng tôi bắt đầu bằng việc hiểu bạn là ai, bạn đang làm gì và bạn muốn người khác nhớ đến mình như thế nào."
  },
  {
    icon: <FiTarget className="text-2xl md:text-3xl text-zinc-400 group-hover:text-[#00B8FF] transition-colors duration-500" />,
    step: "02",
    title: "Define",
    desc: "JATHONG xác định định vị cá nhân, phong cách hình ảnh, thông điệp chính và cấu trúc portfolio phù hợp."
  },
  {
    icon: <FiFileText className="text-2xl md:text-3xl text-zinc-400 group-hover:text-[#00B8FF] transition-colors duration-500" />,
    step: "03",
    title: "Data",
    desc: "Bạn cung cấp hình ảnh, video, số liệu, case study và các thông tin cần thiết để JATHONG xây dựng nội dung website."
  },
  {
    icon: <FiPenTool className="text-2xl md:text-3xl text-zinc-400 group-hover:text-[#00B8FF] transition-colors duration-500" />,
    step: "04",
    title: "Design",
    desc: "Chúng tôi thiết kế giao diện website theo mood & tone riêng, đảm bảo đẹp, rõ, có gu và đúng cá tính."
  },
  {
    icon: <FiCode className="text-2xl md:text-3xl text-zinc-400 group-hover:text-[#00B8FF] transition-colors duration-500" />,
    step: "05",
    title: "Develop",
    desc: "Website được dựng hoàn chỉnh, tối ưu trên desktop/mobile, gắn link social, form liên hệ và các tính năng cần thiết."
  },
  {
    icon: <FiSend className="text-2xl md:text-3xl text-zinc-400 group-hover:text-[#00B8FF] transition-colors duration-500" />,
    step: "06",
    title: "Deliver",
    desc: "JATHONG bàn giao website, hướng dẫn sử dụng và hỗ trợ bảo hành/cập nhật sau khi hoàn thành."
  }
];

const TrangQuyTrinh = () => {
  return (
    <div className="bg-[#0A0D14] text-white min-h-screen font-sans selection:bg-[#0077FF] selection:text-white relative overflow-hidden">
      
      {/* ========================================== */}
      {/* FUTURISTIC NEBULA BACKDROP GLOW EFFECTS */}
      {/* ========================================== */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0077FF] to-[#07101F] opacity-20 blur-[130px] pointer-events-none select-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#0077FF] to-[#0A0D14] opacity-20 blur-[150px] pointer-events-none select-none z-0"></div>
      <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#0077FF] opacity-10 blur-[110px] pointer-events-none select-none z-0"></div>
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-4 md:px-8 pt-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0A0D14]/40 backdrop-blur-xl px-6 py-4 flex justify-between items-center w-full rounded-full border border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
              <span className="font-extrabold tracking-wide text-xl">JATHONG</span>
            </Link>
            <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-semibold text-sm">
              <FiArrowLeft className="text-lg" />
              <span>Quay Về Trang Chủ</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-16 relative z-10">
        
        {/* Header Section */}
        <section className="bg-[#0A1220]/60 backdrop-blur-3xl rounded-[32px] border border-[#0077FF]/30 p-6 md:p-10 mb-8 shadow-[0_0_40px_rgba(0,119,255,0.15),_0_25px_70px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-500 hover:border-[#0077FF]/50 hover:shadow-[0_0_50px_rgba(0,184,255,0.25),_0_30px_80px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden group/header">
          {/* Subtle electric blue neon border glow element inside */}
          <div className="absolute inset-0 border border-transparent group-hover/header:border-[#0077FF]/20 transition-all duration-500 rounded-3xl pointer-events-none z-0"></div>
          <div className="relative z-10">
            
            {/* Content */}
            <div className="flex flex-col justify-start items-start">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00B8FF] mb-4 md:mb-6 block drop-shadow-[0_0_10px_rgba(0,184,255,0.3)]">
                • OUR PROCESS
              </span>
              
              {/* Futuristic Tech Title */}
              <div className="flex flex-col mb-8 w-full max-w-2xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider text-white leading-none whitespace-nowrap" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">QUY TRÌNH </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#7eccff] to-[#0077FF] drop-shadow-[0_0_15px_rgba(0,119,255,0.85)] font-black">6D</span>
                </h1>
                
                {/* Laser Light Streak Line */}
                <div className="relative w-full h-[2px] mt-6 bg-gradient-to-r from-transparent via-[#0077FF] to-transparent">
                  {/* White-blue core */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-85 z-10"></div>
                  {/* Electric blue glow */}
                  <div className="absolute inset-0 blur-[4px] bg-gradient-to-r from-transparent via-[#0077FF] to-transparent scale-y-[4.5]"></div>
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl">
                Từ định vị cá nhân đến website hoàn chỉnh — JATHONG xây dựng portfolio online thông qua quy trình 6D rõ ràng, tinh gọn và có định hướng thương hiệu.
              </p>
            </div>

          </div>
        </section>

        {/* Bento Grid 3x2 Space Black Cards */}
        <section className="bg-[#0A1220]/55 backdrop-blur-xl p-[1px] rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(0,119,255,0.15),_0_30px_80px_rgba(0,0,0,0.8)] mb-8 border border-[#0077FF]/30 transition-all duration-500 hover:border-[#0077FF]/50 hover:shadow-[0_0_50px_rgba(0,184,255,0.25),_0_35px_90px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gradient-to-br from-white/[0.05] to-white/[0.01]">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-[#0A0D14] hover:bg-[#0A1220]/80 p-8 md:p-10 flex flex-col justify-between aspect-[1.3/1] relative group cursor-pointer transition-all duration-500 overflow-hidden"
              >
                
                {/* Electric Ocean Blue Radial Swoosh at the bottom on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-[radial-gradient(ellipse_at_bottom,rgba(0,119,255,0.18),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>

                {/* Top Row: Number/Title & Icon */}
                <div className="flex justify-between items-start w-full relative z-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black tracking-wider uppercase mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[#7eccff] to-[#0077FF] drop-shadow-[0_0_8px_rgba(0,119,255,0.3)]">
                      {item.step}
                    </span>
                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-[#00B8FF] transition-colors duration-500">{item.title}</h3>
                  </div>
                  <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-center group-hover:border-[#0077FF]/50 group-hover:bg-[#0077FF]/10 group-hover:shadow-[0_0_20px_rgba(0,119,255,0.3)] transition-all duration-500 shrink-0">
                    {item.icon}
                  </div>
                </div>

                {/* Bottom Row: Description & Action */}
                <div className="mt-6 flex flex-col justify-between flex-grow relative z-10">
                  <p className="text-zinc-400 group-hover:text-zinc-200 text-sm md:text-base leading-relaxed transition-colors duration-500 max-w-[90%]">
                    {item.desc}
                  </p>
                  
                  {/* Diagonal arrow in the bottom right corner */}
                  <div className="absolute bottom-6 right-8 text-zinc-600 group-hover:text-[#00B8FF] transition-all duration-500 text-base">
                    <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </section>

        {/* Premium Bottom Section (Space Nebula CTA Banner) */}
        <section className="bg-[#0A1220]/60 backdrop-blur-3xl rounded-[32px] border border-[#0077FF]/20 p-8 md:p-12 shadow-[0_0_40px_rgba(0,119,255,0.12),_0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden relative transition-all duration-500 hover:border-[#0077FF]/35 hover:shadow-[0_0_50px_rgba(0,184,255,0.2),_0_30px_80px_rgba(0,0,0,0.8)]">
          
          {/* Electric Blue Neon Light Spot in bottom right of CTA card */}
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#0077FF] opacity-25 blur-[60px] pointer-events-none select-none"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
            
            {/* Left Texts */}
            <div className="max-w-2xl">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#00B8FF] mb-3 block drop-shadow-[0_0_8px_rgba(0,184,255,0.3)]">
                READY TO BUILD YOUR BRAND?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white uppercase font-orbitron">
                BẮT ĐẦU DỰ ÁN CỦA BẠN NGAY HÔM NAY
              </h2>
              <p className="text-zinc-400 font-semibold text-sm sm:text-base">
                Chúng tôi sẵn sàng lắng nghe và tư vấn giải pháp phù hợp nhất với bạn.
              </p>
            </div>

            {/* Right Buttons & Scroll */}
            <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto shrink-0 justify-between sm:justify-start">
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link 
                  to="/contact" 
                  className="liquid-glass-btn text-white px-6 py-3.5 text-sm font-bold tracking-widest uppercase transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  START YOUR PROJECT <FiArrowUpRight className="text-base" />
                </Link>
                <Link 
                  to="/portfolio" 
                  className="liquid-glass-btn-secondary text-white px-6 py-3.5 text-sm font-bold tracking-widest uppercase transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  VIEW PORTFOLIO <FiArrowUpRight className="text-base" />
                </Link>
              </div>

              {/* Scroll Indicator */}
              <div className="hidden lg:flex flex-col items-center gap-1 text-zinc-500 select-none">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-lg text-zinc-300 shadow-lg bg-[#0A0D14] animate-bounce">
                  <FiChevronDown />
                </div>
                <span className="text-[8px] font-black tracking-[0.2em] uppercase text-zinc-400">SCROLL</span>
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12 bg-[#0A0D14]/60 text-zinc-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white cursor-pointer block">
            <span className="font-extrabold tracking-wide text-xl">JATHONG</span>
          </Link>
          <div className="text-sm font-semibold">&copy; {new Date().getFullYear()} JATHONG GROUP. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default TrangQuyTrinh;
