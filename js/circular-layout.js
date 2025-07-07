// circular-layout.js - Handles the circular layout for the home page

// Position nodes in a circle
function positionCircularNodes() {
    const layout = document.getElementById('circularLayout');
    const nodes = layout.querySelectorAll('.circular-node');
    const centralNode = layout.querySelector('.central-node');
    
    if (!layout || !centralNode) return;
    
    const centerX = layout.offsetWidth / 2;
    const centerY = layout.offsetHeight / 2;
    
    // Position central node at exact center
    centralNode.style.left = (centerX - centralNode.offsetWidth / 2) + 'px';
    centralNode.style.top = (centerY - centralNode.offsetHeight / 2) + 'px';
    
    // Calculate radius for outer nodes
    const radius = Math.min(centerX, centerY) * 0.7;
    
    nodes.forEach((node, index) => {
        const angle = parseFloat(node.getAttribute('data-angle'));
        const angleRad = (angle * Math.PI) / 180;
        
        const x = centerX + radius * Math.cos(angleRad) - node.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angleRad) - node.offsetHeight / 2;
        
        node.style.left = x + 'px';
        node.style.top = y + 'px';
    });
}

// Draw connections from center to all nodes
function drawConnections() {
    const layout = document.getElementById('circularLayout');
    const centralNode = layout.querySelector('.central-node');
    const nodes = layout.querySelectorAll('.circular-node');
    
    // Remove existing connections
    const existingConnections = layout.querySelectorAll('.connection');
    existingConnections.forEach(conn => conn.remove());
    
    if (!centralNode) return;
    
    const centerX = parseFloat(centralNode.style.left) + centralNode.offsetWidth / 2;
    const centerY = parseFloat(centralNode.style.top) + centralNode.offsetHeight / 2;
    
    nodes.forEach(node => {
        const nodeX = parseFloat(node.style.left) + node.offsetWidth / 2;
        const nodeY = parseFloat(node.style.top) + node.offsetHeight / 2;
        
        const distance = Math.sqrt(Math.pow(nodeX - centerX, 2) + Math.pow(nodeY - centerY, 2));
        const angle = Math.atan2(nodeY - centerY, nodeX - centerX) * 180 / Math.PI;
        
        // Start connection from edge of central node, not center
        const centralRadius = centralNode.offsetWidth / 2;
        const startX = centerX + (centralRadius * Math.cos(angle * Math.PI / 180));
        const startY = centerY + (centralRadius * Math.sin(angle * Math.PI / 180));
        
        // End connection at edge of outer node
        const nodeRadius = node.offsetWidth / 2;
        const adjustedDistance = distance - centralRadius - nodeRadius;
        
        const connection = document.createElement('div');
        connection.className = 'connection';
        connection.style.width = adjustedDistance + 'px';
        connection.style.left = startX + 'px';
        connection.style.top = startY + 'px';
        connection.style.transform = `rotate(${angle}deg)`;
        
        layout.appendChild(connection);
    });
}

// Initialize layout
function initializeLayout() {
    // Only run on pages with circular layout
    if (!document.getElementById('circularLayout')) return;
    
    setTimeout(() => {
        positionCircularNodes();
        setTimeout(drawConnections, 100);
    }, 100);
}

// Event listeners for circular layout
if (document.getElementById('circularLayout')) {
    window.addEventListener('load', initializeLayout);
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(initializeLayout, 250);
    });
}
