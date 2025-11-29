// ========== DOM Elements ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const slideMenu = document.getElementById('slideMenu');
    const overlay = document.getElementById('overlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const notificationContainer = document.getElementById('notificationContainer');

    // ========== Menu Toggle Functions ==========
    function toggleMenu() {
        if (hamburgerBtn && slideMenu && overlay) {
            hamburgerBtn.classList.toggle('active');
            slideMenu.classList.toggle('active');
            overlay.classList. toggle('active');
            
            if (slideMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document. body.style.overflow = 'auto';
            }
        }
    }

    function closeMenu() {
        if (hamburgerBtn && slideMenu && overlay) {
            hamburgerBtn.classList.remove('active');
            slideMenu. classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // ========== Event Listeners for Menu ==========
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on navigation links
    const menuLinks = document.querySelectorAll('. menu-link');
    menuLinks. forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const onclick = this.getAttribute('onclick');
            
            // Nếu là link bình thường (có href và không phải #), đóng menu
            if (href && href !== '#' && !onclick) {
                closeMenu();
            }
        });
    });

    // ========== Modal Functions ==========
    window.openModal = function(modalId) {
        const modal = document. getElementById(modalId);
        if (modal) {
            modal. classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList. remove('active');
            document. body.style.overflow = 'auto';
        }
    };

    // ========== Daily Login Modal ==========
    window.openDailyLogin = function(e) {
        if (e) {
            e.preventDefault();
        }
        closeMenu();
        openModal('dailyLoginModal');
    };

    window.closeDailyLogin = function() {
        closeModal('dailyLoginModal');
    };

    // ========== Profile Modal ==========
    window.openProfile = function(e) {
        if (e) {
            e.preventDefault();
        }
        closeMenu();
        openModal('profileModal');
    };

    window.closeProfile = function() {
        closeModal('profileModal');
    };

    // ========== Settings Modal ==========
    window.openSettings = function(e) {
        if (e) {
            e.preventDefault();
        }
        closeMenu();
        openModal('settingsModal');
    };

    window.closeSettings = function() {
        closeModal('settingsModal');
    };

    // ========== Contact Modal ==========
    window.openContact = function(e) {
        if (e) {
            e.preventDefault();
        }
        closeMenu();
        openModal('contactModal');
    };

    window.closeContact = function() {
        closeModal('contactModal');
    };

    // ========== Claim Daily Reward ==========
    window.claimDailyReward = function() {
        const streakCount = document.getElementById('streakCount');
        const currentStreak = parseInt(streakCount.textContent);
        const newStreak = currentStreak + 1;
        
        streakCount.textContent = newStreak;
        
        showNotification('success', 'Nhận Quà Thành Công', 'Bạn vừa nhận được 100 Gold! ');
        
        setTimeout(() => {
            closeDailyLogin();
        }, 1500);
    };

    // ========== Copy to Clipboard ==========
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text). then(() => {
            showNotification('success', 'Đã Sao Chép', 'Nội dung đã được sao chép vào clipboard!');
        }).catch(() => {
            showNotification('error', 'Lỗi', 'Không thể sao chép nội dung!');
        });
    };

    // ========== Scroll to Section ==========
    window.scrollToSection = function(sectionId) {
        closeMenu();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ========== Settings Management ==========
    const settingsState = {
        images: true,
        audio: true,
        animations: true,
        darkMode: false
    };

    window.updateSettings = function(setting, value) {
        settingsState[setting] = value;
        localStorage.setItem('website_settings', JSON.stringify(settingsState));
        
        // Apply settings
        if (setting === 'animations' && ! value) {
            document.body. classList.add('performance-mode');
            showNotification('success', 'Chế Độ Hiệu Năng', 'Các hiệu ứng đã được tắt');
        } else if (setting === 'animations' && value) {
            document.body.classList.remove('performance-mode');
            showNotification('success', 'Chế Độ Bình Thường', 'Các hiệu ứng đã được bật');
        }
        
        if (setting === 'darkMode') {
            if (value) {
                document. body.style.filter = 'invert(1) hue-rotate(180deg)';
                showNotification('success', 'Chế Độ Tối', 'Chế độ tối đã được bật');
            } else {
                document.body.style.filter = 'none';
                showNotification('success', 'Chế Độ Sáng', 'Chế độ sáng đã được bật');
            }
        }
    };

    window. togglePerformanceMode = function(enabled) {
        if (enabled) {
            document.body.classList.add('performance-mode');
            showNotification('success', 'Chế Độ Hiệu Năng Cao', 'Các tính năng đã được tối ưu hóa');
            // Tắt tất cả hiệu ứng
            document. querySelectorAll('.toggle-switch').forEach(toggle => {
                if (toggle.parentElement.textContent. includes('Hiệu Ứng')) {
                    toggle.checked = false;
                }
            });
        } else {
            document.body.classList.remove('performance-mode');
            showNotification('success', 'Chế Độ Bình Thường', 'Tất cả tính năng đã được kích hoạt');
        }
    };

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('website_settings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        Object.assign(settingsState, settings);
        
        // Apply saved settings
        if (! settings.animations) {
            document.body. classList.add('performance-mode');
        }
    }

    // ========== Notification System ==========
    window.showNotification = function(type, title, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>'}
            </div>
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Auto remove notification
        setTimeout(() => {
            notification.classList.add('remove');
            setTimeout(() => {
                notification.remove();
            }, 400);
        }, 3000);
    };

    // ========== Logo Click to Home ==========
    const logo = document.querySelector('.logo');
    if (logo) {
        logo. addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            window. scrollTo({ top: 0, behavior: 'smooth' });
            showNotification('success', 'Chào Mừng', 'Bạn đã quay lại trang chủ!');
        });
    }

    // ========== Button Ripple Effect ==========
    const buttons = document.querySelectorAll('. btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-effect');
            if (ripple) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
            }
        });
    });

    // ========== Smooth Scroll Spy ==========
    const sections = document.querySelectorAll('section');
    const menuItems = document.querySelectorAll('.menu-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section. clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section. getAttribute('id');
            }
        });

        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ========== Hover Animations on Cards ==========
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });

    // ========== Feature Items Interactive ==========
    const featureItems = document.querySelectorAll('. feature-item');
    featureItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // ========== Close Modals on ESC ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal. active');
            activeModals. forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
            closeMenu();
        }
    });

    // ========== Prevent Body Scroll When Menu Open ==========
    if (slideMenu) {
        slideMenu.addEventListener('wheel', function(e) {
            const isScrollableUp = this.scrollTop > 0;
            const isScrollableDown = (this.scrollHeight - this.scrollTop - this.clientHeight) > 0;
            
            if ((! isScrollableUp && e.deltaY < 0) || (! isScrollableDown && e.deltaY > 0)) {
                e.preventDefault();
            }
        });
    }

    // ========== Initialize Tooltips ==========
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document. createElement('div');
            tooltip. className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            });
        });
    });

    // ========== Welcome Message ==========
    showNotification('success', 'Chào Mừng! ', 'Bạn vừa tham gia Mythic Gateway!');

    // ========== Click outside modal to close ==========
    const modals = document.querySelectorAll('.modal');
    modals. forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e. target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});
