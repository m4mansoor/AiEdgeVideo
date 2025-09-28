// Presentation Navigation JavaScript - 23 Slides
class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 23;
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideSpan = document.getElementById('currentSlide');
        this.totalSlidesSpan = document.getElementById('totalSlides');
        this.progressFill = document.getElementById('progressFill');
        
        this.init();
    }
    
    init() {
        // Set initial state
        this.updateSlideCounter();
        this.updateProgress();
        this.updateNavigationButtons();
        
        // Add event listeners
        this.addEventListeners();
        
        // Show first slide
        this.showSlide(1);
    }
    
    addEventListeners() {
        // Button navigation
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Click navigation on slides
        this.slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                // Only navigate if not clicking on interactive elements
                if (!e.target.closest('button, a, .nav-controls')) {
                    this.nextSlide();
                }
            });
        });
        
        // Prevent context menu on slide clicks
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.slide')) {
                e.preventDefault();
            }
        });
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ': // Spacebar
            case 'PageDown':
                e.preventDefault();
                this.nextSlide();
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.previousSlide();
                break;
                
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
                
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
                
            case 'Escape':
                e.preventDefault();
                this.goToSlide(1);
                break;
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        } else {
            // On last slide, go back to first slide
            this.goToSlide(1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) {
            return;
        }
        
        const previousSlide = this.currentSlide;
        this.currentSlide = slideNumber;
        
        this.showSlide(slideNumber, previousSlide);
        this.updateSlideCounter();
        this.updateProgress();
        this.updateNavigationButtons();
    }
    
    showSlide(slideNumber, previousSlideNumber = null) {
        // Hide all slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index + 1 === slideNumber) {
                // Show current slide
                slide.classList.add('active');
            } else if (previousSlideNumber && index + 1 === previousSlideNumber) {
                // Mark previous slide for exit animation
                slide.classList.add('prev');
            }
        });
        
        // Add entrance animations based on slide content
        this.addSlideAnimations(slideNumber);
    }
    
    addSlideAnimations(slideNumber) {
        const currentSlideElement = this.slides[slideNumber - 1];
        
        // Remove any existing animation classes
        const animatedElements = currentSlideElement.querySelectorAll('.animate-in');
        animatedElements.forEach(el => el.classList.remove('animate-in'));
        
        // Add animation classes with delays
        setTimeout(() => {
            const elementsToAnimate = currentSlideElement.querySelectorAll(
                '.spec-card, .feature-category, .milestone, .risk-item, .step, .conclusion-points li, .software-box, .component-group, .phase-item'
            );
            
            elementsToAnimate.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 100);
            });
        }, 300);
    }
    
    updateSlideCounter() {
        this.currentSlideSpan.textContent = this.currentSlide;
        this.totalSlidesSpan.textContent = this.totalSlides;
    }
    
    updateProgress() {
        const progressPercentage = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
    }
    
    updateNavigationButtons() {
        // Update previous button - disable only on first slide
        this.prevBtn.disabled = this.currentSlide === 1;
        
        // Update next button behavior
        if (this.currentSlide === this.totalSlides) {
            this.nextBtn.innerHTML = '⟲'; // Reset icon
            this.nextBtn.title = 'Return to start';
            this.nextBtn.disabled = false;
        } else {
            this.nextBtn.innerHTML = '›';
            this.nextBtn.title = 'Next slide';
            this.nextBtn.disabled = false;
        }
    }
    
    // Public method to jump to specific slide (for potential external use)
    jumpToSlide(slideNumber) {
        this.goToSlide(slideNumber);
    }
    
    // Method to get current slide info
    getCurrentSlideInfo() {
        return {
            current: this.currentSlide,
            total: this.totalSlides,
            progress: (this.currentSlide / this.totalSlides) * 100
        };
    }
}

// Enhanced animations for slide elements
function addElementAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .spec-card,
        .feature-category,
        .milestone,
        .risk-item,
        .step,
        .conclusion-points li,
        .software-box,
        .component-group,
        .phase-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .spec-card:hover,
        .milestone:hover,
        .software-box:hover {
            transform: translateY(-8px);
        }
        
        /* Slide transition improvements */
        .slide {
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .slide.active {
            animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .slide.prev {
            animation: slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50px);
            }
        }
        
        /* Progress bar animation */
        .progress-fill {
            transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Navigation button interactions */
        .nav-btn {
            transition: all 0.2s ease-out;
        }
        
        .nav-btn:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.05);
        }
        
        .nav-btn:active:not(:disabled) {
            transform: translateY(0) scale(0.98);
        }
        
        /* Slide content hover effects */
        .feature-list li:hover {
            transform: translateX(8px);
        }
        
        .power-features li:hover {
            padding-left: var(--space-12);
        }
        
        /* Enhanced card hover effects */
        .spec-card,
        .milestone,
        .feature-category,
        .component-group,
        .software-box {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Loading animation for presentation start */
        @keyframes fadeInPresentation {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .presentation-container {
            animation: fadeInPresentation 0.8s ease-out;
        }
        
        /* Responsive animations */
        @media (max-width: 768px) {
            .animate-in {
                animation-duration: 0.4s;
            }
            
            .slide {
                transition-duration: 0.3s;
            }
        }
        
        /* Focus styles for accessibility */
        .nav-btn:focus-visible {
            outline: 3px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        .slide:focus {
            outline: 2px solid transparent;
        }
        
        /* Print styles */
        @media print {
            .nav-controls,
            .progress-bar {
                display: none;
            }
            
            .slide {
                position: static !important;
                opacity: 1 !important;
                transform: none !important;
                page-break-after: always;
                height: auto !important;
                padding: 20px !important;
            }
            
            .presentation-container {
                background: white !important;
                color: black !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility functions for enhanced user experience
function addKeyboardHints() {
    const hints = document.createElement('div');
    hints.style.cssText = `
        position: fixed;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    hints.innerHTML = 'Use ← → arrow keys, spacebar, or click to navigate • 23 slides total';
    document.body.appendChild(hints);
    
    // Show hints briefly on load
    setTimeout(() => {
        hints.style.opacity = '0.7';
        setTimeout(() => {
            hints.style.opacity = '0';
        }, 4000);
    }, 1000);
}

// Touch/swipe support for mobile devices
function addTouchSupport(controller) {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Minimum swipe distance
        const minSwipeDistance = 50;
        
        // Horizontal swipe (more horizontal than vertical)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - previous slide
                controller.previousSlide();
            } else {
                // Swipe left - next slide
                controller.nextSlide();
            }
        }
    }, { passive: true });
}

// Slide content detection for better animations
function detectSlideContent(slideElement) {
    const slideType = {
        hasSpecs: slideElement.querySelector('.specs-grid') !== null,
        hasTimeline: slideElement.querySelector('.timeline-layout') !== null,
        hasRisks: slideElement.querySelector('.risks-layout') !== null,
        hasSoftware: slideElement.querySelector('.software-boxed-layout') !== null,
        hasHardware: slideElement.querySelector('.hardware-layout') !== null,
        hasAI: slideElement.querySelector('.ai-features-grid') !== null,
        isTitle: slideElement.querySelector('.title-slide') !== null,
        isConclusion: slideElement.querySelector('.conclusion-slide') !== null
    };
    
    return slideType;
}

// Enhanced slide navigation with content-aware animations
function enhanceSlideTransitions(controller) {
    const originalShowSlide = controller.showSlide.bind(controller);
    
    controller.showSlide = function(slideNumber, previousSlideNumber = null) {
        originalShowSlide(slideNumber, previousSlideNumber);
        
        const currentSlideElement = this.slides[slideNumber - 1];
        const slideType = detectSlideContent(currentSlideElement);
        
        // Add content-specific animations
        setTimeout(() => {
            if (slideType.isTitle) {
                const title = currentSlideElement.querySelector('.main-title');
                const subtitle = currentSlideElement.querySelector('.subtitle');
                if (title) title.style.animation = 'slideInUp 0.8s ease-out forwards';
                if (subtitle) setTimeout(() => {
                    subtitle.style.animation = 'slideInUp 0.6s ease-out forwards';
                }, 200);
            }
            
            if (slideType.hasSpecs) {
                const cards = currentSlideElement.querySelectorAll('.spec-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 150);
                });
            }
            
            if (slideType.hasTimeline) {
                const milestones = currentSlideElement.querySelectorAll('.milestone, .phase-item');
                milestones.forEach((milestone, index) => {
                    setTimeout(() => {
                        milestone.classList.add('animate-in');
                    }, index * 200);
                });
            }
            
            if (slideType.hasSoftware) {
                const boxes = currentSlideElement.querySelectorAll('.software-box');
                boxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.classList.add('animate-in');
                    }, index * 100);
                });
            }
        }, 100);
    };
}

// Slide progress tracking and analytics
function addSlideAnalytics(controller) {
    const slideTimings = {};
    let slideStartTime = Date.now();
    
    const originalGoToSlide = controller.goToSlide.bind(controller);
    
    controller.goToSlide = function(slideNumber) {
        // Track time spent on previous slide
        if (this.currentSlide) {
            const timeSpent = Date.now() - slideStartTime;
            slideTimings[this.currentSlide] = (slideTimings[this.currentSlide] || 0) + timeSpent;
        }
        
        slideStartTime = Date.now();
        originalGoToSlide(slideNumber);
    };
    
    // Expose analytics
    controller.getSlideAnalytics = function() {
        return {
            timings: slideTimings,
            totalSlides: this.totalSlides,
            currentSlide: this.currentSlide,
            averageTimePerSlide: Object.values(slideTimings).reduce((a, b) => a + b, 0) / Object.keys(slideTimings).length || 0
        };
    };
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add enhanced animations
    addElementAnimations();
    
    // Initialize the presentation controller
    const presentation = new PresentationController();
    
    // Enhance with additional features
    enhanceSlideTransitions(presentation);
    addSlideAnalytics(presentation);
    
    // Add touch support for mobile
    addTouchSupport(presentation);
    
    // Add keyboard hints
    addKeyboardHints();
    
    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Presentation error:', e.error);
    });
    
    // Expose controller globally for debugging
    window.presentationController = presentation;
    
    // Add fullscreen support (optional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F11') {
            e.preventDefault();
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {
                    console.log('Fullscreen not supported');
                });
            } else {
                document.exitFullscreen();
            }
        }
    });
    
    // Prevent zoom on double tap for mobile
    document.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) {
            e.preventDefault();
        }
    });
    
    // Add slide number shortcuts (1-23)
    document.addEventListener('keydown', (e) => {
        // Check if user pressed a number key (1-9)
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= 9 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            presentation.goToSlide(keyNum);
        }
        
        // Handle 10-23 with Ctrl+number
        if (e.ctrlKey && keyNum >= 0 && keyNum <= 9) {
            let targetSlide;
            if (keyNum === 0) targetSlide = 10;
            else targetSlide = 10 + keyNum;
            
            if (targetSlide <= presentation.totalSlides) {
                presentation.goToSlide(targetSlide);
            }
        }
    });
    
    // Auto-save presentation progress in session
    let progressSaveTimer;
    const originalGoToSlide = presentation.goToSlide.bind(presentation);
    presentation.goToSlide = function(slideNumber) {
        originalGoToSlide(slideNumber);
        
        // Debounced save to session storage (if available)
        clearTimeout(progressSaveTimer);
        progressSaveTimer = setTimeout(() => {
            try {
                sessionStorage.setItem('presentation-slide', slideNumber);
            } catch (e) {
                // SessionStorage not available in sandbox
            }
        }, 500);
    };
    
    // Restore presentation progress on load
    try {
        const savedSlide = sessionStorage.getItem('presentation-slide');
        if (savedSlide && parseInt(savedSlide) > 1) {
            setTimeout(() => {
                presentation.goToSlide(parseInt(savedSlide));
            }, 100);
        }
    } catch (e) {
        // SessionStorage not available in sandbox
    }
    
    console.log('🚀 AI-Powered Edge Content Device Presentation Loaded');
    console.log('📊 23 Slides Total - Complete Technical Proposal');
    console.log('🎮 Navigation: Arrow keys, Space, Page Up/Down, Home, End, Escape');
    console.log('🔢 Quick jump: Number keys 1-9, Ctrl+0-9 for slides 10-23');
    console.log('📱 Touch: Swipe left/right on mobile devices');
    console.log('📄 Current slide:', presentation.getCurrentSlideInfo());
    console.log('⏱️ Analytics available via: presentationController.getSlideAnalytics()');
});
