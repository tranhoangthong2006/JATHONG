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
      <div className={`animated-border-pill mx-auto max-w-7xl transition-all duration-300 ${isScrolled ? 'translate-y-2' : ''}`}>
        <div className="animated-border-pill-inner px-6 py-3 w-full flex justify-between items-center bg-white">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-black cursor-pointer block">
          <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-white px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300">JATHONG</span></span>
        </Link>

        <div className="hidden md:flex gap-8 items-center font-medium text-sm text-gray-600">
          <Link to="/about" className="hover:text-black transition-colors">Về JATHONG</Link>
          <Link to="/services" className="hover:text-black transition-colors">Dịch Vụ</Link>
          <Link to="/portfolio" className="hover:text-black transition-colors">Mẫu Giao Diện</Link>
          <Link to="/workflow" className="hover:text-black transition-colors">Quy Trình Làm Việc</Link>
          <Link to="/contact" className="bg-black text-white px-5 py-2 rounded-full hover:scale-105 transition-transform duration-300 font-semibold shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            Liên hệ ngay
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-black cursor-pointer p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            className="absolute top-[calc(100%+10px)] left-4 right-4 bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-4 z-40 md:hidden"
          >
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold border-b border-gray-100 pb-2 hover:text-gray-600 transition-colors">Về JATHONG</Link>
            <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold border-b border-gray-100 pb-2 hover:text-gray-600 transition-colors">Dịch Vụ</Link>
            <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold border-b border-gray-100 pb-2 hover:text-gray-600 transition-colors">Mẫu Giao Diện</Link>
            <Link to="/workflow" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold border-b border-gray-100 pb-2 hover:text-gray-600 transition-colors">Quy Trình Làm Việc</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-black text-white px-5 py-4 rounded-xl font-bold text-center mt-2 shadow-[2px_2px_0px_0px_rgba(200,200,200,1)] active:scale-95 transition-transform">
              Liên hệ ngay
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default VietNavbar;
