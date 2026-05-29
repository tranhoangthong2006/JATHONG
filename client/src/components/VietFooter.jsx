import React from 'react';
import { Link } from 'react-router-dom';
const VietFooter = () => {
  return (
    <footer className="border-t border-white/[0.08] py-12 bg-[#0A0D14] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white cursor-pointer block">
          <span className="animated-border-pill inline-block cursor-pointer"><span className="animated-border-pill-inner bg-[#0A0D14] px-5 py-1 text-xl font-extrabold tracking-wide inline-flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300">JATHONG</span></span>
        </Link>

        <div className="text-sm font-medium text-gray-500">
          &copy; {new Date().getFullYear()} JATHONG. Khách hàng là trên hết .
        </div>

        <div className="flex gap-4">
          <a href="#" className="hover:text-[#0A6CF0] transition-colors">Facebook</a>
          <a href="#" className="hover:text-[#0A6CF0] transition-colors">Zalo</a>
          <a href="#" className="hover:text-[#0A6CF0] transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default VietFooter;
