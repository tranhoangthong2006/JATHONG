import React from 'react';
import { motion } from 'framer-motion';
import { FiLayout, FiMonitor, FiCode } from 'react-icons/fi';

const services = [
  {
    icon: <FiLayout className="text-3xl text-black" />,
    title: "Thiết Kế Landing Page",
    desc: "Landing page chuyên nghiệp, tối ưu chuyển đổi, được thiết kế riêng cho chiến dịch hoặc sản phẩm khởi nghiệp của bạn."
  },
  {
    icon: <FiMonitor className="text-3xl text-black" />,
    title: "Website Mô Phỏng",
    desc: "Website mô phỏng tương tác đầy đủ, giúp bạn trình bày ý tưởng trước giảng viên, nhà đầu tư hoặc khách hàng."
  },
  {
    icon: <FiCode className="text-3xl text-black" />,
    title: "Thiết Kế UI/UX",
    desc: "Hệ thống thiết kế độc quyền, toát lên sự sang trọng và chuyên nghiệp, được xây dựng bằng công nghệ web hiện đại."
  }
];

const VietServices = () => {
  return (
    <section id="services" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Dịch Vụ <span className="text-gray-400">Của Chúng Tôi.</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Chúng tôi cung cấp giải pháp số toàn diện, giúp sinh viên và nhà sáng lập trẻ nổi bật giữa đám đông.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="viet-glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VietServices;
