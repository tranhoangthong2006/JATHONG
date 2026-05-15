document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 50;

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Image Slider Auto-play
    const sliders = document.querySelectorAll('.image-slider');
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide-item');
        let currentSlide = 0;
        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 3000); // Change image every 3 seconds
        }
    });

    // Lightbox Triggers
    document.querySelectorAll('.slide-item').forEach((img, index) => {
        img.addEventListener('click', () => {
            // Modulo 4 since we have 4 images repeated in multiple sliders
            openLightbox(index % 4);
        });
    });

    // Lightbox Event Listeners
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', () => changeLightboxSlide(-1));
    document.querySelector('.lightbox-next').addEventListener('click', () => changeLightboxSlide(1));
    
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });

    // Thong Lightbox Triggers
    document.querySelectorAll('.thong-slide-item').forEach((img, index) => {
        img.addEventListener('click', () => {
            openThongLightbox(index % 6);
        });
    });

    // Thong Lightbox Event Listeners
    document.querySelector('.thong-lightbox-close').addEventListener('click', closeThongLightbox);
    document.querySelector('.thong-lightbox-prev').addEventListener('click', () => changeThongLightboxSlide(-1));
    document.querySelector('.thong-lightbox-next').addEventListener('click', () => changeThongLightboxSlide(1));
    
    document.getElementById('thong-lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'thong-lightbox') {
            closeThongLightbox();
        }
    });
});

// Lightbox Global Functions
let lbIndex = 0;
const lbImages = ["ảnh/1.png", "ảnh/2.png", "ảnh/3.png", "ảnh/4.png"];

function openLightbox(index) {
    document.getElementById('lightbox').style.display = 'block';
    currentLightboxSlide(index);
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeLightboxSlide(n) {
    lbIndex += n;
    if (lbIndex >= lbImages.length) lbIndex = 0;
    if (lbIndex < 0) lbIndex = lbImages.length - 1;
    currentLightboxSlide(lbIndex);
}

function currentLightboxSlide(n) {
    lbIndex = n;
    document.getElementById('lightbox-img').src = lbImages[lbIndex];
    
    let thumbs = document.querySelectorAll('.lb-thumb');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    if (thumbs[lbIndex]) {
        thumbs[lbIndex].classList.add('active');
    }
}

// 3D Stacked Carousel Logic
let current3dIndex = 0;

function rotateCarousel(n) {
    const items = document.querySelectorAll('.carousel-3d-item');
    if (items.length === 0) return;
    current3dIndex += n;
    if (current3dIndex >= items.length) current3dIndex = 0;
    if (current3dIndex < 0) current3dIndex = items.length - 1;
    update3dCarousel();
}

function jumpCarousel(n) {
    current3dIndex = n;
    update3dCarousel();
}

function update3dCarousel() {
    const items = document.querySelectorAll('.carousel-3d-item');
    const dots = document.querySelectorAll('.dot3d');
    
    items.forEach((item, i) => {
        item.className = 'carousel-3d-item'; // Reset classes
        
        if (i === current3dIndex) {
            item.classList.add('active');
        } else if (i === (current3dIndex + 1) % items.length) {
            item.classList.add('next-1');
        } else if (i === (current3dIndex + 2) % items.length) {
            item.classList.add('next-2');
        } else if (i === (current3dIndex - 1 + items.length) % items.length) {
            item.classList.add('prev-1');
        } else {
            item.style.opacity = '0';
        }
    });
    
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[current3dIndex]) dots[current3dIndex].classList.add('active');
}

// Thong Lightbox Global Functions
let thongLbIndex = 0;
const thongLbImages = ["ảnh 2/t1.png", "ảnh 2/t2.png", "ảnh 2/t3.png", "ảnh 2/t4.png", "ảnh 2/t5.png", "ảnh 2/t6.png"];

function openThongLightbox(index) {
    document.getElementById('thong-lightbox').style.display = 'block';
    currentThongLightboxSlide(index);
}

function closeThongLightbox() {
    document.getElementById('thong-lightbox').style.display = 'none';
}

function changeThongLightboxSlide(n) {
    thongLbIndex += n;
    if (thongLbIndex >= thongLbImages.length) thongLbIndex = 0;
    if (thongLbIndex < 0) thongLbIndex = thongLbImages.length - 1;
    currentThongLightboxSlide(thongLbIndex);
}

function currentThongLightboxSlide(n) {
    thongLbIndex = n;
    document.getElementById('thong-lightbox-img').src = thongLbImages[thongLbIndex];
    
    let thumbs = document.querySelectorAll('.thong-lb-thumb');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    if (thumbs[thongLbIndex]) {
        thumbs[thongLbIndex].classList.add('active');
    }
}
