// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initAnimations();
    initSupportButtons();
    initStatsCounter();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Email không hợp lệ!', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Đang gửi tin nhắn...', 'info');
            
            setTimeout(() => {
                showNotification('Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất.', 'success');
                this.reset();
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Support buttons functionality
function initSupportButtons() {
    const supportButtons = document.querySelectorAll('.support-card .btn');
    
    supportButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.support-card');
            const cardTitle = card.querySelector('h3').textContent;
            
            if (cardTitle.includes('Tài Chính')) {
                showDonationModal();
            } else if (cardTitle.includes('Tinh Thần')) {
                showNotification('Cảm ơn bạn đã ủng hộ tinh thần! Hãy tham gia cộng đồng của chúng tôi.', 'success');
            } else if (cardTitle.includes('Chia Sẻ')) {
                showShareModal();
            }
        });
    });
}

// Stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                animateCounter(stat, finalValue);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

// Animate counter
function animateCounter(element, finalValue) {
    const isNumber = /\d/.test(finalValue);
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
    const suffix = finalValue.replace(/\d/g, '');
    
    let currentValue = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        if (isNumber) {
            element.textContent = Math.floor(currentValue) + suffix;
        } else {
            element.textContent = finalValue;
        }
    }, stepTime);
}

// Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .support-card, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Donation modal
function showDonationModal() {
    const modal = document.createElement('div');
    modal.className = 'donation-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Ủng Hộ ROM EU Repack</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="donation-options">
                        <div class="donation-option">
                            <h4>Momo</h4>
                            <p>0123456789</p>
                            <button class="btn btn-primary copy-btn" data-text="0123456789">Sao chép</button>
                        </div>
                        <div class="donation-option">
                            <h4>ZaloPay</h4>
                            <p>0123456789</p>
                            <button class="btn btn-primary copy-btn" data-text="0123456789">Sao chép</button>
                        </div>
                        <div class="donation-option">
                            <h4>Bank Transfer</h4>
                            <p>1234567890</p>
                            <p>Ngân hàng: Vietcombank</p>
                            <button class="btn btn-primary copy-btn" data-text="1234567890">Sao chép</button>
                        </div>
                    </div>
                    <div class="donation-note">
                        <p><strong>Lưu ý:</strong> Sau khi chuyển khoản, vui lòng liên hệ admin để được cấp quyền VIP.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideInUp 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Copy functionality
    const copyBtns = modal.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Đã sao chép số tài khoản!', 'success');
            });
        });
    });
}

// Share modal
function showShareModal() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Chia Sẻ ROM EU Repack</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="share-options">
                        <button class="share-btn facebook">
                            <i class="fab fa-facebook"></i>
                            <span>Facebook</span>
                        </button>
                        <button class="share-btn telegram">
                            <i class="fab fa-telegram"></i>
                            <span>Telegram</span>
                        </button>
                        <button class="share-btn discord">
                            <i class="fab fa-discord"></i>
                            <span>Discord</span>
                        </button>
                        <button class="share-btn copy-link">
                            <i class="fas fa-link"></i>
                            <span>Sao chép link</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        animation: slideInUp 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Share functionality
    const shareBtns = modal.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.classList.contains('facebook') ? 'facebook' :
                        this.classList.contains('telegram') ? 'telegram' :
                        this.classList.contains('discord') ? 'discord' : 'copy';
            
            const url = window.location.href;
            const text = 'ROM EU Repack - Cộng đồng game thủ Việt Nam';
            
            switch(type) {
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                    break;
                case 'telegram':
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
                    break;
                case 'discord':
                    window.open(`https://discord.com/channels/@me?content=${encodeURIComponent(text + ' ' + url)}`);
                    break;
                case 'copy':
                    navigator.clipboard.writeText(url).then(() => {
                        showNotification('Đã sao chép link!', 'success');
                    });
                    break;
            }
            
            modal.remove();
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .donation-options {
        display: grid;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .donation-option {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 15px;
        text-align: center;
    }
    
    .donation-option h4 {
        color: #667eea;
        margin-bottom: 0.5rem;
    }
    
    .donation-option p {
        margin-bottom: 1rem;
        color: #666;
    }
    
    .share-options {
        display: grid;
        gap: 1rem;
    }
    
    .share-btn {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .share-btn.facebook {
        background: #1877f2;
        color: white;
    }
    
    .share-btn.telegram {
        background: #0088cc;
        color: white;
    }
    
    .share-btn.discord {
        background: #5865f2;
        color: white;
    }
    
    .share-btn.copy-link {
        background: #6c757d;
        color: white;
    }
    
    .share-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
    
    .donation-note {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 10px;
        padding: 1rem;
        margin-top: 1rem;
    }
    
    .donation-note p {
        margin: 0;
        color: #856404;
    }
`;
document.head.appendChild(style); 