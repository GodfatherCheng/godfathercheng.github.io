// Mobile menu and active-section highlighting in the nav.

const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-links');
const sectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const sections = sectionLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

if (toggle && menu) {
    toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    menu.addEventListener('click', event => {
        if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menu.classList.contains('open')) {
            setMenu(false);
            toggle.focus();
        }
    });
    document.addEventListener('click', event => {
        if (menu.classList.contains('open') && !event.target.closest('.navbar')) setMenu(false);
    });
}

function updateActive() {
    const line = window.innerHeight * 0.3;
    let current = null;
    for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section;
    }
    // At the very bottom, the last section may never reach the line.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1];
    }
    sectionLinks.forEach(link => {
        link.classList.toggle('active', current !== null && link.getAttribute('href') === '#' + current.id);
    });
}

window.addEventListener('scroll', updateActive, { passive: true });
window.addEventListener('resize', updateActive);
updateActive();
