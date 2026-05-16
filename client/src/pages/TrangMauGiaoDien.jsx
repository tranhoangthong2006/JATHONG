import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const projects = [
  {
    title: "Website Thương Mại Điện Tử",
    category: "Thiết Kế Web",
    desc: "Giao diện bán hàng hiện đại, tối ưu trải nghiệm mua sắm trực tuyến.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Landing Page Công Nghệ",
    category: "Landing Page",
    desc: "Trang đích chuyên nghiệp cho sản phẩm công nghệ và SaaS.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Portfolio Sinh Viên",
    category: "Thương Hiệu Cá Nhân",
    desc: "Portfolio cá nhân giúp bạn nổi bật khi xin việc hoặc thực tập.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Website Nhà Hàng",
    category: "Thiết Kế Web",
    desc: "Giao diện sang trọng cho nhà hàng, quán cà phê và dịch vụ ẩm thực.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Ứng Dụng Giáo Dục",
    category: "Landing Page",
    desc: "Landing page cho các nền tảng học trực tuyến và khóa học.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Startup Fintech",
    category: "Thiết Kế Web",
    desc: "Giao diện ứng dụng tài chính với thiết kế tối giản và chuyên nghiệp.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const TrangMauGiaoDien = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (projectTitle) => {
    navigate('/contact', { state: { selectedService: "Business Website", note: `Tôi muốn làm giao diện giống mẫu: ${projectTitle}` } });
  };

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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 text-black">
              Mẫu Giao Diện <span className="viet-text-gradient">Phổ Biến.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Một số sản phẩm mà bạn có thể lựa chọn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleSelectTemplate(project.title)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                <p className="text-gray-300 text-xs md:text-sm mb-1">{project.category}</p>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 text-xs md:text-sm">{project.desc}</p>
              </div>
            </motion.div>
          ))}
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

export default TrangMauGiaoDien;
