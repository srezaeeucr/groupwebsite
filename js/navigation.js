// navigation.js - Navigation functionality for the research group website

// Mobile menu toggle functionality (for future implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('mobile-active');
    }
}

// Handle smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    // Check if clicked element is an anchor link starting with #
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

// Add active states to navigation based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Get the href and normalize it
        const linkHref = link.getAttribute('href');
        const linkPath = linkHref.replace(/^\.\.\//, '').replace(/^\.\//, '');
        
        // Check if current path contains this link's path
        if (currentPath.includes(linkPath.replace('.html', ''))) {
            link.classList.add('active');
        }
        
        // Special case for home page
        if (linkPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('/index.html'))) {
            link.classList.add('active');
        }
    });
});

// Handle navigation link hover effects
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Add ripple effect on click
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'nav-ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Preload adjacent pages for faster navigation (optional enhancement)
function preloadAdjacentPages() {
    const links = document.querySelectorAll('.nav-links a, .research-card');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href') || link.getAttribute('onclick')?.match(/href='([^']+)'/)?.[1];
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'prefetch';
                preloadLink.href = href;
                document.head.appendChild(preloadLink);
            }
        });
    });
}

// Initialize navigation enhancements
document.addEventListener('DOMContentLoaded', () => {
    preloadAdjacentPages();
});

// Handle browser back/forward buttons gracefully
window.addEventListener('popstate', (event) => {
    // Add any special handling for browser navigation if needed
    if (event.state) {
        console.log('Navigated to:', event.state);
    }
});

// Export functions for use in other scripts
window.navigationUtils = {
    toggleMobileMenu,
    preloadAdjacentPages
};
