import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VietNavbar from './components/VietNavbar';
import VietHero from './components/VietHero';
import VietServices from './components/VietServices';
import VietPortfolio from './components/VietPortfolio';

import VietFooter from './components/VietFooter';
import VietAbout from './pages/VietAbout';
import TrangDichVu from './pages/TrangDichVu';
import TrangMauGiaoDien from './pages/TrangMauGiaoDien';
import TrangQuyTrinh from './pages/TrangQuyTrinh';
import TrangLienHe from './pages/TrangLienHe';
import AdminDashboard from './pages/AdminDashboard';

function TrangChu() {
  return (
    <>
      <VietNavbar />
      <main>
        <VietHero />
        <VietServices />
        <VietPortfolio />
      </main>
      <VietFooter />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-[#0A0D14] text-white min-h-screen relative overflow-hidden selection:bg-[#0077FF]/30 selection:text-white font-sans">


        <div className="relative z-10 flex flex-col min-h-screen justify-between">
          <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/about" element={<VietAbout />} />
            <Route path="/services" element={<TrangDichVu />} />
            <Route path="/portfolio" element={<TrangMauGiaoDien />} />
            <Route path="/workflow" element={<TrangQuyTrinh />} />
            <Route path="/contact" element={<TrangLienHe />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
