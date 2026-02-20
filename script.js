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

// Map Placeholder (no API key required)
function initMap() {
    document.getElementById('map').innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 20px; text-align: center; border-radius: 15px;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📍</div>
            <h3 style="margin-bottom: 1rem; font-size: 1.3rem;">Наш адрес</h3>
            <p style="font-size: 1.1rem; line-height: 1.6;">
                353430, Краснодарский край<br>
                Город-Курорт Анапа<br>
                Анапское шоссе, д. 72
            </p>
            <a href="https://yandex.ru/maps/?text=353430,%20Краснодарский%20край,%20Анапа,%20Анапское%20ш.,%20д.%2072" 
               target="_blank" 
               style="margin-top: 1.5rem; padding: 0.8rem 2rem; background: white; color: #1e3a8a; border-radius: 30px; text-decoration: none; font-weight: 600;">
                Открыть на Яндекс.Картах →
            </a>
        </div>
    `;
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

/* ========================================
   UX КРИТИЧЕСКИЕ ИСПРАВЛЕНИЯ
   Применено: Sat Feb 21 02:33:13 MSK 2026
   ======================================== */
/* ========================================
   КРИТИЧЕСКИЕ ИСПРАВЛЕНИЯ - AVGUST LANDING
   Добавить в конец script.js
   ======================================== */

// 1. УЛУЧШЕННОЕ МОБИЛЬНОЕ МЕНЮ с управлением фокусом
const mobileMenuBtnFixed = document.getElementById('mobileMenuBtn');
const navFixed = document.querySelector('.nav');

if (mobileMenuBtnFixed && navFixed) {
    mobileMenuBtnFixed.addEventListener('click', () => {
        const isExpanded = navFixed.classList.toggle('active');
        mobileMenuBtnFixed.classList.toggle('active');
        
        // Aria атрибуты
        mobileMenuBtnFixed.setAttribute('aria-expanded', isExpanded);
        mobileMenuBtnFixed.setAttribute('aria-label', 
            isExpanded ? 'Закрыть меню навигации' : 'Открыть меню навигации'
        );
        
        if (isExpanded) {
            // Фокус на первую ссылку
            const firstLink = navFixed.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
            
            // Закрытие по ESC
            document.addEventListener('keydown', closeMenuOnEscape);
            
            // Ловушка фокуса
            navFixed.addEventListener('keydown', trapMenuFocus);
            
            // Закрытие по клику вне меню
            setTimeout(() => {
                document.addEventListener('click', closeMenuOnOutsideClick);
            }, 10);
        } else {
            document.removeEventListener('keydown', closeMenuOnEscape);
            navFixed.removeEventListener('keydown', trapMenuFocus);
            document.removeEventListener('click', closeMenuOnOutsideClick);
            mobileMenuBtnFixed.focus();
        }
    });
}

function closeMenuOnEscape(e) {
    if (e.key === 'Escape' && navFixed.classList.contains('active')) {
        navFixed.classList.remove('active');
        mobileMenuBtnFixed.classList.remove('active');
        mobileMenuBtnFixed.setAttribute('aria-expanded', 'false');
        mobileMenuBtnFixed.setAttribute('aria-label', 'Открыть меню навигации');
        mobileMenuBtnFixed.focus();
        
        document.removeEventListener('keydown', closeMenuOnEscape);
        navFixed.removeEventListener('keydown', trapMenuFocus);
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}

function trapMenuFocus(e) {
    if (e.key === 'Tab') {
        const focusableElements = navFixed.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

function closeMenuOnOutsideClick(e) {
    if (!navFixed.contains(e.target) && !mobileMenuBtnFixed.contains(e.target)) {
        navFixed.classList.remove('active');
        mobileMenuBtnFixed.classList.remove('active');
        mobileMenuBtnFixed.setAttribute('aria-expanded', 'false');
        
        document.removeEventListener('keydown', closeMenuOnEscape);
        navFixed.removeEventListener('keydown', trapMenuFocus);
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}

// 2. АКТИВНАЯ НАВИГАЦИЯ при скролле
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120; // offset для header
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Обновляем все ссылки
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // Особый случай: если наверху страницы, ничего не выделяем
    if (scrollY < 100) {
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
        });
    }
}

// Запуск при загрузке и скролле
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Обновление при клике на ссылку
document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(updateActiveNavLink, 500);
    });
});

// 3. УЛУЧШЕННЫЙ SMOOTH SCROLL с закрытием мобильного меню
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

            // Закрыть мобильное меню
            if (navFixed && navFixed.classList.contains('active')) {
                navFixed.classList.remove('active');
                mobileMenuBtnFixed.classList.remove('active');
                mobileMenuBtnFixed.setAttribute('aria-expanded', 'false');
                
                document.removeEventListener('keydown', closeMenuOnEscape);
                navFixed.removeEventListener('keydown', trapMenuFocus);
                document.removeEventListener('click', closeMenuOnOutsideClick);
            }
        }
    });
});

// 4. ОТСЛЕЖИВАНИЕ КЛИКОВ (аналитика)
function trackInteraction(category, action, label) {
    console.log(`📊 [Analytics] ${category} | ${action} | ${label}`);
    
    // Здесь можно добавить отправку в Яндекс.Метрику:
    // if (typeof ym !== 'undefined') {
    //     ym(XXXXXX, 'reachGoal', action, { label: label });
    // }
}

// Отслеживание кликов по телефону
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackInteraction('Contact', 'phone-click', link.href);
    });
});

// Отслеживание кликов по email
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackInteraction('Contact', 'email-click', link.href);
    });
});

// Отслеживание CTA кнопок
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const text = btn.textContent.trim();
        trackInteraction('CTA', 'button-click', text);
    });
});

// 5. ЛЕНИВАЯ ЗАГРУЗКА КАРТЫ (производительность)
function lazyLoadMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Проверяем, загружен ли уже ymaps
                if (typeof ymaps === 'undefined') {
                    const script = document.createElement('script');
                    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
                    script.onload = initMap;
                    script.onerror = () => {
                        console.warn('⚠️ Не удалось загрузить Яндекс.Карты');
                        mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666; padding: 2rem; text-align: center;">Карта временно недоступна. <a href="https://yandex.ru/maps/?text=ООО%20Август%20Анапа" target="_blank" style="color: #1e3a8a; text-decoration: underline; margin-left: 0.5rem;">Открыть в Яндекс.Картах</a></div>';
                    };
                    document.body.appendChild(script);
                } else {
                    initMap();
                }
                observer.disconnect();
            }
        });
    }, {
        rootMargin: '100px' // Начать загрузку за 100px до появления
    });
    
    observer.observe(mapContainer);
}

// Запустить ленивую загрузку карты
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadMap);
} else {
    lazyLoadMap();
}

// 6. ACCESSIBILITY: объявление изменений для скринридеров
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Добавить CSS для sr-only (если еще нет)
if (!document.querySelector('style[data-sr-only]')) {
    const style = document.createElement('style');
    style.setAttribute('data-sr-only', 'true');
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    document.head.appendChild(style);
}

// 7. УЛУЧШЕННАЯ ИНИЦИАЛИЗАЦИЯ КАРТЫ
function initMapImproved() {
    if (typeof ymaps === 'undefined') {
        console.warn('⚠️ Yandex Maps API не загружен');
        return;
    }

    ymaps.ready(() => {
        const coords = [44.8951, 37.3161]; // Координаты Анапы
        
        try {
            const map = new ymaps.Map('map', {
                center: coords,
                zoom: 14,
                controls: ['zoomControl', 'fullscreenControl']
            });

            const placemark = new ymaps.Placemark(coords, {
                balloonContentHeader: '<strong>ООО "Август"</strong>',
                balloonContentBody: '353430, Краснодарский край,<br>Анапа, Анапское ш., д. 72',
                balloonContentFooter: '<a href="tel:+78613359752">+7 (861) 335-97-52</a>',
                hintContent: 'ООО "Август" - торговая компания'
            }, {
                preset: 'islands#blueDotIcon',
                iconColor: '#1e3a8a'
            });

            map.geoObjects.add(placemark);
            
            // Отключить drag на мобильных для лучшего UX
            if (window.innerWidth <= 768) {
                map.behaviors.disable('drag');
            }
            
            console.log('✅ Карта успешно инициализирована');
        } catch (error) {
            console.error('❌ Ошибка инициализации карты:', error);
        }
    });
}

console.log('✅ Критические исправления загружены | ООО "Август"');
