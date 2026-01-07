// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const languageSwitcher = document.querySelector('.language-switcher');
const navRight = document.querySelector('.nav-right');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Move language switcher to mobile menu or back to nav-right
        if (isActive) {
            // Mobile menu is opening - move language switcher inside nav-menu
            navMenu.appendChild(languageSwitcher);
        } else {
            // Mobile menu is closing - move language switcher back to nav-right
            navRight.insertBefore(languageSwitcher, mobileMenuBtn);
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            // Move language switcher back to nav-right
            navRight.insertBefore(languageSwitcher, mobileMenuBtn);
        });
    });
}

// Language Switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        
        // Save language preference
        localStorage.setItem('language', lang);
        currentLang = lang;
        
        // Update translations
        updateTranslations();
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        console.log('Form submitted:', formData);
        
        // Show success message
        alert(currentLang === 'ru' ? 'Спасибо! Ваша заявка отправлена.' : 
              currentLang === 'uz' ? 'Rahmat! Arizangiz yuborildi.' : 
              'Thank you! Your request has been sent.');
        
        // Reset form
        contactForm.reset();
    });
}

// Set current year in footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Filter (for projects page)
const filterButtons = document.querySelectorAll('[data-filter]');
if (filterButtons.length > 0) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get all project cards
            const projectCards = document.querySelectorAll('[data-category]');
            
            projectCards.forEach((card, index) => {
                const shouldShow = filter === 'all' || card.dataset.category === filter;
                
                if (shouldShow) {
                    // Show card with staggered animation
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    
                    setTimeout(() => {
                        card.style.animation = `fadeUp 0.5s ease-out ${index * 0.1}s both`;
                    }, 10);
                } else {
                    // Hide card
                    card.style.animation = 'fadeOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Number Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Animate stat counters when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const value = entry.target.textContent.replace(/\D/g, '');
            const suffix = entry.target.textContent.replace(/\d/g, '');
            entry.target.dataset.suffix = suffix;
            animateCounter(entry.target, parseInt(value));
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(stat => {
    statObserver.observe(stat);
});

// Form Validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+?[\d\s\-\(\)]+$/.test(phone);
}

// Add validation to forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const emailInput = form.querySelector('input[type="email"]');
        const phoneInput = form.querySelector('input[type="tel"]');
        
        let isValid = true;
        
        if (emailInput && !validateEmail(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = 'red';
        } else if (emailInput) {
            emailInput.style.borderColor = '';
        }
        
        if (phoneInput && !validatePhone(phoneInput.value)) {
            isValid = false;
            phoneInput.style.borderColor = 'red';
        } else if (phoneInput) {
            phoneInput.style.borderColor = '';
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroImages = document.querySelectorAll('.hero-bg img, .page-header-bg img');
    heroImages.forEach(img => {
        const scrolled = window.pageYOffset;
        img.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

console.log('LUKSOMER Website loaded successfully!');