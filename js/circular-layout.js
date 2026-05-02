// circular-layout.js - Handles the circular layout for the home page

const MOBILE_BREAKPOINT = 700;
const ORBIT_DEG_PER_SEC = 360 / 300; // one full orbit every 300 seconds

let orbitOffsetDeg = 0;
let orbitLastTimestamp = 0;
let orbitRafHandle = null;
let connections = []; // [{ node, el }]

function isMobileViewport() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearInlinePositions(layout) {
    layout.querySelectorAll('.central-node, .circular-node').forEach(n => {
        n.style.left = '';
        n.style.top = '';
    });
}

function rebuildConnections(layout) {
    connections.forEach(({ el }) => el.remove());
    connections = [];
    if (isMobileViewport()) return;

    const nodes = layout.querySelectorAll('.circular-node');
    nodes.forEach(node => {
        const el = document.createElement('div');
        el.className = 'connection';
        layout.appendChild(el);
        connections.push({ node, el });
    });
}

// Computes positions for the central node, every outer node, and every
// connection line, using the current orbitOffsetDeg. Labels are never
// rotated — only their (x, y) is updated, so text always reads upright.
function updatePositions() {
    const layout = document.getElementById('circularLayout');
    if (!layout) return;
    const centralNode = layout.querySelector('.central-node');
    if (!centralNode) return;

    if (isMobileViewport()) {
        clearInlinePositions(layout);
        return;
    }

    const centerX = layout.offsetWidth / 2;
    const centerY = layout.offsetHeight / 2;
    const cw = centralNode.offsetWidth;
    const ch = centralNode.offsetHeight;
    const centralRadius = cw / 2;
    const radius = Math.min(centerX, centerY) * 0.7;

    centralNode.style.left = (centerX - cw / 2) + 'px';
    centralNode.style.top = (centerY - ch / 2) + 'px';

    connections.forEach(({ node, el }) => {
        const baseAngle = parseFloat(node.getAttribute('data-angle'));
        const angleDeg = baseAngle + orbitOffsetDeg;
        const angleRad = (angleDeg * Math.PI) / 180;

        const nw = node.offsetWidth;
        const nh = node.offsetHeight;
        const nodeRadius = nw / 2;

        const nodeCenterX = centerX + radius * Math.cos(angleRad);
        const nodeCenterY = centerY + radius * Math.sin(angleRad);

        node.style.left = (nodeCenterX - nw / 2) + 'px';
        node.style.top = (nodeCenterY - nh / 2) + 'px';

        const startX = centerX + centralRadius * Math.cos(angleRad);
        const startY = centerY + centralRadius * Math.sin(angleRad);
        const lineLength = radius - centralRadius - nodeRadius;

        el.style.width = lineLength + 'px';
        el.style.left = startX + 'px';
        el.style.top = startY + 'px';
        el.style.transform = `rotate(${angleDeg}deg)`;
    });
}

function tick(timestamp) {
    if (orbitLastTimestamp) {
        const dt = (timestamp - orbitLastTimestamp) / 1000;
        orbitOffsetDeg = (orbitOffsetDeg + ORBIT_DEG_PER_SEC * dt) % 360;
    }
    orbitLastTimestamp = timestamp;
    updatePositions();
    orbitRafHandle = requestAnimationFrame(tick);
}

function startOrbit() {
    if (orbitRafHandle != null) return;
    if (isMobileViewport() || prefersReducedMotion()) return;
    orbitLastTimestamp = 0;
    orbitRafHandle = requestAnimationFrame(tick);
}

function stopOrbit() {
    if (orbitRafHandle != null) {
        cancelAnimationFrame(orbitRafHandle);
        orbitRafHandle = null;
    }
}

function initializeLayout() {
    const layout = document.getElementById('circularLayout');
    if (!layout) return;

    stopOrbit();
    rebuildConnections(layout);
    updatePositions();
    startOrbit();
}

// Pause when the tab is hidden so we don't burn CPU in the background.
document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopOrbit();
    else startOrbit();
});

if (document.getElementById('circularLayout')) {
    window.addEventListener('load', initializeLayout);
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(initializeLayout, 250);
    });
}
