import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './VietAbout.css';

/* ───────────────────────────────────────
   Image / Video asset paths (public/)
   ─────────────────────────────────────── */
const BASE = '/about-jathong';
const jakieImages = [1, 2, 3, 4].map(i => `${BASE}/anh/${i}.png`);
const thongImages = [1, 2, 3, 4, 5, 6].map(i => `${BASE}/anh2/t${i}.png`);
const heroVideo = `${BASE}/video/0513.mp4`;

/* ───────────────────────────────────────
   Lightbox Component
   ─────────────────────────────────────── */
const Lightbox = ({ images, index, onClose, onChange }) => {
  const isOpen = index !== null;

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onChange((index + 1) % images.length);
    if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
  }, [isOpen, index, images.length, onClose, onChange]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="ja-lightbox-overlay" onClick={onClose}>
      <div className="ja-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button className="ja-lightbox-close" onClick={onClose}>&times;</button>
        <div className="ja-lightbox-stage">
          <button className="ja-lb-nav ja-lb-prev" onClick={() => onChange((index - 1 + images.length) % images.length)}>❮</button>
          <img src={images[index]} alt="" className="ja-lb-main-img" />
          <button className="ja-lb-nav ja-lb-next" onClick={() => onChange((index + 1) % images.length)}>❯</button>
        </div>
        <div className="ja-lb-thumbs">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={`ja-lb-thumb ${i === index ? 'active' : ''}`}
              onClick={() => onChange(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────
   3D Stacked Carousel (Jakie)
   ─────────────────────────────────────── */
const Carousel3D = ({ images, onImageClick }) => {
  const [current, setCurrent] = useState(0);
  const len = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % len);
    }, 4000);
    return () => clearInterval(timer);
  }, [len]);

  const getClass = (i) => {
    if (i === current) return 'ja-c3d-item active';
    if (i === (current + 1) % len) return 'ja-c3d-item next-1';
    if (i === (current + 2) % len) return 'ja-c3d-item next-2';
    if (i === (current - 1 + len) % len) return 'ja-c3d-item prev-1';
    return 'ja-c3d-item hidden';
  };

  return (
    <div className="ja-c3d-wrapper">
      <div className="ja-c3d-container">
        {images.map((src, i) => (
          <div
            key={i}
            className={getClass(i)}
            onClick={() => i === current ? onImageClick(i) : setCurrent(i)}
          >
            <img src={src} alt={`Jakie Profile ${i + 1}`} className="ja-c3d-img" />
          </div>
        ))}
      </div>
      <div className="ja-c3d-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`ja-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────────────────────
   Image Slider (Thong)
   ─────────────────────────────────────── */
const ImageSlider = ({ images, onImageClick }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="ja-slider-wrapper">
      <div className="ja-slider-box">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Thong ${i + 1}`}
            className={`ja-slide-img ${i === current ? 'active' : ''}`}
            onClick={() => onImageClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────────────────────
   Scroll Reveal Hook
   ─────────────────────────────────────── */
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`ja-reveal ${visible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════ */
const VietAbout = () => {
  const [jakieLb, setJakieLb] = useState(null);
  const [thongLb, setThongLb] = useState(null);

  return (
    <div className="ja-about-page">
      {/* Grid overlay */}
      <div className="ja-grid-overlay" />

      {/* ───── Navbar ───── */}
      <nav className="ja-navbar">
        <div className="ja-nav-inner">
          <Link to="/" className="ja-brand-logo">JATHONG</Link>
          <Link to="/" className="ja-back-link">
            <FiArrowLeft />
            <span>Quay Về Trang Chủ</span>
          </Link>
        </div>
      </nav>

      <main>
        {/* ───── Hero Section ───── */}
        <section className="ja-hero">
          <div className="ja-container ja-hero-grid">
            <Reveal className="ja-hero-content">
              <div className="ja-hero-badge">Digital Identity Startup</div>
              <h1 className="ja-hero-headline">
                BIẾN THƯƠNG HIỆU CÁ NHÂN<br />
                THÀNH <span className="ja-pill-text">PROFILE ONLINE</span>
              </h1>
              <p className="ja-hero-desc">
                JATHONG là startup được sáng lập bởi Jakie và Thong, chuyên xây dựng website,
                landing page và profile online chuyên nghiệp cho cá nhân, sinh viên, freelancer,
                creator và doanh nghiệp nhỏ.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="ja-hero-visual">
              <div className="ja-visual-box ja-hero-neon">
                <video autoPlay muted loop playsInline className="ja-hero-video">
                  <source src={heroVideo} type="video/mp4" />
                </video>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───── About Section ───── */}
        <section className="ja-about-section ja-section-pad">
          <div className="ja-container">
            <Reveal>
              <h2 className="ja-section-title">Chúng tôi là</h2>
            </Reveal>

            <div className="ja-about-grid">
              <Reveal delay={0.1} className="ja-about-text">
                <p className="ja-lead">
                  JATHONG là một startup về website, landing page và giải pháp xây dựng
                  thương hiệu cá nhân thành profile online chuyên nghiệp, được sáng lập bởi Jakie và Thong.
                </p>
                <p>
                  Chúng tôi ra đời với mong muốn giúp cá nhân, sinh viên, freelancer, creator và doanh nghiệp
                  nhỏ có một không gian số chỉn chu để giới thiệu bản thân, trình bày dự án, thể hiện năng lực
                  và tạo ấn tượng với người xem ngay từ lần đầu truy cập.
                </p>
                <p>
                  Không chỉ dừng lại ở việc thiết kế một website đẹp, JATHONG còn tập trung vào cách biến câu
                  chuyện, kỹ năng, kinh nghiệm và cá tính riêng của mỗi người thành một profile cá nhân có gu,
                  có định hướng và có khả năng thuyết phục.
                </p>
                <p>
                  Từ portfolio cá nhân, landing page giới thiệu dịch vụ, website mô phỏng dự án học tập cho đến
                  profile online dành cho người muốn xây dựng hình ảnh chuyên nghiệp, JATHONG giúp mọi ý tưởng
                  được trình bày rõ ràng, hiện đại và dễ ứng dụng trong thực tế.
                </p>
                <blockquote className="ja-quote">
                  "Mỗi người đều có một giá trị riêng, chỉ là cần một cách thể hiện đủ tốt để người khác nhìn
                  thấy và ghi nhớ."
                </blockquote>
              </Reveal>

              <Reveal delay={0.2} className="ja-carousel-col">
                <Carousel3D images={jakieImages} onImageClick={(i) => setJakieLb(i)} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───── Why Choose JATHONG ───── */}
        <section className="ja-why-section ja-section-pad">
          <div className="ja-container">
            <Reveal>
              <h2 className="ja-section-title ja-title-light">Vì sao chọn JATHONG?</h2>
            </Reveal>

            <div className="ja-why-grid">
              <div className="ja-features-col">
                {[
                  { title: 'Có gu thẩm mỹ', desc: 'Thiết kế hiện đại, tối giản, rõ ràng và có khả năng tạo ấn tượng ngay từ cái nhìn đầu tiên.' },
                  { title: 'Hiểu thương hiệu cá nhân', desc: 'Không chỉ làm web đẹp, JATHONG giúp bạn thể hiện được mình là ai và bạn có gì nổi bật.' },
                  { title: 'Tư duy marketing', desc: 'Mỗi website không chỉ để nhìn, mà còn để truyền tải thông điệp và phục vụ mục tiêu rõ ràng.' },
                  { title: 'Dễ ứng dụng thực tế', desc: 'Phù hợp cho học tập, portfolio, freelance, personal branding và kinh doanh nhỏ.' },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="ja-feature-item">
                      <div className="ja-feature-title">
                        <span className="ja-feature-dot" />
                        <h4>{item.title}</h4>
                      </div>
                      <p>{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.2} className="ja-thong-col">
                <ImageSlider images={thongImages} onImageClick={(i) => setThongLb(i)} />
              </Reveal>
            </div>
          </div>
        </section>


      </main>

      {/* ───── Footer ───── */}
      <footer className="ja-footer">
        <div className="ja-container ja-footer-inner">
          <div className="ja-footer-brand">
            <h2>JATHONG.</h2>
            <p>Digital Identity &amp; Web Design Startup.</p>
          </div>
          <div className="ja-footer-copy">
            <p>&copy; {new Date().getFullYear()} JATHONG. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ───── Lightboxes ───── */}
      <Lightbox images={jakieImages} index={jakieLb} onClose={() => setJakieLb(null)} onChange={setJakieLb} />
      <Lightbox images={thongImages} index={thongLb} onClose={() => setThongLb(null)} onChange={setThongLb} />
    </div>
  );
};

export default VietAbout;
