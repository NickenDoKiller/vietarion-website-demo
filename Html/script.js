// ========== DOM Elements ==========
const hamburgerBtn = document.getElementById('hamburgerBtn');
const slideMenu = document.getElementById('slideMenu');
const overlay = document.getElementById('overlay');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const notificationContainer = document.getElementById('notificationContainer');

// ========== Menu Functions ==========
function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    slideMenu.classList. toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = slideMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMenu() {
    hamburgerBtn.classList.remove('active');
    slideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body. style.overflow = 'auto';
}

// Event Listeners
hamburgerBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Close menu when clicking on a link
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        } else if (! this.getAttribute('onclick')) {
            closeMenu();
        }
    });
});

// ========== Modal Functions ==========
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body. style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Daily Login
function openDailyLogin(e) {
    e.preventDefault();
    closeMenu();
    openModal('dailyLoginModal');
}

function closeDailyLogin() {
    closeModal('dailyLoginModal');
}

// Profile
function openProfile(e) {
    e.preventDefault();
    closeMenu();
    openModal('profileModal');
}

function closeProfile() {
    closeModal('profileModal');
}

// Settings
function openSettings(e) {
    e.preventDefault();
    closeMenu();
    openModal('settingsModal');
}

function closeSettings() {
    closeModal('settingsModal');
}

// Contact
function openContact(e) {
    