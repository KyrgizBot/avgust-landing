/**
 * AVGUST LANDING - JAVASCRIPT
 * Modern, lightweight, vanilla JS
 */

(function() {
    'use strict';

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
            
            // Toggle classes
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mainNav.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && mainNav.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
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
                const headerHeight = document.querySelector('.header').offsetHeight;
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
    // ACTIVE NAVIGATION LINK ON SCROLL
    // =====================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav a[href^="#"]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 50;
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
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Basic validation
            if (!formData.name) {
                showMessage('Пожалуйста, укажите ваше имя', 'error');
                return;
            }
            
            if (!formData.email) {
                showMessage('Пожалуйста, укажите email', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showMessage('Пожалуйста, укажите корректный email', 'error');
                return;
            }
            
            if (!formData.message) {
                showMessage('Пожалуйста, напишите сообщение', 'error');
                return;
            }
            
            // Simulate form submission
            // In production, replace this with actual AJAX request to your backend
            submitForm(formData);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    function submitForm(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual backend endpoint)
        setTimeout(() => {
            // For demo purposes, we'll show success
            // In production, handle the actual response
            console.log('Form data:', data);
            
            // Create mailto link as fallback
            const mailtoLink = `mailto:info@avgust-td.ru?subject=Заявка с сайта от ${encodeURIComponent(data.name)}&body=${encodeURIComponent(
                `Имя: ${data.name}\nEmail: ${data.email}\nТелефон: ${data.phone}\n\nСообщение:\n${data.message}`
            )}`;
            
            // Show success message
            showMessage('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Open email client
            // window.location.href = mailtoLink;
            
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
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // =====================================================
    // ANIMATION ON SCROLL (FADE IN)
    // =====================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and items
    const animatedElements = document.querySelectorAll(
        '.product-card, .service-card, .consulting-item, .stat-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // =====================================================
    // PERFORMANCE: Lazy load images if any are added later
    // =====================================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // =====================================================
    // ACCESSIBILITY: Focus trap for mobile menu
    // =====================================================
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input, select'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' || e.keyCode === 9) {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
            
            // Close on Escape
            if (e.key === 'Escape' || e.keyCode === 27) {
                if (mainNav.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
            }
        });
    }
    
    if (mainNav) {
        trapFocus(mainNav);
    }

    // =====================================================
    // LOG INITIALIZATION
    // =====================================================
    console.log('✓ Avgust Landing initialized');
    console.log('✓ Mobile menu ready');
    console.log('✓ Smooth scroll enabled');
    console.log('✓ Form validation ready');
    console.log('✓ Scroll animations ready');
    
})();
