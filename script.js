// TEJ CORPORATION - Main JavaScript File
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const resultDiv = document.getElementById('result');

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
    }
});

// Auto-fill selected product from session storage
function populateSelectedProduct() {
    const selectedPanel = JSON.parse(sessionStorage.getItem('selectedPanel'));
    const selectedOptimization = JSON.parse(sessionStorage.getItem('selectedOptimization'));
    const selectedGameOptimization = JSON.parse(sessionStorage.getItem('selectedGameOptimization'));
    
    let productName = 'Custom Request';
    let productCode = '';
    
    if (selectedPanel) {
        productName = selectedPanel.name;
        productCode = getProductCode(selectedPanel.name);
    } else if (selectedOptimization) {
        productName = selectedOptimization.name;
        productCode = getProductCode(selectedOptimization.name);
    } else if (selectedGameOptimization) {
        productName = selectedGameOptimization.name;
        productCode = getProductCode(selectedGameOptimization.name);
    }
    
    const selectedProductField = document.getElementById('selected_product');
    if (selectedProductField) {
        selectedProductField.value = productName;
    }
    
    // Auto-fill product code if available and field is empty
    const productCodeField = document.getElementById('product_code');
    if (productCode && productCodeField && !productCodeField.value) {
        productCodeField.value = productCode;
    }
}

// Helper function to get product codes
function getProductCode(productName) {
    const codeMap = {
        'Basic Panel': '1111',
        'Advance Panel': '1112',
        'Brutal Panel': '1113',
        'Single Game Optimization': '1113',
        'Multi-Game Optimization': '1113',
        'Premium Game Optimization': '1113',
        'Basic Optimization': '1114',
        'Advanced Optimization': '1115',
        'Ultimate Optimization': '1115',
        'Free Panel': '1111',
        'Paid Panel': '1112',
        'Any Game': '1113'
    };
    return codeMap[productName] || '';
}

// Web3Forms Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                if (resultDiv) {
                    resultDiv.innerHTML = `
                        <div style="background: #2ecc70; color: white; padding: 15px; border-radius: 10px; text-align: center;">
                            <i class="fas fa-check-circle"></i> 
                            <strong>Thank you!</strong> Your request has been sent successfully. I will contact you within 1-2 hours.
                        </div>
                    `;
                }
                
                contactForm.reset();
                
                // Clear session storage after successful submission
                sessionStorage.removeItem('selectedPanel');
                sessionStorage.removeItem('selectedOptimization');
                sessionStorage.removeItem('selectedGameOptimization');
                
                // Redirect to success page after 3 seconds
                setTimeout(() => {
                    window.location.href = 'success.html';
                }, 3000);
                
            } else {
                throw new Error(data.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Error:', error);
            if (resultDiv) {
                resultDiv.innerHTML = `
                    <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 10px; text-align: center;">
                        <i class="fas fa-exclamation-circle"></i> 
                        <strong>Error:</strong> Failed to send your message. Please contact me directly via WhatsApp or Email.
                    </div>
                `;
            }
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear error message after 5 seconds
            setTimeout(() => {
                if (resultDiv) {
                    resultDiv.innerHTML = '';
                }
            }, 5000);
        }
    });
}

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .highlight-item, .feature-item, .pricing-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animated elements
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .highlight-item, .feature-item, .pricing-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Populate selected product if on contact page
    populateSelectedProduct();
    
    // Initial animation check
    setTimeout(animateOnScroll, 100);
});

// Scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Product Page Navigation
function openProductPage(productType) {
    switch(productType) {
        case 'game-panel':
            window.location.href = 'game-panel.html';
            break;
        case 'game-optimization':
            window.location.href = 'game-optimization.html';
            break;
        case 'windows-optimization':
            window.location.href = 'windows-optimization.html';
            break;
        default:
            window.location.href = 'index.html#portfolio';
    }
}

// Panel selection functionality (for game-panel.html)
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
        },
        'free': {
            name: 'Free Panel',
            price: 'FREE',
            features: ['Basic Anti-Ban', 'Standard Features', 'Community Support']
        },
        'paid': {
            name: 'Paid Panel',
            price: 'Contact for Price',
            features: ['Advanced Anti-Ban', 'Premium Features', 'Priority Support', 'Regular Updates']
        }
    };
    
    const selectedPanel = panels[panelType];
    
    if (selectedPanel) {
        // Store selection in sessionStorage
        sessionStorage.setItem('selectedPanel', JSON.stringify(selectedPanel));
        
        // Show confirmation and redirect to contact
        alert(`You selected: ${selectedPanel.name}\nPrice: ${selectedPanel.price}\n\nRedirecting to contact form...`);
        window.location.href = 'index.html#contact';
    }
}

// Optimization selection functionality
function selectOptimization(type) {
    const optimizations = {
        'basic': { 
            name: 'Basic Optimization', 
            price: 'Contact for Price' 
        },
        'advanced': { 
            name: 'Advanced Optimization', 
            price: 'Contact for Price' 
        },
        'ultimate': { 
            name: 'Ultimate Optimization', 
            price: 'Contact for Price' 
        },
        'single': { 
            name: 'Single Game Optimization', 
            price: 'Contact for Price' 
        },
        'multi': { 
            name: 'Multi-Game Optimization', 
            price: 'Contact for Price' 
        },
        'premium': { 
            name: 'Premium Game Optimization', 
            price: 'Contact for Price' 
        }
    };
    
    const selected = optimizations[type];
    
    if (selected) {
        if (type === 'single' || type === 'multi' || type === 'premium') {
            sessionStorage.setItem('selectedGameOptimization', JSON.stringify(selected));
        } else {
            sessionStorage.setItem('selectedOptimization', JSON.stringify(selected));
        }
        
        alert(`You selected: ${selected.name}\nPrice: ${selected.price}\n\nRedirecting to contact form...`);
        window.location.href = 'index.html#contact';
    }
}

// Add to cart functionality (backup method)
function addToCart(productName, price, productCode) {
    const cartItem = {
        name: productName,
        price: price,
        code: productCode,
        timestamp: new Date().toISOString()
    };
    
    // Store in sessionStorage
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push(cartItem);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation
    alert(`${productName} has been added to your cart!\nProduct Code: ${productCode}\n\nRedirecting to contact form...`);
    
    // Redirect to contact page for purchase
    window.location.href = 'index.html#contact';
}

// Utility function to clear all session storage
function clearSessionStorage() {
    sessionStorage.removeItem('selectedPanel');
    sessionStorage.removeItem('selectedOptimization');
    sessionStorage.removeItem('selectedGameOptimization');
    sessionStorage.removeItem('cart');
    console.log('Session storage cleared');
}

// Initialize page based on URL parameters
function initializePage() {
    // Check for success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showSuccessMessage('Thank you! Your message has been sent successfully.');
    }
    
    if (urlParams.get('error') === 'true') {
        showErrorMessage('Sorry, there was an error sending your message. Please try again.');
    }
}

// Show success message
function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2ecc70;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        max-width: 300px;
    `;
    alertDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        max-width: 300px;
    `;
    alertDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    
    // Add click listeners to all portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const productType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            openProductPage(productType);
        });
    });
});

// Export functions for global access (if needed)
window.TEJ_CORPORATION = {
    selectPanel,
    selectOptimization,
    openProductPage,
    addToCart,
    clearSessionStorage
};

console.log('TEJ CORPORATION JavaScript loaded successfully!');