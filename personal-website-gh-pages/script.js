// JavaScript for interactivity can be added here

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links based on scroll position
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

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const link = document.querySelector(`a[href="#${sectionId}"]`);
            if (link) link.classList.add('active');
        } else {
            const link = document.querySelector(`a[href="#${sectionId}"]`);
            if (link) link.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
});
