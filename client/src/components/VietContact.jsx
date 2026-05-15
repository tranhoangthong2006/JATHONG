import React from 'react';
import { motion } from 'framer-motion';

const VietContact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">LIÊN HỆ <span className="viet-text-gradient">NGAY.</span></h2>
          <p className="text-gray-600">Điền thông tin bên dưới, chúng tôi sẽ phản hồi nhanh nhất có thể .</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="viet-glass p-8 md:p-12 rounded-3xl"
        >
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Họ và Tên</label>
                <input
                  type="text"
                  placeholder="tên của bạn "
                  className="bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Dịch Vụ Cần Dùng</label>
              <select className="bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors appearance-none">
                <option value="landing">Thiết kế Landing Page</option>
                <option value="mockup">Website Mô Phỏng</option>
                <option value="custom">portfolio cá nhân </option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Tin Nhắn</label>
              <textarea
                rows="4"
                placeholder="Hãy cho chúng tôi biết về tổng quan yêu cầu của bạn "
                className="bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors resize-none"
              ></textarea>
            </div>

            <button className="mt-4 bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors duration-300">
              Gửi Tin Nhắn
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default VietContact;
