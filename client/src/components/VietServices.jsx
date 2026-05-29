import React from 'react';
import { motion } from 'framer-motion';
import { FiLayout, FiMonitor, FiCode } from 'react-icons/fi';

const services = [
  {
    icon: <FiLayout className="text-3xl text-[#00B8FF] drop-shadow-[0_0_8px_rgba(0,184,255,0.4)]" />,
    title: "Thiết Kế Landing Page",
    desc: "Landing page chuyên nghiệp, tối ưu chuyển đổi, được thiết kế riêng cho chiến dịch hoặc sản phẩm khởi nghiệp của bạn."
  },
  {
    icon: <FiMonitor className="text-3xl text-[#00B8FF] drop-shadow-[0_0_8px_rgba(0,184,255,0.4)]" />,
    title: "Website Mô Phỏng",
    desc: "Website mô phỏng tương tác đầy đủ, giúp bạn trình bày ý tưởng trước giảng viên, nhà đầu tư hoặc khách hàng."
  },
  {
    icon: <FiCode className="text-3xl text-[#00B8FF] drop-shadow-[0_0_8px_rgba(0,184,255,0.4)]" />,
    title: "Thiết Kế UI/UX",
    desc: "Hệ thống thiết kế độc quyền, toát lên sự sang trọng và chuyên nghiệp, được xây dựng bằng công nghệ web hiện đại."
  }
];

const VietServices = () => {
  return (
    <section id="services" className="py-24 relative bg-[#0A0D14] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0077FF]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-extrabold mb-4 text-white tracking-wider uppercase">
            Dịch Vụ <span className="viet-text-gradient font-orbitron">Của Chúng Tôi.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">Chúng tôi cung cấp giải pháp số toàn diện, giúp sinh viên và nhà sáng lập trẻ nổi bật giữa đám đông.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="luxury-card p-8 group"
            >
              <div className="w-14 h-14 bg-[#0077FF]/10 border border-[#0077FF]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0077FF]/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,119,255,0.1)]">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00B8FF] transition-colors font-orbitron uppercase tracking-wider">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light">{service.desc}</p>
              
              {/* Oceanic Radial Swoosh */}
              <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#0077FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#0077FF]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VietServices;
