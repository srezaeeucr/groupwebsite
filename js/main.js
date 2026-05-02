// main.js - Core functionality for the research group website

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;

    // Only enable on fine-pointer (mouse) devices that don't prefer reduced motion.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    document.body.classList.add('custom-cursor-on');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // Scale cursor on click
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// Utility function to get the base path
function getBasePath() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    
    if (path.includes('/pages/science/')) {
        return '../../';
    } else if (path.includes('/pages/')) {
        return '../';
    }
    return '';
}

// Load shared components (navigation and footer)
async function loadSharedComponents() {
    const basePath = getBasePath();
    
    // Load navigation
    const navContainer = document.getElementById('main-nav');
    if (navContainer) {
        navContainer.innerHTML = createNavigation(basePath);
        highlightActiveNav();
    }
    
    // Load footer
    const footerContainer = document.getElementById('main-footer');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
}

// Create navigation HTML
function createNavigation(basePath) {
    return `
        <div class="nav-content">
            <a href="${basePath}index.html" class="logo" aria-label="Home">
                <span class="logo-name">Extragalactic Research Lab</span>
                <span class="logo-title">Bahram Mobasher, Distinguished Professor</span>
                <span class="logo-department">Department of Physics &amp; Astronomy, UC Riverside</span>
            </a>
            <ul class="nav-links">
                <li><a href="${basePath}index.html">Home</a></li>
                <li><a href="${basePath}pages/science/index.html">Science</a></li>
                <li><a href="${basePath}pages/people.html">People</a></li>
                <li><a href="${basePath}pages/alumni.html">Alumni</a></li>
                <li><a href="${basePath}pages/publications.html">Publications</a></li>
                <li><a href="${basePath}pages/teaching.html">Teaching</a></li>
                <li><a href="${basePath}pages/outreach.html">Outreach</a></li>
            </ul>
        </div>
    `;
}

// Create footer HTML
function createFooter() {
    return `
        <p>© 2024 UCR Extragalactic Astrophysics Research Group</p>
    `;
}

// Highlight active navigation item
function highlightActiveNav() {
    const here = window.location.pathname.replace(/\/$/, '/index.html');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        // Resolve href against the current document so relative paths normalize.
        const linkPath = new URL(link.href, window.location.href).pathname;
        if (linkPath === here) link.classList.add('active');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadSharedComponents();
    initCustomCursor();
});

// Handle window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Trigger any resize-dependent functions
        if (typeof initializeLayout === 'function') {
            initializeLayout();
        }
    }, 250);
});
