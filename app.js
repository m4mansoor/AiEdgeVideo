// Presentation Navigation JavaScript for 23-slide presentation
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
                '.feature-box, .spec-box, .feature-item, .advantage-box, .deliverable, .risk-item, .conclusion-item, .step-item'
            );
            
            elementsToAnimate.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 100);
            });
        }, 200);
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
        .feature-box,
        .spec-box,
        .feature-item,
        .advantage-box,
        .deliverable,
        .risk-item,
        .conclusion-item,
        .step-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease-out;
        }
        
        .feature-box:hover,
        .spec-box:hover,
        .advantage-box:hover {
            transform: translateY(-4px);
        }
        
        .feature-item:hover {
            transform: translateX(8px);
        }
        
        /* Slide transition improvements */
        .slide {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .slide.active {
            animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .slide.prev {
            animation: slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(30px);
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
                transform: translateX(-30px);
            }
        }
        
        /* Progress bar animation */
        .progress-fill {
            transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Navigation button interactions */
        .nav-btn {
            transition: all 0.2s ease-out;
        }
        
        .nav-btn:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.02);
        }
        
        .nav-btn:active:not(:disabled) {
            transform: translateY(0) scale(0.98);
        }
        
        /* Loading animation for presentation start */
        @keyframes fadeInPresentation {
            from {
                opacity: 0;
                transform: scale(0.98);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .presentation-container {
            animation: fadeInPresentation 0.6s ease-out;
        }
        
        /* Responsive animations */
        @media (max-width: 768px) {
            .animate-in {
                animation-duration: 0.3s;
            }
            
            .slide {
                transition-duration: 0.3s;
            }
            
            .feature-box:hover,
            .spec-box:hover,
            .advantage-box:hover {
                transform: translateY(-2px);
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
    hints.innerHTML = 'Use ← → arrow keys, spacebar, or click to navigate • 23 focused slides';
    document.body.appendChild(hints);
    
    // Show hints briefly on load
    setTimeout(() => {
        hints.style.opacity = '0.7';
        setTimeout(() => {
            hints.style.opacity = '0';
        }, 3000);
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

// Auto-resize content to prevent overflow
function ensureContentFits() {
    const slides = document.querySelectorAll('.slide-content');
    
    slides.forEach((slide, index) => {
        const slideHeight = slide.scrollHeight;
        const containerHeight = window.innerHeight * 0.85; // 85% of viewport
        
        if (slideHeight > containerHeight) {
            console.warn(`Slide ${index + 1} content height (${slideHeight}px) exceeds container (${containerHeight}px)`);
            
            // Reduce font sizes slightly if content is too tall
            const textElements = slide.querySelectorAll('p, li, .feature-item p, .spec-box p');
            textElements.forEach(el => {
                const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
                if (currentSize > 14) {
                    el.style.fontSize = Math.max(14, currentSize - 2) + 'px';
                }
            });
        }
    });
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add enhanced animations
    addElementAnimations();
    
    // Initialize the presentation controller
    const presentation = new PresentationController();
    
    // Add touch support for mobile
    addTouchSupport(presentation);
    
    // Add keyboard hints
    addKeyboardHints();
    
    // Ensure content fits properly
    ensureContentFits();
    
    // Re-check content fit on window resize
    window.addEventListener('resize', () => {
        setTimeout(ensureContentFits, 100);
    });
    
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
    }, { passive: false });
    
    // Add slide number indicators for easier navigation
    function addSlideIndicators() {
        const indicators = document.createElement('div');
        indicators.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 4px;
            z-index: 1000;
            opacity: 0.6;
            transition: opacity 0.3s ease;
        `;
        
        for (let i = 1; i <= 23; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: ${i === 1 ? 'var(--color-primary)' : 'var(--color-gray-300)'};
                cursor: pointer;
                transition: all 0.2s ease;
            `;
            
            dot.addEventListener('click', () => {
                presentation.goToSlide(i);
                updateIndicators(i);
            });
            
            indicators.appendChild(dot);
        }
        
        document.body.appendChild(indicators);
        
        function updateIndicators(activeSlide) {
            const dots = indicators.children;
            for (let i = 0; i < dots.length; i++) {
                dots[i].style.background = i + 1 === activeSlide ? 
                    'var(--color-primary)' : 'var(--color-gray-300)';
            }
        }
        
        // Update indicators when slide changes
        const originalGoToSlide = presentation.goToSlide.bind(presentation);
        presentation.goToSlide = function(slideNumber) {
            originalGoToSlide(slideNumber);
            updateIndicators(slideNumber);
        };
        
        indicators.addEventListener('mouseenter', () => {
            indicators.style.opacity = '1';
        });
        
        indicators.addEventListener('mouseleave', () => {
            indicators.style.opacity = '0.6';
        });
    }
    
    // Add slide indicators
    addSlideIndicators();
    
    console.log('🚀 AI-Powered Edge Content Device Presentation Loaded');
    console.log('📊 23 focused slides with light theme and no scrolling');
    console.log('Navigation: Arrow keys, Space, Page Up/Down, Home, End, Escape');
    console.log('Click slides, use navigation buttons, or click dots to navigate');
    console.log('Current slide:', presentation.getCurrentSlideInfo());
});