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

// Navbar background opacity on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(248, 249, 250, 0.95)';
    } else {
        navbar.style.background = 'rgba(248, 249, 250, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
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

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Add subtle parallax effect to gradient background
document.addEventListener('mousemove', (e) => {
    const gradientBg = document.querySelector('.gradient-bg');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    gradientBg.style.background = `
        radial-gradient(ellipse at ${20 + x * 10}% ${20 + y * 10}%, rgba(91, 138, 114, 0.06) 0%, transparent 50%),
        radial-gradient(ellipse at ${80 - x * 10}% ${80 - y * 10}%, rgba(212, 165, 116, 0.06) 0%, transparent 50%),
        radial-gradient(ellipse at ${40 + x * 20}% ${60 - y * 20}%, rgba(124, 152, 133, 0.04) 0%, transparent 50%)
    `;
});

// Console easter egg
console.log('%c👋 Hi there, curious developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #a1a1aa;');
