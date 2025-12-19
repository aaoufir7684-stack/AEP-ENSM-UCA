// ========================================
// MOBILE MENU TOGGLE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarLinks = document.querySelector('.navbar-links');
    const navItems = document.querySelectorAll('.nav-item');

    console.log('Mobile menu toggle:', mobileMenuToggle); // Debug
    console.log('Navbar links:', navbarLinks); // Debug

    // Toggle menu on button click
    if (mobileMenuToggle && navbarLinks) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hamburger clicked!'); // Debug
            
            this.classList.toggle('active');
            navbarLinks.classList.toggle('active');
            
            console.log('Menu active?', navbarLinks.classList.contains('active')); // Debug
            
            // Prevent body scrolling when menu is open
            if (navbarLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Mobile menu elements not found!'); // Debug
    }

    // Close menu when clicking on a nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 968) {
                mobileMenuToggle.classList.remove('active');
                navbarLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('.modern-navbar');
        if (!isClickInsideNav && navbarLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle active link on scroll
    const sections = document.querySelectorAll('section, div[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Handle window resize - close menu if resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            mobileMenuToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ========================================
// TYPING EFFECT CODE
// ========================================

const sentences = [
    "AEP pushes us to think bigger every day.",
    "We build skills, confidence, and strong teamwork.",
    "Every project in AEP starts with passion.",
    "Together in AEP, we grow, improve, and succeed."
];

const typingSpeed = 60;
const pauseBetweenSentences = 1500;
const deletingSpeed = 30;

let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const element = document.getElementById('typingText');
    
    if (!element) {
        console.warn('typingText element not found');
        return;
    }
    
    const currentSentence = sentences[sentenceIndex];
    
    if (!isDeleting) {
        if (charIndex < currentSentence.length) {
            element.innerHTML = currentSentence.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseBetweenSentences);
        }
    } else {
        if (charIndex > 0) {
            element.innerHTML = currentSentence.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, deletingSpeed);
        } else {
            isDeleting = false;
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
            setTimeout(typeWriter, 500);
        }
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});




const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const mouse = { x: null, y: null, radius: 120 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    // Adjust density based on screen size
    const count = (canvas.width * canvas.height) / 12000;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // VERY SMALL SHAPES
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bouncing logic
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        // Mouse interaction (fleeing effect)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            if (mouse.x > this.x && this.x > 10) this.x -= 2;
            if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 2;
            if (mouse.y > this.y && this.y > 10) this.y -= 2;
            if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 2;
        }
    }
    draw() {
        ctx.fillStyle = 'rgba(240, 147, 251, 0.6)'; // Matches your logo/theme pink
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1200); // branding delay

  setTimeout(() => {
    preloader.remove();
  }, 2000);
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1200);

  setTimeout(() => {
    preloader.remove();
  }, 2000);
});


const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveals.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      section.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
