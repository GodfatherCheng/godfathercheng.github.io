// JavaScript for interactivity: smooth scroll, active nav, mobile menu, navbar blur

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add active class to navigation links based on scroll position + navbar blur
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    // Toggle navbar blur on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollPosition > 10) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        const link = document.querySelector(`a[href="#${sectionId}"]`);
        if (!link) return;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('show');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }
});
