document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    initTypingEffect();
    initScrollReveal();
    initCounters();
    initCursorGlow();
    initContactFab();
    initMarquee();
});

function initTheme() {
    const toggle = document.querySelector('.theme-toggle');
    const mobileToggle = document.querySelector('.mobile-theme-toggle');
    const stored = localStorage.getItem('theme');
    
    if (stored) {
        document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    function switchTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }
    
    toggle?.addEventListener('click', switchTheme);
    mobileToggle?.addEventListener('click', switchTheme);
}

function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    
    btn?.addEventListener('click', function() {
        btn.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            btn.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

function initTypingEffect() {
    const element = document.querySelector('.typed-text');
    if (!element) return;
    
    const words = ['enterprise solutions', 'blockchain systems', 'distributed apps', 'clean interfaces'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const current = words[wordIndex];
        
        if (isDeleting) {
            element.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let delay = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 500;
        }
        
        setTimeout(type, delay);
    }
    
    setTimeout(type, 1000);
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            const trigger = window.innerHeight * 0.85;
            
            if (top < trigger) {
                el.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    let started = false;
    
    function animate(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            
            el.textContent = Math.round(target * eased);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    function check() {
        if (started) return;
        
        counters.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight * 0.8) {
                started = true;
                counters.forEach(animate);
            }
        });
    }
    
    window.addEventListener('scroll', check);
    check();
}

function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow || window.innerWidth < 1024) return;
    
    let x = 0, y = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', e => {
        x = e.clientX;
        y = e.clientY;
    });
    
    function render() {
        if (!glow) return;
        currentX += (x - currentX) * 0.1;
        currentY += (y - currentY) * 0.1;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(render);
    }
    
    render();
}

function initContactFab() {
    const floatingBar = document.querySelector('.floating-bar');
    const footer = document.querySelector('#footer');
    const footerLinks = document.querySelectorAll('.footer-link-target');
    
    if (!floatingBar || !footer) return;
    
    let isVisible = false;
    let hasMerged = false;
    
    function updateState() {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 500;
        const footerRect = footer.getBoundingClientRect();
        const footerVisible = footerRect.top < window.innerHeight - 50;
        
        if (footerVisible) {
            if (isVisible && !hasMerged) {
                hasMerged = true;
                floatingBar.classList.add('merging');
                floatingBar.classList.remove('visible');
                
                footerLinks.forEach((link, i) => {
                    setTimeout(() => {
                        link.classList.add('highlight');
                        setTimeout(() => link.classList.remove('highlight'), 400);
                    }, i * 100);
                });
            }
        } else {
            hasMerged = false;
            floatingBar.classList.remove('merging');
            
            if (scrollY > heroHeight * 0.5) {
                if (!isVisible) {
                    floatingBar.classList.add('visible');
                    isVisible = true;
                }
            } else {
                floatingBar.classList.remove('visible');
                isVisible = false;
            }
        }
    }
    
    window.addEventListener('scroll', updateState);
    updateState();
}

function initMarquee() {
    const content = document.querySelector('.marquee-content');
    if (!content) return;
    
    const clone = content.cloneNode(true);
    content.parentNode.appendChild(clone);
}
