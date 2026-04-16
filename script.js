// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active')
            ? 'rotate(45deg) translateY(10px)'
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active')
            ? 'rotate(-45deg) translateY(-10px)'
            : 'none';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Update active navigation based on current page
document.addEventListener('DOMContentLoaded', function () {
    // Get current page name from URL
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];

    // Find the corresponding navigation link and highlight it
    const navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href').includes(currentPage)) {
            item.classList.add('active-link');
        }
    });

    // Add scroll effect for navbar transparency on home page
    if (currentPage === 'home' || window.location.pathname.includes('index')) {
        const navbar = document.querySelector('.navbar-transparent');
        if (navbar) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 50) {
                    navbar.style.background = 'linear-gradient(135deg, #228B22, #1a6b1a)';
                } else {
                    navbar.style.background = 'rgba(34, 139, 34, 0.7)';
                }
            });
        }
    }
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            console.log('Form submitted - Name:', name, 'Email:', email, 'Subject:', subject, 'Message:', message);

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Update button to show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
            if (submitBtn) submitBtn.innerText = 'Sending...';

            // Send data to FormSubmit API endpoint
            fetch("https://formsubmit.co/ajax/infoslearn26@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show success message
                        alert(`Thank you for your message, ${name}! We received your inquiry about "${subject}" and will get back to you soon.`);
                        contactForm.reset();
                    } else {
                        throw new Error(data.error || 'Failed to submit form');
                    }
                })
                .catch(error => {
                    console.error('Submission Error:', error);
                    alert('Oops! There was a problem submitting your form. Please try again later.');
                })
                .finally(() => {
                    // Restore button text
                    if (submitBtn) submitBtn.innerText = originalBtnText;
                });
        });

        console.log('Contact form initialized successfully');
    } else {
        console.error('Contact form not found!');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Add visible class for additional styling if needed
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .feature-card, .innovation-card, .sustainability-card, .team-card, .step, .budget-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.parentElement.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.parentElement.classList.add('active-link');
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;

    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Dynamic budget progress bar animation
const budgetSection = document.getElementById('budget');
if (budgetSection) {
    const budgetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.budget-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                budgetObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    budgetObserver.observe(budgetSection);
}

// Add counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            if (target >= 1000000) {
                element.textContent = (start / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                element.textContent = (start / 1000).toFixed(1) + 'K';
            } else {
                element.textContent = Math.floor(start);
            }
        }
    }, 16);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counterElement = entry.target;
            const targetText = counterElement.textContent;
            const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));

            if (!isNaN(targetNumber)) {
                animateCounter(counterElement, targetNumber);
                counterObserver.unobserve(counterElement);
            }
        }
    });
}, { threshold: 0.5 });

// Add this class to elements you want to animate as counters
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Logo click interaction
const logoMain = document.querySelector('.logo-main');
if (logoMain) {
    logoMain.addEventListener('click', () => {
        logoMain.style.animation = 'none';
        setTimeout(() => {
            logoMain.style.animation = 'pulse 0.5s ease 3';
        }, 10);
    });
}

// Add tooltip or info on hover for team members
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.cursor = 'pointer';
    });

    card.addEventListener('mouseleave', function () {
        this.style.cursor = 'default';
    });
});

// Enhanced interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // Add interactive buttons functionality
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Add modal functionality for images
    const images = document.querySelectorAll('.children-photo, .how-it-works-image, .innovation-image');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            // Create a modal overlay
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '9999';
            modal.style.cursor = 'pointer';

            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.objectFit = 'contain';

            modal.appendChild(modalImg);
            document.body.appendChild(modal);

            modal.addEventListener('click', function () {
                document.body.removeChild(this);
            });
        });
    });

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add form validation enhancement
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#FFD700';
            this.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = '#228B22';
            this.style.boxShadow = 'none';
        });
    });

    // Add social media sharing functionality
    const shareButtons = document.createElement('div');
    shareButtons.innerHTML = `
        <div class="social-share">
            <button class="share-btn" data-platform="twitter">Share on Twitter</button>
            <button class="share-btn" data-platform="facebook">Share on Facebook</button>
            <button class="share-btn" data-platform="linkedin">Share on LinkedIn</button>
        </div>
    `;

    // Add to contact section if it exists
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.appendChild(shareButtons);

        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const platform = this.getAttribute('data-platform');
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);

                let shareUrl = '';
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                        break;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
});

// Console message for developers
console.log('%c🌟 Welcome to L-Earn! 🌟', 'font-size: 20px; font-weight: bold; color: #FFD700; text-shadow: 1px 1px 2px #228B22;');
console.log('%cEmpowering children in crisis areas through education and opportunity.', 'font-size: 14px; color: #228B22;');
console.log('%cBuilt with ❤️ for the children of Goma and beyond.', 'font-size: 14px; color: #FFD700;');