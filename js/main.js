// main.js - Core functionality for the research group website

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    
    if (!cursor) return;
    
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
            <div class="logo uniform-text">
                <div>Extragalactic Research Lab</div>
                <div>Bahram Mobasher</div>
                <div>Distinguished Professor at</div>
                <div>Department of Physics and Astronomy</div>
                <div>University of California Riverside</div>
            </div>
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
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath.replace('../', '').replace('.html', ''))) {
            link.classList.add('active');
        }
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
