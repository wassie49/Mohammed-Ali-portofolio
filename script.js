// ===================================
// Smooth Scroll & Navigation
// ===================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// ===================================
// Sticky Navigation & Active Links
// ===================================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Sticky navbar
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active navigation link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Mobile Menu Toggle
// ===================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// ===================================
// Dark/Light Theme Toggle
// ===================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Update icon
    if (body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// ===================================
// Scroll Reveal Animation
// ===================================

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

// Initial check
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===================================
// Skills Progress Bar Animation
// ===================================

const progressBars = document.querySelectorAll('.progress-fill');
let progressAnimated = false;

const animateProgress = () => {
    const skillsSection = document.getElementById('skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (skillsPosition < screenPosition && !progressAnimated) {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
        progressAnimated = true;
    }
};

window.addEventListener('scroll', animateProgress);

// ===================================
// Counter Animation for Stats
// ===================================

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    const aboutSection = document.getElementById('about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (aboutPosition < screenPosition && !statsAnimated) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
        statsAnimated = true;
    }
};

window.addEventListener('scroll', animateStats);

// ===================================
// Contact Form Validation & Submission
// ===================================

const contactForm = document.getElementById('contactForm');
const formGroups = contactForm.querySelectorAll('.form-group');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate individual field
const validateField = (input) => {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    
    // Remove previous error
    formGroup.classList.remove('error');
    errorMessage.textContent = '';
    
    // Check if empty
    if (input.value.trim() === '') {
        isValid = false;
        errorMessage.textContent = 'This field is required';
        formGroup.classList.add('error');
    }
    
    // Validate email
    if (input.type === 'email' && input.value.trim() !== '') {
        if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            errorMessage.textContent = 'Please enter a valid email address';
            formGroup.classList.add('error');
        }
    }
    
    // Validate name (minimum 2 characters)
    if (input.id === 'name' && input.value.trim() !== '') {
        if (input.value.trim().length < 2) {
            isValid = false;
            errorMessage.textContent = 'Name must be at least 2 characters';
            formGroup.classList.add('error');
        }
    }
    
    // Validate message (minimum 10 characters)
    if (input.id === 'message' && input.value.trim() !== '') {
        if (input.value.trim().length < 10) {
            isValid = false;
            errorMessage.textContent = 'Message must be at least 10 characters';
            formGroup.classList.add('error');
        }
    }
    
    return isValid;
};

// Real-time validation
const inputs = contactForm.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('error')) {
            validateField(input);
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (isFormValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Show success message
            const formStatus = contactForm.querySelector('.form-status');
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            
            // Reset form
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }, 2000);
        
        // IMPORTANT: Replace the setTimeout above with actual form submission
        // Example using Fetch API:
        /*
        fetch('your-form-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle success
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            const formStatus = contactForm.querySelector('.form-status');
            formStatus.textContent = 'Message sent successfully!';
            formStatus.className = 'form-status success';
            contactForm.reset();
        })
        .catch(error => {
            // Handle error
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            const formStatus = contactForm.querySelector('.form-status');
            formStatus.textContent = 'Something went wrong. Please try again.';
            formStatus.className = 'form-status error';
        });
        */
    }
});

// ===================================
// Back to Top Button
// ===================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Typing Effect for Name in Hero Section
// ===================================

const typingName = document.getElementById('typingName');
const nameToType = 'Mohammed Ali';
let nameCharIndex = 0;

function typeName() {
    if (nameCharIndex < nameToType.length) {
        typingName.textContent += nameToType.charAt(nameCharIndex);
        nameCharIndex++;
        setTimeout(typeName, 150); // Typing speed
    }
}

// Start typing effect after a short delay
window.addEventListener('load', () => {
    setTimeout(typeName, 500);
});

// ===================================
// Typing Effect for Hero Subtitle (Optional Enhancement)
// ===================================

const heroSubtitle = document.querySelector('.hero-subtitle');
const titles = ['Frontend Developer','Software Engineer',  'UI/UX Enthusiast', 'Web Designer', 'Problem Solver'];
let titleIndex = 0;
let subtitleCharIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        heroSubtitle.textContent = currentTitle.substring(0, subtitleCharIndex - 1);
        subtitleCharIndex--;
        typingSpeed = 50;
    } else {
        heroSubtitle.textContent = currentTitle.substring(0, subtitleCharIndex + 1);
        subtitleCharIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && subtitleCharIndex === currentTitle.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && subtitleCharIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 2500); // Start after name typing completes
});

// ===================================
// Lazy Loading Images (Performance Optimization)
// ===================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Prevent Default Form Submission on Enter
// ===================================

contactForm.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// ===================================
// Console Message (Easter Egg)
// ===================================

console.log('%c👋 Hello Developer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? I like your curiosity!', 'color: #764ba2; font-size: 14px;');
console.log('%cFeel free to reach out if you want to collaborate!', 'color: #667eea; font-size: 14px;');

// ===================================
// Performance Monitoring (Optional)
// ===================================

window.addEventListener('load', () => {
    // Log page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});
