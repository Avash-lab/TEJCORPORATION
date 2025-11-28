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
        
        // Redirect to BILLING PAGE instead of contact form
        window.location.href = 'billing.html';
    }
}

// Optimization selection functionality - REDIRECT TO BILLING
function selectOptimization(type) {
    const optimizations = {
        'basic': { 
            name: 'Basic Optimization', 
            price: 'Contact for Price',
            features: ['System Cleanup', 'Boot Optimization', 'Basic Tweaks']
        },
        'advanced': { 
            name: 'Advanced Optimization', 
            price: 'Contact for Price',
            features: ['All Basic Features', 'PC Optimizer', 'Network Optimization', 'GPU Tuning']
        },
        'ultimate': { 
            name: 'Ultimate Optimization', 
            price: 'Contact for Price',
            features: ['All Advanced Features', 'Maximum Performance', 'Custom Configuration']
        },
        'single': { 
            name: 'Single Game Optimization', 
            price: 'Contact for Price',
            features: ['FPS Boost', 'Network Optimization', 'Performance Tuning']
        },
        'multi': { 
            name: 'Multi-Game Optimization', 
            price: 'Contact for Price',
            features: ['Multiple Games Support', 'Custom Profiles', 'Advanced Optimization']
        },
        'premium': { 
            name: 'Premium Game Optimization', 
            price: 'Contact for Price',
            features: ['Maximum Performance', 'Priority Support', 'Custom Configuration']
        }
    };
    
    const selected = optimizations[type];
    
    if (selected) {
        if (type === 'single' || type === 'multi' || type === 'premium') {
            sessionStorage.setItem('selectedGameOptimization', JSON.stringify(selected));
        } else {
            sessionStorage.setItem('selectedOptimization', JSON.stringify(selected));
        }
        
        // Redirect to BILLING PAGE instead of contact form
        window.location.href = 'billing.html';
    }
}

// Web3Forms Contact Form Submission (for contact page)
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
                // Show success popup instead of redirecting
                showEmailSuccessPopup();
                
                // Clear the form
                contactForm.reset();
                
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

// Show Email Success Popup with Cool Animation
function showEmailSuccessPopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'successPopupOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    
    // Success popup content
    overlay.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
            padding: 50px 40px;
            border-radius: 20px;
            text-align: center;
            border: 2px solid #333;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            max-width: 400px;
            width: 90%;
            position: relative;
            animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        ">
            <!-- Animated Checkmark -->
            <div class="success-animation" style="
                width: 80px;
                height: 80px;
                margin: 0 auto 25px;
                position: relative;
            ">
                <svg class="checkmark" viewBox="0 0 52 52" style="
                    width: 80px;
                    height: 80px;
                ">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" style="
                        stroke: #2ecc71;
                        stroke-width: 2;
                    "/>
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="
                        stroke: #2ecc71;
                        stroke-width: 3;
                        stroke-linecap: round;
                    "/>
                </svg>
            </div>
            
            <h2 style="color: #2ecc71; margin-bottom: 15px; font-size: 1.8rem; font-weight: 700;">
                Email Sent!
            </h2>
            
            <p style="color: var(--text-light); margin-bottom: 30px; line-height: 1.6; font-size: 1.1rem;">
                Your message has been sent successfully!<br>
                I'll contact you within 1-2 hours.
            </p>
            
            <button id="closeSuccessPopup" class="btn" style="
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                <i class="fas fa-check"></i> CLOSE!
            </button>
        </div>
        
        <style>
            @keyframes popIn {
                0% {
                    opacity: 0;
                    transform: scale(0.5) translateY(-50px);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            @keyframes popOut {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.5) translateY(50px);
                }
            }
            
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-width: 2;
                stroke-miterlimit: 10;
                fill: none;
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            
            .checkmark__check {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }
            
            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }
            
            .success-animation {
                animation: scale 0.3s ease-in-out 0.9s both;
            }
            
            @keyframes scale {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
            }
        </style>
    `;
    
    document.body.appendChild(overlay);
    
    // Add event listener to the close button
    const closeButton = document.getElementById('closeSuccessPopup');
    if (closeButton) {
        closeButton.addEventListener('click', closeSuccessPopup);
    }
    
    // Also close when clicking outside the popup
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeSuccessPopup();
        }
    });
    
    // Add confetti effect
    createConfetti();
}

// Close success popup - FIXED FUNCTION
function closeSuccessPopup() {
    const overlay = document.getElementById('successPopupOverlay');
    if (overlay) {
        // Add pop-out animation
        const popupContent = overlay.querySelector('div');
        if (popupContent) {
            popupContent.style.animation = 'popOut 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        }
        
        // Fade out the overlay
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.4s ease';
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 400);
    }
}

// Confetti effect
function createConfetti() {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 12px;
            height: 12px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            top: -20px;
            left: ${Math.random() * 100}%;
            opacity: 0;
            z-index: 10001;
            pointer-events: none;
        `;
        
        const animation = `
            @keyframes confettiFall${i} {
                0% {
                    transform: translateY(0) rotate(0deg) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(${Math.random() * 360}deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = animation;
        document.head.appendChild(style);
        
        confetti.style.animation = `confettiFall${i} ${Math.random() * 2 + 1.5}s ease-in forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti && confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
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
    
    // Redirect to billing page
    window.location.href = 'billing.html';
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

// Export functions for global access
window.TEJ_CORPORATION = {
    selectPanel,
    selectOptimization,
    openProductPage,
    addToCart,
    clearSessionStorage,
    showEmailSuccessPopup,
    closeSuccessPopup
};

console.log('TEJ CORPORATION JavaScript loaded successfully!');
