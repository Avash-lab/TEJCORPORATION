// Product Page Specific JavaScript

// Smooth scroll for purchase section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Animation for feature items
const animateFeatures = () => {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
};

// Initialize animations when page loads
window.addEventListener('DOMContentLoaded', () => {
    animateFeatures();
});

// Panel selection functionality - REDIRECT TO BILLING
function selectPanel(panelType) {
    const panels = {
        'basic': {
            name: 'Basic Panel',
            price: 'Contact for Price',
            features: ['Essential Features', 'Basic Anti-Ban', 'Standard Updates', 'Email Support']
        },
        'advance': {
            name: 'Advance Panel',
            price: 'Contact for Price',
            features: ['All Basic Features', 'Advanced Anti-Ban', 'Priority Updates', '24/7 Support', 'Custom Features']
        },
        'brutal': {
            name: 'Brutal Panel',
            price: 'Contact for Price',
            features: ['All Advance Features', 'Maximum Anti-Ban', 'Instant Updates', 'Premium Support', 'Brutal Mode', 'Custom Requests']
        }
    };
    
    const selectedPanel = panels[panelType];
    
    if (selectedPanel) {
        // Store selection in sessionStorage
        sessionStorage.setItem('selectedPanel', JSON.stringify(selectedPanel));
        
        // Redirect to BILLING PAGE
        window.location.href = 'billing.html';
    }
}

// Add animation to pricing cards
const animatePricingCards = () => {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
};

// Initialize pricing animations
window.addEventListener('DOMContentLoaded', () => {
    animatePricingCards();
});
