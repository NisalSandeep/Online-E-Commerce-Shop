// Mobile Menu Toggle Functionality

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const aside = document.querySelector('aside');
    const body = document.body;
    
    // Create overlay element
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        body.appendChild(overlay);
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        aside.classList.toggle('open');
        overlay.classList.toggle('active');
        body.style.overflow = aside.classList.contains('open') ? 'hidden' : '';
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        aside.classList.remove('open');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    // Event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking a link
    const asideLinks = aside.querySelectorAll('a, button');
    asideLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on window resize if opened
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && aside.classList.contains('open')) {
            closeMobileMenu();
        }
    });
});
