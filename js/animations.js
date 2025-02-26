/**
 * Animations JavaScript file for iCashewTech
 * Handles scroll animations, counters, and other interactive elements
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // =========================================================
    // Intersection Observer for Fade-In Elements
    // =========================================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create the observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                // Add 'visible' class to show the element
                entry.target.classList.add('visible');
                // Stop observing the element
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Use viewport as root
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly above bottom of viewport
    });
    
    // Start observing each fade element
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // =========================================================
    // Number Counter Animation
    // =========================================================
    const counterElements = document.querySelectorAll('.counter');
    
    // Create the counter observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start counter animation
                animateCounter(entry.target);
                // Stop observing after triggering
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when at least 50% of the element is visible
    });
    
    // Observe all counter elements
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    /**
     * Function to animate a counter from 0 to the target value
     * @param {HTMLElement} counterElement - The element to animate
     */
    function animateCounter(counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'), 10);
        const duration = 2000; // Animation duration in milliseconds
        const frameDuration = 1000 / 60; // Frame duration for 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        // Determine increment per frame
        const increment = target / totalFrames;
        
        // Start the animation loop
        const animate = () => {
            frame++;
            const currentValue = Math.round(increment * frame);
            
            // Make sure we don't exceed the target
            counterElement.textContent = Math.min(currentValue, target);
            
            // Request next frame until we reach total frames
            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                // Ensure we end exactly at the target
                counterElement.textContent = target;
            }
        };
        
        // Start animation
        animate();
    }
    
    // =========================================================
    // Logo Animation Enhancement
    // =========================================================
    const logoSvg = document.getElementById('logo-svg');
    
    if (logoSvg) {
        // Make the logo interactive
        logoSvg.addEventListener('mouseenter', function() {
            // Reset animations to play them again on hover
            const logoPath = this.querySelector('.logo-path');
            const logoText = this.querySelector('text');
            
            if (logoPath) {
                logoPath.style.animation = 'none';
                // Trigger reflow
                void logoPath.offsetWidth;
                logoPath.style.animation = 'logoPath 2s ease forwards';
            }
            
            if (logoText) {
                logoText.style.animation = 'none';
                // Trigger reflow
                void logoText.offsetWidth;
                logoText.style.animation = 'logoText 2.5s ease forwards';
            }
        });
    }
    
    // =========================================================
    // Parallax Effect for Hero Section
    // =========================================================
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', function() {
            // Calculate how far we've scrolled
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3; // Adjust speed factor
            
            // Apply transform to create parallax effect
            if (scrolled < heroSection.offsetHeight) {
                heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }
    
    // =========================================================
    // Feature Card Hover Effect
    // =========================================================
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add shine effect
            const shine = document.createElement('div');
            shine.classList.add('card-shine');
            this.appendChild(shine);
            
            // Start animation
            setTimeout(() => {
                shine.style.opacity = '0.2';
                shine.style.transform = 'translateX(100%)';
                
                // Remove after animation
                setTimeout(() => {
                    shine.remove();
                }, 500);
            }, 10);
            
            // Scale icon slightly
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.color = 'var(--secondary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset icon
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = '';
            }
        });
    });
    
    // =========================================================
    // Product Image Interactive Effect
    // =========================================================
    const productImage = document.querySelector('.product-image');
    
    if (productImage) {
        // Create overlay for zoom effect
        const overlay = document.createElement('div');
        overlay.classList.add('image-overlay');
        productImage.appendChild(overlay);
        
        // Add interactive effects
        productImage.addEventListener('mouseenter', function() {
            overlay.style.opacity = '0.1';
        });
        
        productImage.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
        });
        
        productImage.addEventListener('mousemove', function(e) {
            // Create spotlight effect that follows cursor
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(249, 168, 37, 0.3), transparent 50%)`;
        });
    }
    
    // =========================================================
    // Testimonial Cards Animation
    // =========================================================
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    testimonialItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // =========================================================
    // Button Hover Effect Enhancement
    // =========================================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            this.appendChild(ripple);
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});