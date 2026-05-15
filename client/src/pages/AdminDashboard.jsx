import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiMessageSquare, FiDownload, FiSearch, FiCheckCircle, FiClock, FiLogOut, FiTrash2 } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contacts`, {
        headers: {
          'x-admin-password': password
        }
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
        setIsAuthenticated(true);
        setError('');
      } else if (response.status === 401) {
        setError('Mật khẩu không chính xác.');
      } else {
        const errData = await response.json().catch(() => ({}));
        setError(`Lỗi hệ thống/Database: ${errData.message || response.statusText}`);
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ. Vui lòng đảm bảo Backend đang chạy ở cổng 5000.');
    }
    setLoading(false);
  };

  const fetchContacts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contacts`, {
        headers: { 'x-admin-password': password }
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'new' ? 'replied' : 'new';
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contacts/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khách hàng này vĩnh viễn không?')) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': password
        }
      });
      if (response.ok) {
        setContacts(contacts.filter(c => c._id !== id));
      } else {
        alert('Có lỗi xảy ra khi xóa!');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối máy chủ!');
    }
  };

  const exportToExcel = () => {
    const exportData = filteredContacts.map(c => ({
      'Họ và Tên': c.hoTen,
      'Email': c.email,
      'Dịch Vụ': c.dichVu,
      'Gói DỊch Vụ': c.goiDichVu || '',
      'Tin Nhắn': c.tinNhan,
      'Số Điện Thoại': c.soDienThoai,
      'Ngày Gửi': new Date(c.createdAt).toLocaleString('vi-VN')
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, `JATHONG_Contacts_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black max-w-md w-full mx-4"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tighter mb-2">JATHONG.</h1>
            <p className="text-gray-500 font-medium">Khu vực quản trị cấp cao</p>
          </div>
          <form onSubmit={login} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Mật khẩu Admin</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors"
                placeholder="Nhập mật khẩu..."
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
            </button>
            <div className="text-center pt-4">
              <Link to="/" className="text-sm text-gray-500 hover:text-black font-medium underline">Quay về trang chủ</Link>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Calculate stats
  const totalContacts = contacts.length;
  const newContacts = contacts.filter(c => c.trangThai === 'new').length;
  
  // Format data for chart (contacts per day)
  const chartDataObj = contacts.reduce((acc, contact) => {
    const date = new Date(contact.createdAt).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(chartDataObj).slice(-7).map(date => ({ date, count: chartDataObj[date] })).reverse();

  const filteredContacts = contacts.filter(c => 
    c.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium">Quản lý khách hàng JATHONG Studio</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold hover:bg-green-200 transition-colors">
              <FiDownload /> Xuất Excel
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold hover:bg-red-200 transition-colors">
              <FiLogOut /> Thoát
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Stat Box 1 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl mb-4">
              <FiUsers />
            </div>
            <div>
              <p className="text-gray-500 font-bold text-sm uppercase">Tổng Khách Hàng</p>
              <h2 className="text-4xl font-black">{totalContacts}</h2>
            </div>
          </div>

          {/* Stat Box 2 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl mb-4">
              <FiMessageSquare />
            </div>
            <div>
              <p className="text-gray-500 font-bold text-sm uppercase">Yêu Cầu Mới</p>
              <h2 className="text-4xl font-black">{newContacts}</h2>
            </div>
          </div>

          {/* Chart Box */}
          <div className="md:col-span-2 bg-white p-6 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-gray-500 font-bold text-sm uppercase mb-4">Lưu lượng liên hệ (7 ngày)</p>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#000000" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="p-6 border-b-2 border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold">Danh sách yêu cầu</h3>
            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm Email hoặc Tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black outline-none font-medium text-sm transition-colors"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 border-b-2 border-gray-400">
                  <th className="p-3 font-bold text-sm text-black border border-gray-300 whitespace-nowrap">Họ Tên</th>
                  <th className="p-3 font-bold text-sm text-black border border-gray-300 whitespace-nowrap">Email</th>
                  <th className="p-3 font-bold text-sm text-black border border-gray-300 whitespace-nowrap">Số Điện Thoại</th>
                  <th className="p-3 font-bold text-sm text-black border border-gray-300 whitespace-nowrap">Dịch Vụ</th>
                  <th className="p-3 font-bold text-sm text-black border border-gray-300 whitespace-nowrap">Gói Dịch Vụ Phụ</th>
                  <th className="p-3 font-bold text-sm text-black border border-gray-300 min-w-[250px]">Tin Nhắn</th>
                  <th className="p-3 font-bold text-sm text-black border border-gray-300 whitespace-nowrap">Ngày Gửi</th>
                  <th className="p-3 font-bold text-sm text-black border border-gray-300 text-center whitespace-nowrap">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map(contact => (
                  <tr key={contact._id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-3 text-sm border border-gray-300 font-medium text-black">
                      {contact.hoTen}
                    </td>
                    <td className="p-3 text-sm border border-gray-300 text-gray-700">
                      {contact.email}
                    </td>
                    <td className="p-3 text-sm border border-gray-300 text-gray-700">
                      {contact.soDienThoai}
                    </td>
                    <td className="p-3 text-sm border border-gray-300">
                      <span className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-xs font-semibold">{contact.dichVu}</span>
                    </td>
                    <td className="p-3 text-sm border border-gray-300 text-gray-700">
                      {contact.goiDichVu || '-'}
                    </td>
                    <td className="p-3 text-sm border border-gray-300 text-gray-700" title={contact.tinNhan}>
                      {contact.tinNhan}
                    </td>
                    <td className="p-3 text-sm border border-gray-300 text-gray-700 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="p-3 text-center border border-gray-300">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => toggleStatus(contact._id, contact.trangThai)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-sm border text-xs font-bold transition-colors ${
                            contact.trangThai === 'new' 
                              ? 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' 
                              : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          }`}
                        >
                          {contact.trangThai === 'new' ? <><FiClock /> Chờ xử lý</> : <><FiCheckCircle /> Đã trả lời</>}
                        </button>
                        <button 
                          onClick={() => deleteContact(contact._id)}
                          title="Xóa khách hàng"
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredContacts.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500 font-medium border border-gray-300">
                      Không tìm thấy dữ liệu nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
