// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.5)';
    cursorFollower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// ===== TYPING EFFECT =====
const roles = [
    'Full Stack Developer',
    'Web Developer',
    'Problem Solver',
    'Tech Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTextElement = document.querySelector('.typed-text');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typedTextElement) {
        setTimeout(typeEffect, 1000);
    }
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ===== NAVIGATION =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
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

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
 
// ===== SKILLS TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.skills-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        panels.forEach(p => p.classList.remove('active'));
        const target = document.getElementById(btn.dataset.tab);
        if (target) {
            target.classList.add('active');
            // Re-animate skill bars when tab changes with delay
            setTimeout(() => {
                animateAllSkillBars();
            }, 400);
        }
    });
});

// ========================================
// SKILL BARS ANIMATION - RELIABLE VERSION
// ========================================

// Store all skill bars with their target widths
let skillBarsData = [];

function initSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    skillBarsData = [];
    
    bars.forEach(bar => {
        // Store the target width
        const targetWidth = bar.style.width;
        // Reset to 0
        bar.style.width = '0%';
        bar.dataset.animated = 'false';
        bar.dataset.targetWidth = targetWidth;
        
        skillBarsData.push({
            element: bar,
            targetWidth: targetWidth,
            animated: false
        });
    });
}

function animateAllSkillBars() {
    const windowHeight = window.innerHeight;
    let anyAnimated = false;
    
    skillBarsData.forEach(item => {
        const bar = item.element;
        const rect = bar.getBoundingClientRect();
        
        // Check if bar is visible in viewport
        const isVisible = (
            rect.top < windowHeight - 50 && 
            rect.bottom > 50
        );
        
        if (isVisible && !item.animated) {
            // Reset to 0 first
            bar.style.width = '0%';
            // Animate to target after small delay
            setTimeout(() => {
                bar.style.width = item.targetWidth;
                bar.dataset.animated = 'true';
                item.animated = true;
                anyAnimated = true;
            }, 150);
        }
    });
    
    return anyAnimated;
}

// ===== SCROLL HANDLER - RELIABLE =====
let scrollTimeout = null;
let isScrolling = false;

window.addEventListener('scroll', function() {
    // Use requestAnimationFrame for smooth performance
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            animateAllSkillBars();
            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

// ===== LOAD HANDLER =====
window.addEventListener('load', function() {
    // Initialize bars
    initSkillBars();
    
    // Animate after a delay
    setTimeout(function() {
        animateAllSkillBars();
    }, 600);
    
    // Second attempt after images load
    setTimeout(function() {
        animateAllSkillBars();
    }, 1200);
});

// ===== RESIZE HANDLER =====
let resizeTimeout = null;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reset animation state on resize
        skillBarsData.forEach(item => {
            if (item.animated) {
                item.animated = false;
                item.element.dataset.animated = 'false';
            }
        });
        animateAllSkillBars();
    }, 300);
});

// ===== INTERSECTION OBSERVER - BEST PRACTICE =====
// This is the most reliable method for detecting visibility
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.skill-progress');
            if (bar && bar.dataset.animated === 'false') {
                const targetWidth = bar.dataset.targetWidth || bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.dataset.animated = 'true';
                    
                    // Update data
                    skillBarsData.forEach(item => {
                        if (item.element === bar) {
                            item.animated = true;
                        }
                    });
                }, 150);
            }
        }
    });
}, observerOptions);

// Observe all skill cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });
});

// ========================================
// FORCE ANIMATION - FALLBACK
// ========================================

// Force animation on all bars (useful for debugging)
function forceAnimateAllBars() {
    skillBarsData.forEach(item => {
        const bar = item.element;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = item.targetWidth;
            bar.dataset.animated = 'true';
            item.animated = true;
        }, 100);
    });
}

// Call this if you need to force animation
// forceAnimateAllBars();

// ========================================
// MUTATION OBSERVER - Detect DOM Changes
// ========================================

// Watch for changes in the DOM (like tab switching)
const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            // Check if any skill panel became visible
            document.querySelectorAll('.skills-panel.active').forEach(panel => {
                const bars = panel.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    // Reset animation state
                    bar.dataset.animated = 'false';
                    skillBarsData.forEach(item => {
                        if (item.element === bar) {
                            item.animated = false;
                        }
                    });
                });
                // Animate after a small delay
                setTimeout(animateAllSkillBars, 300);
            });
        }
    });
});

// Start observing
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        mutationObserver.observe(skillsSection, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }
});

// ========================================
// DEBUGGING - Check if bars are animating
// ========================================

// Uncomment to debug
// setInterval(() => {
//     console.log('Skill bars status:');
//     skillBarsData.forEach((item, index) => {
//         console.log(`Bar ${index}: animated=${item.animated}, width=${item.element.style.width}`);
//     });
// }, 3000);

// console.log('✅ Skill bars animation system loaded successfully!');

// ===== PROJECT FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('✅ Thank you for your message! I will get back to you soon.');
            this.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    });
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.project-card, .skill-card, .education-card, .timeline-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = '0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
    setTimeout(revealOnScroll, 500);
});

// ===== PARALLAX EFFECT =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    shapes.forEach((shape, index) => {
        const speed = 1 + index * 0.5;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== PREVENT DEFAULT CURSOR ON INTERACTIVE ELEMENTS =====
document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = 'var(--secondary)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'var(--primary)';
    });
});
