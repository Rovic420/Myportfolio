document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.innerHTML = body.classList.contains('dark-theme') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animation
    const sections = document.querySelectorAll('section');
    const fadeInOptions = {
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    sections.forEach(section => {
        fadeInObserver.observe(section);
    });

    // Simple form submission (you'll need a backend to handle this properly)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! (I will reply to you soon)');
        contactForm.reset();
    });

    // Optimized sparkle effect
    const sparklesContainer = document.createElement('div');
    sparklesContainer.id = 'sparkles-container';
    document.body.appendChild(sparklesContainer);

    let sparkles = [];
    let lastSparkleTime = 0;
    const sparkleInterval = 50; // Minimum time between sparkles in milliseconds

    function createSparkle(x, y) {
        const currentTime = Date.now();
        if (currentTime - lastSparkleTime < sparkleInterval) return;

        lastSparkleTime = currentTime;

        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparklesContainer.appendChild(sparkle);
        sparkles.push(sparkle);

        setTimeout(() => {
            sparkle.remove();
            sparkles = sparkles.filter(s => s !== sparkle);
        }, 1000);
    }

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => createSparkle(e.clientX, e.clientY));
    });
});
