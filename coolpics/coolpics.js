const menuButton = document.querySelector('#menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', toggleMenu);

function toggleMenu() {
    navLinks.classList.toggle('show');
}