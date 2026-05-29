import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiMessageSquare, FiDownload, FiSearch, FiCheckCircle, FiClock, FiLogOut, FiTrash2, FiTrendingUp, FiList, FiX, FiEye, FiEyeOff, FiRefreshCw } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showServiceStats, setShowServiceStats] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [trashContacts, setTrashContacts] = useState([]);
  const [isOverloaded, setIsOverloaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info', // 'info' | 'danger'
    confirmText: 'Xác nhận',
    cancelText: 'Hủy',
    onConfirm: () => {}
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchSettings();
    }
  }, [isAuthenticated]);

  const fetchSettings = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/settings`);
      if (response.ok) {
        const data = await response.json();
        setIsOverloaded(data.isOverloaded);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleOverload = () => {
    setConfirmModal({
      isOpen: true,
      title: isOverloaded ? 'Tắt chế độ tạm ngưng' : 'Bật chế độ tạm ngưng',
      message: `Bạn có chắc chắn muốn ${isOverloaded ? 'tắt' : 'bật'} chế độ tạm ngưng nhận yêu cầu?`,
      type: isOverloaded ? 'info' : 'danger',
      confirmText: isOverloaded ? 'Tắt chế độ' : 'Bật chế độ',
      cancelText: 'Hủy bỏ',
      onConfirm: async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const response = await fetch(`${apiUrl}/api/settings/overload`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-admin-password': password
            },
            body: JSON.stringify({ isOverloaded: !isOverloaded })
          });
          if (response.ok) {
            setIsOverloaded(!isOverloaded);
          } else {
            alert('Có lỗi xảy ra khi cập nhật trạng thái.');
          }
        } catch (err) {
          console.error(err);
          alert('Lỗi kết nối máy chủ!');
        }
      }
    });
  };

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

  const fetchTrashContacts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contacts/trash`, {
        headers: { 'x-admin-password': password }
      });
      if (response.ok) {
        const data = await response.json();
        setTrashContacts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const restoreContact = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contacts/${id}/restore`, {
        method: 'PUT',
        headers: {
          'x-admin-password': password
        }
      });
      if (response.ok) {
        fetchContacts();
        fetchTrashContacts();
      } else {
        alert('Không thể khôi phục yêu cầu.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối máy chủ!');
    }
  };

  const permanentDeleteContact = (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'XÓA VĨNH VIỄN',
      message: 'Bạn có chắc chắn muốn xóa khách hàng này VĨNH VIỄN khỏi cơ sở dữ liệu? Hành động này KHÔNG THỂ KHÔI PHỤC.',
      type: 'danger',
      confirmText: 'Xóa vĩnh viễn',
      cancelText: 'Hủy bỏ',
      onConfirm: async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const response = await fetch(`${apiUrl}/api/contacts/${id}/permanent`, {
            method: 'DELETE',
            headers: {
              'x-admin-password': password
            }
          });
          if (response.ok) {
            setTrashContacts(prev => prev.filter(c => c._id !== id));
            setContacts(prev => prev.filter(c => c._id !== id));
          } else {
            alert('Không thể xóa vĩnh viễn.');
          }
        } catch (err) {
          console.error(err);
          alert('Lỗi kết nối máy chủ!');
        }
      }
    });
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

  const deleteContact = (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Xóa khách hàng',
      message: 'Bạn có chắc chắn muốn xóa khách hàng này vĩnh viễn không? Hành động này không thể hoàn tác.',
      type: 'danger',
      confirmText: 'Xóa vĩnh viễn',
      cancelText: 'Hủy bỏ',
      onConfirm: async () => {
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
      }
    });
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

  const totalContacts = contacts.length;
  const newContacts = contacts.filter(c => c.trangThai === 'new').length;
  
  const serviceCounts = contacts.reduce((acc, contact) => {
    if (contact.dichVu) {
      acc[contact.dichVu] = (acc[contact.dichVu] || 0) + 1;
    }
    return acc;
  }, {});

  let popularService = "Chưa có dữ liệu";
  let maxCount = 0;
  Object.entries(serviceCounts).forEach(([service, count]) => {
    if (count > maxCount) {
      maxCount = count;
      popularService = service;
    }
  });

  const sortedServiceCounts = Object.entries(serviceCounts)
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count);

  const chartDataObj = contacts.reduce((acc, contact) => {
    const date = new Date(contact.createdAt).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(chartDataObj).slice(0, 7).map(date => ({ date, count: chartDataObj[date] })).reverse();

  const filteredContacts = contacts.filter(c => 
    c.hoTen?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0D14] text-white font-sans relative overflow-hidden">
        {/* Ambient space background */}
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-[#0A6CF0]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#0A6CF0]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="viet-glass p-8 rounded-[32px] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-md w-full mx-4 bg-[#0A0D14]/60 backdrop-blur-xl relative z-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-orbitron font-extrabold tracking-widest mb-2 text-white">JATHONG.</h1>
            <p className="text-gray-400 font-light text-sm">Khu vực quản trị cấp cao</p>
          </div>
          <form onSubmit={login} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider font-orbitron mb-2">Mật khẩu Admin</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0D14] border border-white/[0.08] rounded-xl pl-4 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A6CF0] focus:ring-1 focus:ring-[#0A6CF0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 font-light"
                  placeholder="Nhập mật khẩu..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0A6CF0] text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(10,108,240,0.5)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
            </button>
            <div className="text-center pt-4">
              <Link to="/" className="text-sm text-gray-400 hover:text-[#0A6CF0] font-light underline transition-colors">Quay về trang chủ</Link>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] p-4 md:p-8 font-sans text-white relative overflow-hidden">
      {/* Background space/nebula elements */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-[#0A6CF0]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#0A6CF0]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left bg-[#0A0D14]/60 backdrop-blur-xl p-6 rounded-[28px] border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.4)] gap-4 md:gap-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-orbitron font-extrabold tracking-wider text-white">ADMIN DASHBOARD</h1>
            <p className="text-gray-400 font-light text-sm md:text-base">Quản lý khách hàng JATHONG Studio</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full md:w-auto">
            <button 
              onClick={toggleOverload} 
              className={`flex justify-center items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 w-full sm:w-auto ${
                isOverloaded 
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : 'bg-white/5 text-gray-300 hover:bg-[#0A6CF0] hover:text-white border border-white/10 hover:border-transparent'
              }`}
            >
              {isOverloaded ? <FiX /> : <FiCheckCircle />} 
              {isOverloaded ? 'Đang Tạm Ngưng' : 'Bật Tạm Ngưng'}
            </button>
            <button onClick={() => setShowServiceStats(true)} className="flex justify-center items-center gap-2 bg-[#0A6CF0]/10 text-[#0A6CF0] border border-[#0A6CF0]/20 px-4 py-2 rounded-full font-bold hover:bg-[#0A6CF0]/20 hover:shadow-[0_0_15px_rgba(10,108,240,0.2)] transition-all w-full sm:w-auto">
              <FiList /> Thống kê dịch vụ
            </button>
            <button onClick={() => { fetchTrashContacts(); setShowTrashModal(true); }} className="flex justify-center items-center gap-2 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-4 py-2 rounded-full font-bold hover:bg-yellow-500/20 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all w-full sm:w-auto">
              <FiTrash2 /> Thùng rác
            </button>
            <button onClick={exportToExcel} className="flex justify-center items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-2 rounded-full font-bold hover:bg-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all w-full sm:w-auto">
              <FiDownload /> Xuất Excel
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="flex justify-center items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-full font-bold hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all w-full sm:w-auto">
              <FiLogOut /> Thoát
            </button>
          </div>
        </div>

        {/* Stats Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stat Box 1 */}
          <div className="bg-[#0A0D14]/60 backdrop-blur-xl p-6 rounded-[24px] border border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between group hover:border-[#0A6CF0]/30 transition-all duration-300 relative overflow-hidden">
            <div className="w-12 h-12 bg-[#0A6CF0]/10 text-[#0A6CF0] border border-[#0A6CF0]/20 rounded-full flex items-center justify-center text-xl mb-4 group-hover:bg-[#0A6CF0]/20 transition-all duration-300">
              <FiUsers />
            </div>
            <div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-wider font-orbitron">Tổng Khách Hàng</p>
              <h2 className="text-4xl font-orbitron font-extrabold text-white mt-1">{totalContacts}</h2>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#0A6CF0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Stat Box 2 */}
          <div className="bg-[#0A0D14]/60 backdrop-blur-xl p-6 rounded-[24px] border border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between group hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full flex items-center justify-center text-xl mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
              <FiMessageSquare />
            </div>
            <div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-wider font-orbitron">Yêu Cầu Mới</p>
              <h2 className="text-4xl font-orbitron font-extrabold text-white mt-1">{newContacts}</h2>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Stat Box 3 - Most Popular Service */}
          <div className="bg-[#0A0D14]/60 backdrop-blur-xl p-6 rounded-[24px] border border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between group hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full flex items-center justify-center text-xl mb-4 group-hover:bg-purple-500/20 transition-all duration-300">
              <FiTrendingUp />
            </div>
            <div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-wider font-orbitron">Dịch Vụ Phổ Biến</p>
              <h2 className="text-lg md:text-2xl font-orbitron font-extrabold text-white truncate mt-1" title={popularService}>{popularService}</h2>
              {maxCount > 0 && <p className="text-xs font-light text-gray-500 mt-1">{maxCount} lượt chọn</p>}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Chart Box */}
        <div className="bg-[#0A0D14]/60 backdrop-blur-xl p-6 rounded-[24px] border border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-wider font-orbitron mb-4">Lưu lượng liên hệ (7 ngày)</p>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A6CF0" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0A6CF0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '11px', fontFamily: 'Montserrat' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0A0D14', borderColor: 'rgba(10, 108, 240, 0.3)', borderRadius: '12px', color: '#fff', fontFamily: 'Montserrat' }} />
                <Area type="monotone" dataKey="count" stroke="#0A6CF0" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-[#0A0D14]/60 backdrop-blur-xl rounded-[28px] border border-white/[0.06] shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="p-6 border-b border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">Danh sách yêu cầu</h3>
            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm Email hoặc Tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0A0D14] border border-white/[0.08] rounded-xl focus:border-[#0A6CF0] focus:ring-1 focus:ring-[#0A6CF0] outline-none font-medium text-sm transition-colors text-white"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-white/[0.05]">
              <thead>
                <tr className="bg-[#0A0D14] border-b border-white/[0.08]">
                  <th className="p-4 font-bold text-xs text-gray-400 border border-white/[0.05] whitespace-nowrap uppercase tracking-wider font-orbitron">Họ Tên</th>
                  <th className="p-4 font-bold text-xs text-gray-400 border border-white/[0.05] whitespace-nowrap uppercase tracking-wider font-orbitron">Email</th>
                  <th className="p-4 font-bold text-xs text-gray-400 border border-white/[0.05] whitespace-nowrap uppercase tracking-wider font-orbitron">Số Điện Thoại</th>
                  <th className="p-4 font-bold text-xs text-gray-400 border border-white/[0.05] whitespace-nowrap uppercase tracking-wider font-orbitron">Dịch Vụ</th>
                  <th className="p-4 font-bold text-xs text-gray-400 border border-white/[0.05] whitespace-nowrap uppercase tracking-wider font-orbitron">Gói Phụ</th>
                  <th className="p-4 font-bold text-xs text-gray-400 border border-white/[0.05] min-w-[250px] uppercase tracking-wider font-orbitron">Tin Nhắn</th>
                  <th className="p-4 font-bold text-xs text-gray-400 border border-white/[0.05] whitespace-nowrap uppercase tracking-wider font-orbitron">Ngày Gửi</th>
                  <th className="p-4 font-bold text-xs text-gray-400 border border-white/[0.05] text-center whitespace-nowrap uppercase tracking-wider font-orbitron">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map(contact => (
                  <tr key={contact._id} className="hover:bg-[#0A6CF0]/5 transition-colors border-b border-white/[0.05]">
                    <td className="p-4 text-sm border border-white/[0.05] font-semibold text-white">
                      {contact.hoTen}
                    </td>
                    <td className="p-4 text-sm border border-white/[0.05] text-gray-300">
                      {contact.email}
                    </td>
                    <td className="p-4 text-sm border border-white/[0.05] text-gray-300">
                      {contact.soDienThoai}
                    </td>
                    <td className="p-4 text-sm border border-white/[0.05]">
                      <span className="bg-[#0A6CF0]/10 border border-[#0A6CF0]/20 text-[#0A6CF0] px-2 py-1 rounded text-xs font-bold font-orbitron uppercase">{contact.dichVu}</span>
                    </td>
                    <td className="p-4 text-sm border border-white/[0.05] text-gray-300">
                      {contact.goiDichVu || '-'}
                    </td>
                    <td className="p-4 text-sm border border-white/[0.05] text-gray-400 max-w-xs truncate" title={contact.tinNhan}>
                      {contact.tinNhan}
                    </td>
                    <td className="p-4 text-sm border border-white/[0.05] text-gray-400 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="p-4 text-center border border-white/[0.05]">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => toggleStatus(contact._id, contact.trangThai)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold transition-all duration-300 ${
                            contact.trangThai === 'new' 
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/25' 
                              : 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/25'
                          }`}
                        >
                          {contact.trangThai === 'new' ? <><FiClock /> Chờ xử lý</> : <><FiCheckCircle /> Đã trả lời</>}
                        </button>
                        <button 
                          onClick={() => deleteContact(contact._id)}
                          title="Xóa khách hàng"
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredContacts.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-400 font-light border border-white/[0.05]">
                      Không tìm thấy dữ liệu nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Service Stats Modal */}
      {showServiceStats && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0D14] rounded-[28px] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full max-w-md overflow-hidden relative">
            <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-[#0a0d14]">
              <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">Thống kê dịch vụ</h3>
              <button onClick={() => setShowServiceStats(false)} className="text-gray-400 hover:text-white transition-colors">
                <FiX className="text-2xl" />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {sortedServiceCounts.length > 0 ? (
                <ul className="space-y-3">
                  {sortedServiceCounts.map((item, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-[#0a0d14]/40 rounded-xl border border-white/[0.05] hover:border-[#0A6CF0]/30 transition-colors">
                      <span className="font-semibold text-gray-300 font-orbitron text-sm">{item.service}</span>
                      <span className="bg-[#0A6CF0] text-white px-3 py-1 rounded-full font-bold text-xs shadow-[0_0_10px_#0A6CF0]">{item.count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 font-light">Chưa có dữ liệu thống kê.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recycle Bin Modal */}
      {showTrashModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0D14] rounded-[28px] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full max-w-4xl overflow-hidden relative">
            <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-[#0a0d14]">
              <div className="flex items-center gap-2">
                <FiTrash2 className="text-yellow-400 text-xl" />
                <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">Thùng rác yêu cầu</h3>
              </div>
              <button onClick={() => setShowTrashModal(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {trashContacts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#0A0D14] text-gray-400 uppercase text-xs tracking-wider border-b border-white/[0.05]">
                        <th className="p-3 font-semibold font-orbitron">Khách Hàng</th>
                        <th className="p-3 font-semibold font-orbitron">Dịch vụ chính</th>
                        <th className="p-3 font-semibold font-orbitron">Tin nhắn</th>
                        <th className="p-3 font-semibold font-orbitron">Ngày xóa</th>
                        <th className="p-3 font-semibold font-orbitron text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                      {trashContacts.map((contact, index) => (
                        <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                          <td className="p-3">
                            <div className="font-semibold text-white text-sm">{contact.hoTen}</div>
                            <div className="text-xs text-gray-500 font-light mt-0.5">{contact.email}</div>
                            <div className="text-xs text-gray-500 font-light">{contact.soDienThoai}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm font-semibold text-[#0A6CF0] font-orbitron">{contact.dichVu}</div>
                            {contact.goiDichVu && <div className="text-xs text-gray-400 font-light mt-0.5">{contact.goiDichVu}</div>}
                          </td>
                          <td className="p-3 max-w-[200px] truncate text-sm text-gray-300 font-light" title={contact.tinNhan}>
                            {contact.tinNhan}
                          </td>
                          <td className="p-3 text-sm text-gray-400 font-light">
                            {new Date(contact.updatedAt).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => restoreContact(contact._id)}
                                title="Khôi phục liên hệ"
                                className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-green-500/20 transition-all cursor-pointer"
                              >
                                <FiRefreshCw className="text-xs" />
                                Khôi phục
                              </button>
                              <button
                                onClick={() => permanentDeleteContact(contact._id)}
                                title="Xóa vĩnh viễn"
                                className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all cursor-pointer"
                              >
                                <FiTrash2 className="text-xs" />
                                Xóa vĩnh viễn
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiTrash2 className="text-gray-600 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500 font-light">Thùng rác trống.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0A0D14] rounded-[28px] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)] w-full max-w-md overflow-hidden relative p-6 space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">{confirmModal.title}</h3>
              <p className="text-gray-400 mt-3 font-light text-sm leading-relaxed">{confirmModal.message}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer"
              >
                {confirmModal.cancelText}
              </button>
              <button
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                }}
                className={`flex-1 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] cursor-pointer ${
                  confirmModal.type === 'danger'
                    ? 'bg-red-600 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                    : 'bg-[#0A6CF0] hover:bg-[#0077FF] hover:shadow-[0_0_20px_rgba(10,108,240,0.4)]'
                }`}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
