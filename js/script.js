// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cartCount = 0;

    // Search functionality
    const searchInput = document.querySelector('.search-form__input');
    const searchButton = document.querySelector('.search-form__button');

    if (searchInput && searchButton) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.which === 13) {
                const searchTerm = searchInput.value;
                if (searchTerm.trim()) {
                    console.log('Searching for:', searchTerm);
                }
            }
        });

        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value;
            if (searchTerm.trim()) {
                console.log('Searching for:', searchTerm);
            }
        });

        // Focus effect on search box
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    // Sign In button
    const signInBtn = document.querySelector('.main-header__action--signin');
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            console.log('Sign In clicked');
        });
    }

    // Cart button click
    const cartBtn = document.querySelector('.main-header__action--cart');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            console.log('Cart clicked');
        });
    }

    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.preventDefault();
            cartCount++;
            const cartBadge = document.querySelector('.cart-badge');
            if (cartBadge) {
                cartBadge.textContent = cartCount;
            }
            
            // Animate cart icon
            const cartIcon = document.querySelector('.main-header__action--cart');
            if (cartIcon) {
                cartIcon.classList.add('bounce');
                setTimeout(() => cartIcon.classList.remove('bounce'), 300);
            }
        }
    });

    // Hero Carousel - FIXED VERSION
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const tabs = document.querySelectorAll('.hero-tab:not(.hero-tab--see-all)');
    const totalSlides = slides.length;
    let autoplayInterval;

    function showSlide(n) {
        if (totalSlides === 0) return;
        
        const slideIndex = ((n % totalSlides) + totalSlides) % totalSlides;
        
        // Remove active class from all slides and tabs
        slides.forEach(slide => slide.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));

        // Add active class to current slide and tab
        if (slides[slideIndex]) {
            slides[slideIndex].classList.add('active');
        }
        if (tabs[slideIndex]) {
            tabs[slideIndex].classList.add('active');
        }
        
        currentSlide = slideIndex;
    }

    function startAutoplay() {
        if (totalSlides <= 1) return;
        autoplayInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Hero slider controls
    const nextBtn = document.querySelector('.slider-arrow--next');
    const prevBtn = document.querySelector('.slider-arrow--prev');

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showSlide(currentSlide + 1);
            stopAutoplay();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            showSlide(currentSlide - 1);
            stopAutoplay();
            startAutoplay();
        });
    }

    // Tab clicks
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            showSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Initialize hero slider
    if (totalSlides > 0) {
        showSlide(0);
        startAutoplay();

        // Pause autoplay on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopAutoplay);
            heroSection.addEventListener('mouseleave', startAutoplay);
        }
    }

    // Product Scrolling - FIXED VERSION
    function setupProductScrolling() {
        const scrollButtons = document.querySelectorAll('.scroll-btn');
        
        scrollButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                const direction = this.classList.contains('scroll-btn-prev') ? 'prev' : 'next';
                
                let container;
                if (target === 'brands') {
                    container = document.querySelector('.brands-scroll-container');
                } else {
                    container = document.querySelector(`.${target}-section .product-scroll-container`) ||
                               document.querySelector(`#${target}-container`);
                }
                
                if (container) {
                    const scrollAmount = 300;
                    const currentScroll = container.scrollLeft;
                    
                    if (direction === 'next') {
                        container.scrollTo({
                            left: currentScroll + scrollAmount,
                            behavior: 'smooth'
                        });
                    } else {
                        container.scrollTo({
                            left: currentScroll - scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupProductScrolling();

    // Selected for you rotation
    const selectedArrow = document.querySelector('.selected-arrow');
    if (selectedArrow) {
        selectedArrow.addEventListener('click', function() {
            const scroll = document.querySelector('.selected-scroll');
            const btns = scroll ? scroll.querySelectorAll('.selected-btn') : [];
            if (btns.length > 1) {
                scroll.appendChild(btns[0]);
            }
        });
    }

    // iHerb Live Slider - FIXED VERSION
    const liveSlider = document.getElementById('productSlider');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnPause = document.getElementById('btn-pause');
    let isPlaying = true;
    let liveAutoplayInterval;

    function startLiveAutoplay() {
        if (!liveSlider) return;
        liveAutoplayInterval = setInterval(() => {
            if (isPlaying) {
                liveSlider.scrollBy({ left: 220, behavior: 'smooth' });
                
                // Reset to beginning if at end
                if (liveSlider.scrollLeft + liveSlider.clientWidth >= liveSlider.scrollWidth - 10) {
                    setTimeout(() => {
                        liveSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    }, 1000);
                }
            }
        }, 3000);
    }

    function stopLiveAutoplay() {
        clearInterval(liveAutoplayInterval);
    }

    if (btnLeft && btnRight && liveSlider) {
        btnLeft.addEventListener('click', () => {
            liveSlider.scrollBy({ left: -220, behavior: 'smooth' });
        });

        btnRight.addEventListener('click', () => {
            liveSlider.scrollBy({ left: 220, behavior: 'smooth' });
        });

        // Mouse events for live slider
        liveSlider.addEventListener('mouseenter', () => {
            isPlaying = false;
        });

        liveSlider.addEventListener('mouseleave', () => {
            isPlaying = true;
        });

        startLiveAutoplay();
    }

    if (btnPause) {
        btnPause.addEventListener('click', () => {
            isPlaying = !isPlaying;
            const icon = btnPause.querySelector('i');
            if (icon) {
                if (isPlaying) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }
            }
        });
    }

    // Brands carousel scrolling - FIXED VERSION
    function setupBrandsScrolling() {
        const brandsButtons = document.querySelectorAll('[data-target="brands"]');
        
        brandsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const direction = this.classList.contains('scroll-btn-prev') ? 'prev' : 'next';
                const container = document.querySelector('.brands-scroll-container');
                
                if (container) {
                    const scrollAmount = 300;
                    const currentScroll = container.scrollLeft;
                    
                    if (direction === 'next') {
                        container.scrollTo({
                            left: currentScroll + scrollAmount,
                            behavior: 'smooth'
                        });
                    } else {
                        container.scrollTo({
                            left: currentScroll - scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupBrandsScrolling();

    // Initialize all product section scrolling
    function initializeProductScrolling() {
        const sections = ['recommended', 'specials', 'trending', 'bestsellers'];
        
        sections.forEach(section => {
            const container = document.querySelector(`.${section}-section .product-scroll-container`);
            const prevBtn = document.querySelector(`.${section}-section .scroll-btn-prev`);
            const nextBtn = document.querySelector(`.${section}-section .scroll-btn-next`);
            
            if (container && prevBtn && nextBtn) {
                prevBtn.addEventListener('click', function() {
                    container.scrollTo({
                        left: container.scrollLeft - 300,
                        behavior: 'smooth'
                    });
                });
                
                nextBtn.addEventListener('click', function() {
                    container.scrollTo({
                        left: container.scrollLeft + 300,
                        behavior: 'smooth'
                    });
                });
            }
        });
    }

    initializeProductScrolling();

    // Best sellers tab functionality
    const bestsellerTabs = document.querySelectorAll('.bestsellers-section .nav-link');
    const bestsellerContents = document.querySelectorAll('.bestsellers-section .tab-pane');

    bestsellerTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and contents
            bestsellerTabs.forEach(t => t.classList.remove('active'));
            bestsellerContents.forEach(c => c.classList.remove('active', 'show'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetId = this.getAttribute('href').substring(1);
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active', 'show');
            }
        });
    });

    console.log('All carousels and functionality initialized successfully!');
});