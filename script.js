// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Yandex Map Initialization
function initMap() {
    if (typeof ymaps === 'undefined') {
        console.warn('Yandex Maps API not loaded. Map will not be displayed.');
        document.getElementById('map').innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666;">Карта временно недоступна</div>';
        return;
    }

    ymaps.ready(() => {
        // Coordinates for: 353430, Краснодарский край, Анапа, Анапское шоссе, д. 72
        // Approximate coordinates (may need adjustment)
        const coords = [44.8951, 37.3161]; // Anapa center coordinates
        
        const map = new ymaps.Map('map', {
            center: coords,
            zoom: 14,
            controls: ['zoomControl', 'fullscreenControl']
        });

        const placemark = new ymaps.Placemark(coords, {
            balloonContent: '<strong>ООО "Август"</strong><br>353430, Краснодарский край,<br>Анапа, Анапское ш., д. 72<br><a href="tel:+78613359752">+7 (861) 335-97-52</a>'
        }, {
            preset: 'islands#blueDotIcon',
            iconColor: '#1e3a8a'
        });

        map.geoObjects.add(placemark);
        
        // Disable drag on mobile for better UX
        if (window.innerWidth <= 768) {
            map.behaviors.disable('drag');
        }
    });
}

// Initialize map when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .advantage-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Form Validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Click to Call Analytics (optional)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Call initiated:', link.href);
        // Here you can add analytics tracking
        // Example: gtag('event', 'call', { phone_number: link.href });
    });
});

// Email Click Analytics (optional)
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email initiated:', link.href);
        // Here you can add analytics tracking
        // Example: gtag('event', 'email', { email_address: link.href });
    });
});

console.log('ООО "Август" - Website initialized successfully');
