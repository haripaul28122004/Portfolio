// ===========================
// Mobile Menu Toggle
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===========================
// Smooth Scroll Behavior
// ===========================

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

// ===========================
// Active Navigation Link
// ===========================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Scroll Reveal Animation
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal class to elements
const revealElements = document.querySelectorAll(
    '.about-content, .skill-card, .project-card, .education-card, .cert-card, .contact-card'
);

revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email');
            return;
        }
        
        // Create mailto link (for demonstration)
        // In production, this would send to a backend service
        const mailtoLink = `mailto:haripaul28122004@gmail.com?subject=Portfolio Contact from ${name}&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Uncomment the line below to actually open email client
        // window.location.href = mailtoLink;
    });
}

// ===========================
// Animated Counter
// ===========================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stat cards come into view
const statCards = document.querySelectorAll('.stat-card h3');
let counterAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            statCards.forEach(card => {
                const text = card.textContent;
                const number = parseFloat(text);
                animateCounter(card, number);
            });
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    counterObserver.observe(card.parentElement);
});

// ===========================
// Parallax Effect (Optional)
// ===========================

window.addEventListener('scroll', () => {
    const circles = document.querySelectorAll('.gradient-circle');
    const scrollPosition = window.pageYOffset;
    
    circles.forEach((circle, index) => {
        circle.style.transform = `translateY(${scrollPosition * 0.5 * (index + 1)}px)`;
    });
});

// ===========================
// Page Load Animation
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===========================
// Certificate Cards 3D Tilt Effect
// ===========================

class TiltCard {
    constructor(element) {
        this.element = element;
        this.glowElement = element.querySelector('.cert-glow');
        
        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
    }
    
    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate tilt angles
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;
        
        // Update transform
        this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
        
        // Update shadow based on cursor direction
        const shadowX = (x - centerX) / centerX * 15;
        const shadowY = (y - centerY) / centerY * 15;
        
        this.element.style.boxShadow = `${shadowX}px ${shadowY}px 50px rgba(99, 102, 241, 0.4), 0 0 30px rgba(168, 85, 247, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)`;
        
        // Update glow position
        if (this.glowElement) {
            this.glowElement.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            this.glowElement.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        }
    }
    
    handleMouseLeave(e) {
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        this.element.style.boxShadow = `0 20px 50px rgba(99, 102, 241, 0.3), 0 0 30px rgba(168, 85, 247, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)`;
    }
}

// Initialize tilt effect for all certification cards
const certCards = document.querySelectorAll('.cert-card[data-tilt]');
certCards.forEach(card => {
    new TiltCard(card);
});

// ===========================
// Certificate Modal Functionality
// ===========================

const certData = {
    cert1: {
        image: 'intern1.png',
        title: 'Basic Python Development Internship',
        org: 'Tamil Info Technology',
        year: '2024',
        description: 'Completed internship training in basic Python programming, problem-solving, and application development fundamentals.'
    },
    cert2: {
        image: 'https://via.placeholder.com/800x600/a855f7/ffffff?text=Python+Development+Internship',
        title: 'Python Development Internship',
        org: 'Frontierfox',
        year: '2026',
        description: 'Worked on Python development projects and gained practical experience in backend programming, application logic, and software development concepts.'
    },
    cert3: {
        image: 'pitchfest.png',
        title: 'Pitch Fest 2026',
        org: "St. Joseph's College (Autonomous)",
        year: '2026',
        description: 'Participated and emerged as a Pre-finalist in Project: AI Teaching Assistant for Personalized Learning at PITCH HEST 2026 — a National Level Intercollegiate Innovation Challenge organized by the Department of Computer Science, St. Joseph\'s College, Tiruchirappalli, held on 5th & 6th February 2026.'
    },
    cert4: {
        image: 'https://via.placeholder.com/800x600/f97316/ffffff?text=National+Conference',
        title: 'National Conference Presentation',
        org: 'National Level Conference',
        year: '2025',
        description: 'Presented technical concepts and participated in a national-level conference event.'
    }
};

const certModal      = document.getElementById('certModal');
const certModalClose = document.getElementById('certModalClose');
const certModalImage = document.getElementById('certModalImage');
const certViewButtons = document.querySelectorAll('.cert-view-btn');

function openCertModal(certId) {
    const cert = certData[certId];
    if (!cert) return;

    // Populate fields
    certModalImage.src = cert.image;
    certModalImage.alt = cert.title;
    document.getElementById('certModalTitle').textContent       = cert.title;
    document.getElementById('certModalOrg').textContent         = cert.org;
    document.getElementById('certModalYear').textContent        = cert.year;
    document.getElementById('certModalDescription').textContent = cert.description;

    // Re-trigger image zoom animation
    certModalImage.style.animation = 'none';
    requestAnimationFrame(() => {
        certModalImage.style.animation = '';
    });

    // Show modal
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Open modal when clicking "View Certificate"
certViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCertModal(button.getAttribute('data-cert-id'));
    });
});

// Close via X button
certModalClose.addEventListener('click', closeCertModal);

// Close when clicking the dark overlay (outside the card)
certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeCertModal();
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeCertModal();
    }
});

// ===========================
// Full Page Image Viewer
// ===========================

const certImages = document.querySelectorAll('.cert-image');

certImages.forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', (e) => {
        e.stopPropagation();
        showFullPageImage(image.src);
    });
});

function showFullPageImage(imageSrc) {
    // Create fullscreen image viewer
    const fullPageViewer = document.createElement('div');
    fullPageViewer.className = 'fullpage-image-viewer active';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'fullpage-image';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'fullpage-close-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    closeBtn.addEventListener('click', () => {
        fullPageViewer.classList.remove('active');
        setTimeout(() => fullPageViewer.remove(), 300);
        document.body.style.overflow = 'auto';
    });
    
    fullPageViewer.appendChild(img);
    fullPageViewer.appendChild(closeBtn);
    
    // Close on ESC key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            fullPageViewer.classList.remove('active');
            setTimeout(() => fullPageViewer.remove(), 300);
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    
    document.addEventListener('keydown', escapeHandler);
    
    // Close on click outside image
    fullPageViewer.addEventListener('click', (e) => {
        if (e.target === fullPageViewer) {
            fullPageViewer.classList.remove('active');
            setTimeout(() => fullPageViewer.remove(), 300);
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    document.body.appendChild(fullPageViewer);
    document.body.style.overflow = 'hidden';
}

// ===========================
// Floating Animation for Certification Section
// ===========================

const certSection = document.querySelector('.certifications');
if (certSection) {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });
    
    // Subtle parallax effect on mouse movement
    certCards.forEach((card, index) => {
        const originalX = 0;
        const originalY = 0;
        
        window.addEventListener('mousemove', (e) => {
            const offsetX = (mouseX - 0.5) * 20 * (index + 1) * 0.1;
            const offsetY = (mouseY - 0.5) * 20 * (index + 1) * 0.1;
        });
    });
}

// ===========================
// Scroll to Top Button (Optional Enhancement)
// ===========================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top on button click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
});

// ===========================
// Download Resume Handler
// ===========================

const downloadBtn = document.querySelector('.resume-section .btn-primary');

if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        window.location.href = 'resume.pdf';
    });
}

// ===========================
// Keyboard Navigation
// ===========================

document.addEventListener('keydown', (e) => {
    // Close menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===========================
// Accessibility Enhancements
// ===========================

// Add focus visible styles
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #6366f1';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ===========================
// Performance: Lazy Loading Images (If needed)
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Console Message
// ===========================

console.log('%c🚀 Welcome to Hari Paul\'s Portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cLooking for a talented Python Developer? Let\'s work together!', 'color: #a855f7; font-size: 14px;');
