/**
 * Main JavaScript file for iCashewTech
 * Handles core functionality, navigation, and user interactions
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // =========================================================
    // Mobile Navigation Toggle
    // =========================================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('.header');

    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navList && navList.classList.contains('active') && 
            !event.target.closest('.nav-list') && 
            !event.target.closest('.mobile-menu-toggle')) {
            navList.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    });

    // =========================================================
    // Sticky Header
    // =========================================================
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove sticky class based on scroll position
        if (scrollTop > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });

    // =========================================================
    // Back to Top Button
    // =========================================================
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================================
    // Smooth Scrolling for Anchor Links
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    document.body.classList.remove('mobile-menu-open');
                }
            }
        });
    });

    // =========================================================
    // Testimonial Slider
    // =========================================================
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialItems.length > 0 && prevBtn && nextBtn) {
        // Initialize testimonial functionality if screen size requires it
        let currentTestimonial = 0;
        
        // Function to hide all testimonials except the active one on mobile
        const updateTestimonials = () => {
            // Only apply slider functionality on mobile screens
            if (window.innerWidth <= 768) {
                testimonialItems.forEach((item, index) => {
                    if (index === currentTestimonial) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                // Reset all testimonials to display grid on larger screens
                testimonialItems.forEach(item => {
                    item.style.display = 'block';
                });
            }
        };
        
        // Initialize testimonial display
        updateTestimonials();
        
        // Next button functionality
        nextBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                updateTestimonials();
            }
        });
        
        // Previous button functionality
        prevBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
                updateTestimonials();
            }
        });
        
        // Update testimonials when window is resized
        window.addEventListener('resize', updateTestimonials);
    }

    // =========================================================
    // Image Lazy Loading
    // =========================================================
    // Use native lazy loading where supported
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src || lazyImage.src;
                    lazyImage.classList.remove('lazy');
                    observer.unobserve(lazyImage);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(image => {
            lazyImageObserver.observe(image);
        });
    }

    // =========================================================
    // Form Validation (for contact form)
    // =========================================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // Simple validation
            if (nameField && nameField.value.trim() === '') {
                showError(nameField, 'Name is required');
                isValid = false;
            } else if (nameField) {
                removeError(nameField);
            }
            
            if (emailField) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailField.value.trim() === '') {
                    showError(emailField, 'Email is required');
                    isValid = false;
                } else if (!emailRegex.test(emailField.value.trim())) {
                    showError(emailField, 'Please enter a valid email');
                    isValid = false;
                } else {
                    removeError(emailField);
                }
            }
            
            if (messageField && messageField.value.trim() === '') {
                showError(messageField, 'Message is required');
                isValid = false;
            } else if (messageField) {
                removeError(messageField);
            }
            
            // Prevent form submission if validation fails
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Helper functions for form validation
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
            
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorElement);
            }
            
            input.classList.add('invalid');
        }
        
        function removeError(input) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                formGroup.removeChild(errorElement);
            }
            
            input.classList.remove('invalid');
        }
    }

    // =========================================================
    // Initialize Logo Animation
    // =========================================================
    const logoSvg = document.getElementById('logo-svg');
    
    if (logoSvg) {
        // Reset animation to ensure it plays on page load
        const logoPath = logoSvg.querySelector('.logo-path');
        const logoText = logoSvg.querySelector('text');
        
        if (logoPath) {
            logoPath.style.animation = 'none';
            // Trigger reflow
            void logoPath.offsetWidth;
            logoPath.style.animation = '';
        }
        
        if (logoText) {
            logoText.style.animation = 'none';
            // Trigger reflow
            void logoText.offsetWidth;
            logoText.style.animation = '';
        }
    }

    // =========================================================
    // Active Navigation Link Highlighting
    // =========================================================
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
});