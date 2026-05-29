import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "Website Thương Mại Điện Tử",
    category: "Thiết Kế Web",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Landing Page Công Nghệ",
    category: "Landing Page",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Portfolio Sinh Viên",
    category: "Thương Hiệu Cá Nhân",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const VietPortfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-[#0A0D14] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0077FF]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-orbitron font-extrabold mb-4 text-white tracking-wider uppercase">
              Các Mẫu giao diện <span className="viet-text-gradient font-orbitron">phổ biến.</span>
            </h2>
            <p className="text-gray-400 max-w-xl font-light">Một số sản phẩm mà bạn có thể lựa chọn.</p>
          </div>
          <Link to="/portfolio" className="text-white border-b border-[#0077FF]/50 pb-1 hover:text-[#00B8FF] hover:border-[#00B8FF] hover:drop-shadow-[0_0_8px_rgba(0,184,255,0.5)] transition-all font-orbitron text-sm uppercase tracking-wider">
            xem tất cả mẫu
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="luxury-card group cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent"></div>
              </div>
              <div className="p-6 relative bg-[#0A1220]/80 border-t border-white/10">
                <p className="text-[#00B8FF] text-xs font-semibold tracking-wider uppercase mb-1 drop-shadow-[0_0_5px_rgba(0,184,255,0.3)]">{project.category}</p>
                <h3 className="text-xl font-bold text-white font-orbitron group-hover:text-[#00B8FF] transition-colors">{project.title}</h3>
                
                {/* Micro Oceanic Swoosh under each card */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#0077FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VietPortfolio;
