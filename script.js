document.addEventListener('DOMContentLoaded', () => {
    // --- CAPTCHA Logic Start ---
    const protectedLinks = document.querySelectorAll('.protected-link');
    const captchaModal = document.getElementById('captcha-modal');
    const captchaCheckbox = document.getElementById('captcha-checkbox');
    const captchaConfirm = document.getElementById('captcha-confirm');
    const captchaCancel = document.getElementById('captcha-cancel');

    let targetLink = null;

    protectedLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            targetLink = link.dataset.link;
            if (captchaModal) captchaModal.classList.add('active');
        });
    });

    if (captchaCheckbox) {
        captchaCheckbox.addEventListener('change', () => {
            captchaConfirm.disabled = !captchaCheckbox.checked;
        });
    }

    if (captchaConfirm) {
        captchaConfirm.addEventListener('click', () => {
            if (targetLink) {
                window.open(targetLink, '_blank');
            }
            resetCaptcha();
        });
    }

    if (captchaCancel) {
        captchaCancel.addEventListener('click', resetCaptcha);
    }

    function resetCaptcha() {
        if (captchaModal) captchaModal.classList.remove('active');
        if (captchaCheckbox) captchaCheckbox.checked = false;
        if (captchaConfirm) captchaConfirm.disabled = true;
        targetLink = null;
    }
    // --- CAPTCHA Logic End ---

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                navList.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Update active state
            document.querySelectorAll('.nav-list a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set Home as active by default
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');

    // Simple intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Carousel Navigation
    const carousel = document.querySelector('.cert-carousel');
    const prevBtn = document.getElementById('prevCert');
    const nextBtn = document.getElementById('nextCert');

    // Scroll Spy to update active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');

    const scrollObserverOptions = {
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to the corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`#navbar a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, scrollObserverOptions);

    sections.forEach(section => {
        scrollObserver.observe(section);
    });
});