// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navButtons.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // If the clicked item wasn't active, make it active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Simple carousel functionality (can be replaced with a library for more features)
class Carousel {
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({
            autoplay: true,
            interval: 5000,
            indicators: true,
            controls: true
        }, options);
        
        this.items = Array.from(this.element.children);
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        // Add carousel classes
        this.element.classList.add('carousel');
        this.items.forEach(item => {
            item.classList.add('carousel-item');
        });
        
        // Show first item
        this.goToItem(0);
        
        // Start autoplay if enabled
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }
    
    goToItem(index) {
        // Hide all items
        this.items.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show the selected item
        this.currentIndex = (index + this.items.length) % this.items.length;
        this.items[this.currentIndex].classList.add('active');
    }
    
    nextItem() {
        this.goToItem(this.currentIndex + 1);
    }
    
    prevItem() {
        this.goToItem(this.currentIndex - 1);
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextItem();
        }, this.options.interval);
    }
    
    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}

// Initialize carousels if they exist
const productCarousel = document.querySelector('.products-carousel');
if (productCarousel) {
    new Carousel(productCarousel, {
        autoplay: true,
        interval: 5000
    });
}

const testimonialCarousel = document.querySelector('.testimonials-carousel');
if (testimonialCarousel) {
    new Carousel(testimonialCarousel, {
        autoplay: true,
        interval: 6000
    });
}

// Add animation on scroll
const animatedElements = document.querySelectorAll('.benefit-card, .product-card, .step, .testimonial');

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
};

const handleScrollAnimation = () => {
    animatedElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated', 'fade-in');
        }
    });
};

// Run once on page load
handleScrollAnimation();

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimation);

// Add resize event listener (for responsive design)
window.addEventListener('resize', () => {
    // Handle window resize if needed
    // For example, recalculate dimensions for carousels
    if (window.innerWidth <= 768) {
        // Mobile view adjustments
    } else {
        // Desktop view adjustments
    }
});

// Form validation (if you add a contact form)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Form is valid, submit it
            // For a static site, you can use a service like Formspree
            // Or implement your own form handling logic
            alert('Form submitted successfully!');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Add lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
});

// Add scroll to top button functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
