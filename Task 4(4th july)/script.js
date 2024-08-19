document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    const pages = document.querySelectorAll('.page');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    window.showPage = function(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.style.display = 'block';
            } else {
                page.style.display = 'none';
            }
        });
    };

    // Show the home page by default
    showPage('home');
});
