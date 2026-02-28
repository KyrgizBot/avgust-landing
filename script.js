/**
 * AVGUST LANDING - JAVASCRIPT
 * SCRUM-27: Pixel-Perfect Redesign
 * Modern, lightweight, vanilla JS with QA improvements
 */

(function() {
    'use strict';

    // Development mode flag - set to false for production
    const DEV_MODE = false;
    
    // Safe console wrapper
    const safeLog = DEV_MODE ? console.log.bind(console) : () => {};

    // =====================================================
    // MOBILE MENU TOGGLE
    // =====================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle mobile menu
            mainNav.classList.toggle('mobile-open');
        });
        
        // Close menu when clicking on nav links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('mobile-open');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mainNav.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && mainNav.classList.contains('mobile-open')) {
                mainNav.classList.remove('mobile-open');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // =====================================================
    // SMOOTH SCROLL WITH OFFSET FOR FIXED HEADER
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset (header height + some padding)
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // ANIMATED STATISTICS COUNTERS
    // =====================================================
    function animateCounter(element, target, suffix = '') {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const stepDuration = duration / steps;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            
            // Format number
            let displayValue = Math.floor(current);
            if (target >= 1000) {
                displayValue = (displayValue / 1000).toFixed(1) + 'K';
            } else {
                displayValue = displayValue.toString();
            }
            
            element.textContent = displayValue + suffix;
        }, stepDuration);
    }
    
    // Observe statistics section for counter animation
    const statsSection = document.querySelector('.statistics');
    let statsAnimated = false;
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const suffix = target === 98 ? '%' : '+';
                        animateCounter(stat, target, suffix);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }

    // =====================================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // =====================================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous messages
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            // Get form elements with null checks
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const companyInput = document.getElementById('company');
            const messageInput = document.getElementById('message');
            
            if (!nameInput || !emailInput || !companyInput || !messageInput) {
                showMessage('Ошибка формы. Пожалуйста, обновите страницу.', 'error');
                return;
            }
            
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                company: companyInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            // Basic validation
            if (!formData.name) {
                showMessage('Пожалуйста, укажите ваше имя', 'error');
                nameInput.focus();
                return;
            }
            
            if (!formData.email) {
                showMessage('Пожалуйста, укажите email', 'error');
                emailInput.focus();
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showMessage('Пожалуйста, укажите корректный email', 'error');
                emailInput.focus();
                return;
            }
            
            if (!formData.company) {
                showMessage('Пожалуйста, укажите название компании', 'error');
                companyInput.focus();
                return;
            }
            
            if (!formData.message) {
                showMessage('Пожалуйста, опишите ваши требования', 'error');
                messageInput.focus();
                return;
            }
            
            // Submit form
            submitForm(formData);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = type === 'success' ? 'flex' : 'block';
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 8000);
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function submitForm(data) {
        const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;
        if (!submitBtn) return;
        
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual backend endpoint in production)
        setTimeout(() => {
            safeLog('Form data:', data);
            
            // In production, send data to backend:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(result => { ... })
            
            // Show success message with checkmark
            showMessage('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Reset form
            if (contactForm) {
                contactForm.reset();
            }
            
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    // =====================================================
    // HEADER SHADOW ON SCROLL
    // =====================================================
    const header = document.querySelector('.header');
    
    function handleScroll() {
        if (!header) return;
        
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    }
    
    if (header) {
        window.addEventListener('scroll', handleScroll);
    }

    // =====================================================
    // INTERSECTION OBSERVER WITH STAGGERED DELAY
    // =====================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                const delay = index * 100; // 100ms between each element
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                // Stop observing once animated
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and items with staggered animation
    const animatedElements = document.querySelectorAll(
        '.product-card, .service-card, .stat-item, .consulting-content, .consulting-image, .contact-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // =====================================================
    // CONSISTENT HOVER EFFECTS FOR CARDS
    // =====================================================
    const allCards = document.querySelectorAll('.product-card, .service-card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // =====================================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // =====================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav a[href^="#"]');
    
    function highlightNav() {
        if (!header) return;
        
        const scrollY = window.pageYOffset;
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Run on page load

    // =====================================================
    // ACCESSIBILITY: Focus trap for mobile menu
    // =====================================================
    function trapFocus(element) {
        if (!element) return;
        
        element.addEventListener('keydown', function(e) {
            // Close on Escape
            if (e.key === 'Escape' || e.keyCode === 27) {
                if (mainNav && mainNav.classList.contains('mobile-open')) {
                    if (mobileMenuBtn) {
                        mobileMenuBtn.click();
                    }
                }
            }
        });
    }
    
    if (mainNav) {
        trapFocus(mainNav);
    }

    // =====================================================
    // PERFORMANCE: Optimize images
    // =====================================================
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        safeLog(`✓ ${images.length} images with native lazy loading`);
    }

    // =====================================================
    // INITIALIZATION COMPLETE
    // =====================================================
    safeLog('✓ Avgust Landing initialized');
    safeLog('✓ All features ready');
    
})();
