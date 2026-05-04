// ── Smooth scrolling for nav links ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ── Scroll reveal via IntersectionObserver ──────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // animate once
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// ── Marquee tool belt reveal ────────────────────────────────────
const marqueeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll('span');
            spans.forEach((span, i) => {
                setTimeout(() => {
                    span.style.opacity = '0.3';
                    span.style.transform = 'translateY(0)';
                }, i * 80);
            });
            marqueeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const marquee = document.querySelector('.tools-marquee');
if (marquee) marqueeObserver.observe(marquee);

// ── Navbar shrink on scroll ─────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.style.padding = '1rem 4rem';
        navbar.style.background = 'rgba(7, 9, 8, 0.85)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.position = 'sticky';
        navbar.style.top = '0';
        navbar.style.zIndex = '100';
        navbar.style.transition = 'all 0.4s ease';
    } else {
        navbar.style.padding = '2rem 4rem';
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
    }
}, { passive: true });
