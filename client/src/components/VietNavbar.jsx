import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const VietNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full z-50 transition-all duration-300 px-4 md:px-8 pt-4"
    >
      <div className={`mx-auto max-w-7xl transition-all duration-500 ${isScrolled ? 'translate-y-2' : ''}`}>
        <div className="px-6 md:px-8 py-3 w-full flex justify-between items-center bg-[#0A1220]/75 backdrop-blur-xl border border-[#0077FF]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_8px_32px_rgba(0,0,0,0.5),_0_0_20px_rgba(0,119,255,0.15)] rounded-full hover:border-[#0077FF]/55 transition-all duration-500">
          
          {/* Logo with Premium Space Glass styling */}
          <Link to="/" className="cursor-pointer block">
            <span className="px-5 py-1.5 rounded-full bg-[#0A1220]/80 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_0_15px_rgba(0,119,255,0.15)] hover:border-[#0077FF]/50 transition-all duration-300 flex items-center justify-center">
              <span className="text-white font-orbitron font-extrabold tracking-widest text-lg md:text-xl">
                JATHONG
              </span>
            </span>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex gap-8 items-center font-medium text-sm text-gray-300">
            <Link to="/about" className="hover:text-[#00B8FF] hover:drop-shadow-[0_0_8px_rgba(0,184,255,0.4)] transition-all duration-300">Về JATHONG</Link>
            <Link to="/services" className="hover:text-[#00B8FF] hover:drop-shadow-[0_0_8px_rgba(0,184,255,0.4)] transition-all duration-300">Dịch Vụ</Link>
            <Link to="/portfolio" className="hover:text-[#00B8FF] hover:drop-shadow-[0_0_8px_rgba(0,184,255,0.4)] transition-all duration-300">Mẫu Giao Diện</Link>
            <Link to="/workflow" className="hover:text-[#00B8FF] hover:drop-shadow-[0_0_8px_rgba(0,184,255,0.4)] transition-all duration-300">Quy Trình Làm Việc</Link>
            
            {/* CTA Liên hệ ngay with Liquid Glass styling */}
            <Link to="/contact" className="liquid-glass-btn px-6 py-2 text-sm font-bold tracking-wide">
              Liên hệ ngay
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-white hover:text-[#00B8FF] cursor-pointer p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+10px)] left-4 right-4 bg-[#0A1220]/95 backdrop-blur-2xl rounded-3xl border border-[#0077FF]/30 shadow-[0_10px_40px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.1)] p-6 flex flex-col gap-4 z-40 md:hidden"
          >
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold border-b border-white/[0.05] pb-2 text-white hover:text-[#00B8FF] transition-colors">Về JATHONG</Link>
            <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold border-b border-white/[0.05] pb-2 text-white hover:text-[#00B8FF] transition-colors">Dịch Vụ</Link>
            <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold border-b border-white/[0.05] pb-2 text-white hover:text-[#00B8FF] transition-colors">Mẫu Giao Diện</Link>
            <Link to="/workflow" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold border-b border-white/[0.05] pb-2 text-white hover:text-[#00B8FF] transition-colors">Quy Trình Làm Việc</Link>
            
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="liquid-glass-btn w-full py-3.5 font-bold text-center mt-2">
              Liên hệ ngay
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default VietNavbar;
