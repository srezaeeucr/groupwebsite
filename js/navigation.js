// navigation.js - Navigation functionality for the research group website

// Smooth scroll for in-page anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Prefetch a research-card destination on hover for snappier navigation.
function preloadAdjacentPages() {
    const links = document.querySelectorAll('.research-card');

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'prefetch';
                preloadLink.href = href;
                document.head.appendChild(preloadLink);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    preloadAdjacentPages();
});
