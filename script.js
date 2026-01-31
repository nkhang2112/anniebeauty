// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(255, 192, 203, 0.98) 0%, rgba(230, 230, 250, 0.98) 100%)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, rgba(255, 192, 203, 0.95) 0%, rgba(230, 230, 250, 0.95) 100%)';
    }
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Auto-flip cards on mobile after viewing
    function setupAutoFlip() {
        if (window.innerWidth <= 768) {
            const flipCards = document.querySelectorAll('.flip-card');
            
            const autoFlipObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Auto flip after 3 seconds of being in view
                        setTimeout(() => {
                            if (entry.target.classList.contains('animate-in')) {
                                entry.target.classList.add('auto-flipped');
                                
                                // Flip back after 3 seconds
                                setTimeout(() => {
                                    entry.target.classList.remove('auto-flipped');
                                }, 3000);
                            }
                        }, 3000);
                    }
                });
            }, {
                threshold: 0.8,
                rootMargin: '0px'
            });
            
            flipCards.forEach(card => {
                autoFlipObserver.observe(card);
            });
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            typeWriter(subtitle, text, 80);
        }
    }, 1000);
    
    // Animation observer for flip cards
    const cardObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150); // Stagger animation by 150ms
            }
        });
    }, cardObserverOptions);
    
    // Observe all flip cards
    document.querySelectorAll('.flip-card').forEach(card => {
        cardObserver.observe(card);
    });
    
    // Setup auto-flip for mobile
    setupAutoFlip();
    
    // Re-setup on window resize
    window.addEventListener('resize', setupAutoFlip);
    
    // Fade-in animation for sections on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in effect
    document.querySelectorAll('.about').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});
