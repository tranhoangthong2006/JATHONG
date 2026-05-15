import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const VietNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="md:hidden text-black cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default VietNavbar;
