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

// Add to cart functionality (placeholder)
function addToCart(productName, price) {
    const cartItem = {
        name: productName,
        price: price,
        quantity: 1,
        timestamp: new Date().toISOString()
    };
    
    // Store in sessionStorage
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push(cartItem);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation
    alert(`${productName} has been added to your cart!`);
    
    // Redirect to contact page for purchase
    window.location.href = 'index.html#contact';
}

// Price toggle functionality (if you have different tiers)
function togglePrice(plan) {
    const prices = {
        basic: '$29.99',
        pro: '$49.99',
        ultimate: '$79.99'
    };
    
    const priceElement = document.querySelector('.product-price');
    if (priceElement && prices[plan]) {
        priceElement.textContent = prices[plan];
    }
}
// Panel selection functionality
function selectPanel(panelType) {
    const panels = {
        'basic': {
            name: 'Basic Panel',
            price: '$19.99',
            features: ['Essential Features', 'Basic Anti-Ban', 'Standard Updates', 'Email Support']
        },
        'advance': {
            name: 'Advance Panel',
            price: '$39.99',
            features: ['All Basic Features', 'Advanced Anti-Ban', 'Priority Updates', '24/7 Support', 'Custom Features']
        },
        'brutal': {
            name: 'Brutal Panel',
            price: '$59.99',
            features: ['All Advance Features', 'Maximum Anti-Ban', 'Instant Updates', 'Premium Support', 'Brutal Mode', 'Custom Requests']
        }
    };
    
    const selectedPanel = panels[panelType];
    
    // Store selection in sessionStorage
    sessionStorage.setItem('selectedPanel', JSON.stringify(selectedPanel));
    
    // Show confirmation and redirect to contact
    alert(`You selected: ${selectedPanel.name}\nPrice: ${selectedPanel.price}\n\nRedirecting to contact form...`);
    window.location.href = 'index.html#contact';
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