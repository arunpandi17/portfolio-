// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
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

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// ========================================
// SKILL BAR ANIMATION - FIXED VERSION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Get all skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Function to animate skill bars
    function animateSkillBars() {
        skillBars.forEach(bar => {
            // Get the position of the bar
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if bar is visible in viewport
            if (rect.top < windowHeight - 50) {
                // Get the width from inline style
                const targetWidth = bar.style.width;
                // Reset to 0 first
                bar.style.width = '0%';
                // Animate to target width after a small delay
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            }
        });
    }
    
    // Run animation on load
    setTimeout(animateSkillBars, 500);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Run animation on resize
    window.addEventListener('resize', animateSkillBars);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Force animation on load for any bars already visible
window.addEventListener('load', function() {
    setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 300);
            }
        });
    }, 1000);
});
