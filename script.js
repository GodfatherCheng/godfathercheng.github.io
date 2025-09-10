// JavaScript for interactivity: smooth scroll, active nav, mobile menu, navbar blur

// Cache sections and nav link mapping
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const linkById = new Map(navLinks.map(a => [a.getAttribute('href').replace('#', ''), a]));

function setActiveLink(id) {
    navLinks.forEach(a => a.classList.remove('active'));
    const link = linkById.get(id);
    if (link) link.classList.add('active');
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const hash = this.getAttribute('href');
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            const id = hash.slice(1);
            setActiveLink(id);
        }
    });
});

// Active nav highlighting based on viewport midpoint + navbar blur
function updateActiveOnScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Toggle navbar blur on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollY > 10) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }

    const checkpoint = scrollY + window.innerHeight / 3; // 1/3 viewport from top
    let currentId = null;

    for (const section of sections) {
        const id = section.id;
        if (!linkById.has(id)) continue; // only consider sections in nav
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (checkpoint >= top && checkpoint < bottom) {
            currentId = id;
            break;
        }
    }

    if (!currentId && scrollY < 10 && linkById.has('home')) currentId = 'home';
    if (currentId) setActiveLink(currentId);
}

window.addEventListener('scroll', updateActiveOnScroll, { passive: true });

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

    // Initial highlight on load
    updateActiveOnScroll();
});
