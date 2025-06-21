$(document).ready(function () {
  // Search functionality (Enter key or click icon)

  $('.search-form__input, .search-icon-inside').on('keypress click', function (e) {
    if (e.type === 'click' || e.which === 13) {
      const searchTerm = $('.search-form__input').val();
      if (searchTerm.trim()) {
        console.log('Searching for:', searchTerm);
        // Add your search logic here
      }
    }
  });

  // Focus effect on search box
  $('.search-form__input').on('focus', function () {
    $(this).parent().addClass('focused');
  }).on('blur', function () {
    $(this).parent().removeClass('focused');
  });

  // Sign In button
  $('.main-header__action--signin').on('click', function () {
    console.log('Sign In clicked');
    // Add your sign-in logic here
  });

  // Cart button click
  $('.main-header__action--cart').on('click', function () {
    console.log('Cart clicked');
    // Add your cart logic here
  });

  // Increment cart count when "Add to cart" is clicked
  let cartCount = 0;
  $('.recommended-section, .specials-section').on('click', '.add-to-cart-btn', function(e) {
    e.preventDefault();
    cartCount++;
    $('.cart-badge').text(cartCount);
    
    // Animate cart icon
    const cartIcon = $('.main-header__action--cart');
    cartIcon.addClass('bounce');
    setTimeout(() => cartIcon.removeClass('bounce'), 300);
  });

  // Horizontal Product Scrolling
  function setupProductScrolling() {
    $('.scroll-btn').on('click', function() {
      const target = $(this).data('target');
      const direction = $(this).hasClass('scroll-btn-prev') ? 'prev' : 'next';
      const container = $(`.${target}-section .product-row`);
      const items = container.find('.product-item');
      const itemWidth = items.first().outerWidth(true);
      const containerWidth = container.width();
      const visibleItems = Math.floor(containerWidth / itemWidth);
      const scrollAmount = itemWidth * visibleItems;
      
      let currentTransform = container.css('transform');
      let currentTranslateX = 0;
      
      // Extract current translateX value
      if (currentTransform !== 'none') {
        const matrix = new DOMMatrix(currentTransform);
        currentTranslateX = matrix.m41;
      }
      
      let newTranslateX;
      
      if (direction === 'next') {
        newTranslateX = currentTranslateX - scrollAmount;
        // Check if we've reached the end
        const maxScroll = -(items.length - visibleItems) * itemWidth;
        if (newTranslateX <= maxScroll) {
          // Loop back to start
          newTranslateX = 0;
        }
      } else {
        newTranslateX = currentTranslateX + scrollAmount;
        if (newTranslateX > 0) {
          // Loop to the end
          const maxScroll = -(items.length - visibleItems) * itemWidth;
          newTranslateX = maxScroll;
        }
      }
      
      container.css('transform', `translateX(${newTranslateX}px)`);
    });

    // Auto-scroll functionality for infinite loop
    function autoScroll() {
      $('.recommended-section, .specials-section').each(function() {
        const container = $(this).find('.product-row');
        const items = container.find('.product-item');
        const itemWidth = items.first().outerWidth(true);
        const containerWidth = container.width();
        const visibleItems = Math.floor(containerWidth / itemWidth);
        const scrollAmount = itemWidth * visibleItems;
        
        let currentTransform = container.css('transform');
        let currentTranslateX = 0;
        
        if (currentTransform !== 'none') {
          const matrix = new DOMMatrix(currentTransform);
          currentTranslateX = matrix.m41;
        }
        
        let newTranslateX = currentTranslateX - scrollAmount;
        const maxScroll = -(items.length - visibleItems) * itemWidth;
        
        if (newTranslateX <= maxScroll) {
          newTranslateX = 0; // Reset to start
        }
        
        container.css('transform', `translateX(${newTranslateX}px)`);
      });
    }

    // Auto-scroll every 5 seconds
    setInterval(autoScroll, 5000);
  }

  // Initialize product scrolling
  setupProductScrolling();

  // Hero Carousel
  let currentSlide = 0;
  const slides = $('.hero-slide');
  const tabs = $('.hero-tab:not(.hero-tab--see-all)');
  const totalSlides = slides.length;

  function showSlide(n) {
    // Ensure n is within bounds
    const slideIndex = (n + totalSlides) % totalSlides;
    
    // Update slides
    slides.removeClass('active');
    slides.eq(slideIndex).addClass('active');

    // Update tabs
    tabs.removeClass('active');
    tabs.eq(slideIndex).addClass('active');
    
    currentSlide = slideIndex;
  }

  $('.slider-arrow--next').on('click', function() {
    showSlide(currentSlide + 1);
  });

  $('.slider-arrow--prev').on('click', function() {
    showSlide(currentSlide - 1);
  });

  tabs.on('click', function() {
    const slideIndex = $(this).data('slide');
    showSlide(slideIndex);
  });

  // Initialize slider to show the first slide
  showSlide(0);

  // Optional: Autoplay
  let autoplay = setInterval(function() {
    showSlide(currentSlide + 1);
  }, 5000); // Change slide every 5 seconds

  // Pause autoplay on hover
  $('.hero').hover(function() {
    clearInterval(autoplay);
  }, function() {
    autoplay = setInterval(function() {
      showSlide(currentSlide + 1);
    }, 5000);
  });
});

class WellnessCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 4;
    this.isAnimating = false;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.startAutoplay();
  }

  bindEvents() {
    // Arrow navigation
    $('.carousel__arrow--prev').on('click', () => this.prevSlide());
    $('.carousel__arrow--next').on('click', () => this.nextSlide());

    // Dot navigation
    $('.carousel__nav-dot').on('click', (e) => {
      const slideIndex = parseInt($(e.target).data('slide'));
      this.goToSlide(slideIndex);
    });

    // Pause autoplay on hover
    $('.carousel').on('mouseenter', () => this.stopAutoplay());
    $('.carousel').on('mouseleave', () => this.startAutoplay());

    // Keyboard navigation
    $(document).on('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Touch/swipe support
    this.addTouchSupport();
  }

  addTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    const minSwipeDistance = 50;

    $('.carousel').on('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    $('.carousel').on('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      }
    });
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentSlide) return;
    
    this.isAnimating = true;
    
    // Remove active class from current slide and dot
    $('.carousel__slide').removeClass('carousel__slide--active');
    $('.carousel__nav-dot').removeClass('carousel__nav-dot--active');
    
    // Add active class to new slide and dot
    $(`.carousel__slide:eq(${index})`).addClass('carousel__slide--active');
    $(`.carousel__nav-dot:eq(${index})`).addClass('carousel__nav-dot--active');
    
    // Add animation classes to content
    const $newSlide = $(`.carousel__slide:eq(${index})`);
    $newSlide.find('.carousel__badge').addClass('fade-in');
    $newSlide.find('.carousel__title, .carousel__subtitle, .carousel__code').addClass('slide-up');
    
    this.currentSlide = index;
    
    setTimeout(() => {
      this.isAnimating = false;
      // Remove animation classes for next transition
      $('.fade-in, .slide-up').removeClass('fade-in slide-up');
    }, 800);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// Initialize carousel when DOM is ready
$(document).ready(() => {
  new WellnessCarousel();
});

// Intersection Observer for performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe carousel elements
document.querySelectorAll('.carousel__figure, .carousel__products').forEach(el => {
  observer.observe(el);
});

$(document).ready(function() {
  // Hero Carousel
  let currentSlide = 0;
  const slides = $('.hero-slide');
  const tabs = $('.hero-tab:not(.hero-tab--see-all)');
  const totalSlides = slides.length;

  function showSlide(n) {
    // Ensure n is within bounds
    const slideIndex = (n + totalSlides) % totalSlides;
    
    // Update slides
    slides.removeClass('active');
    slides.eq(slideIndex).addClass('active');

    // Update tabs
    tabs.removeClass('active');
    tabs.eq(slideIndex).addClass('active');
    
    currentSlide = slideIndex;
  }

  $('.slider-arrow--next').on('click', function() {
    showSlide(currentSlide + 1);
  });

  $('.slider-arrow--prev').on('click', function() {
    showSlide(currentSlide - 1);
  });

  tabs.on('click', function() {
    const slideIndex = $(this).data('slide');
    showSlide(slideIndex);
  });

  // Initialize slider to show the first slide
  showSlide(0);

  // Optional: Autoplay
  let autoplay = setInterval(function() {
    showSlide(currentSlide + 1);
  }, 5000); // Change slide every 5 seconds

  // Pause autoplay on hover
  $('.hero').hover(function() {
    clearInterval(autoplay);
  }, function() {
    autoplay = setInterval(function() {
      showSlide(currentSlide + 1);
    }, 5000);
  });

  // Generic Product Slider Logic
  function setupProductSlider(containerSelector, prevButtonSelector, nextButtonSelector) {
    const slider = $(containerSelector);
    const cards = slider.find('.product-card-wrapper');
    const prevButton = $(prevButtonSelector);
    const nextButton = $(nextButtonSelector);

    if (cards.length === 0) return;

    const itemsPerPage = 6;
    const totalItems = cards.length;
    // Ensure we don't have empty pages if totalItems isn't a multiple of itemsPerPage
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let currentPage = 0;

    // Calculate the distance to scroll
    const scrollAmount = cards.outerWidth(true) * itemsPerPage;

    nextButton.on('click', function() {
        currentPage++;
        if (currentPage >= totalPages) {
            currentPage = 0; // Loop back to the start
        }
        slider.animate({
            scrollLeft: currentPage * scrollAmount
        }, 500);
    });

    prevButton.on('click', function() {
        currentPage--;
        if (currentPage < 0) {
            currentPage = totalPages - 1; // Loop to the end
        }
        slider.animate({
            scrollLeft: currentPage * scrollAmount
        }, 500);
    });
  }

  // Initialize Recommended for you slider
  setupProductSlider('.recommended-section .product-grid-container', '.recommended-prev', '.recommended-next');

  // Initialize Specials picked for you slider
  setupProductSlider('.specials-section .product-grid-container', '.specials-prev', '.specials-next');
});

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider-products');
  const btnLeft = document.querySelector('.slider-arrow--left');
  const btnRight = document.querySelector('.slider-arrow--right');
  let scrollAmount = 220; // مقدار التحريك بالبكسل

  if (btnLeft && btnRight && slider) {
    btnLeft.addEventListener('click', function() {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    btnRight.addEventListener('click', function() {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // دعم السحب بالماوس أو الإصبع
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // سرعة السحب
    slider.scrollLeft = scrollLeft - walk;
  });

  // دعم السحب باللمس للموبايل
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchend', () => {
    isDown = false;
  });
  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
});
const slider   = document.getElementById('productSlider');
const btnLeft  = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnPause = document.getElementById('btn-pause');
const step     = 220;          // مقدار التمرير
let autoplay   = true;         // هل السلايدر يعمل تلقائياً؟
let timer;

// وظائف التمرير
const scrollLeft  = () => slider.scrollBy({ left: -step, behavior: 'smooth' });
const scrollRight = () => slider.scrollBy({ left:  step, behavior: 'smooth' });

// تشغيل / إيقاف
const togglePlay = () => {
  autoplay = !autoplay;
  btnPause.querySelector('i').classList.toggle('fa-pause', autoplay);
  btnPause.querySelector('i').classList.toggle('fa-play', !autoplay);
};

// أحداث الضغط
btnLeft .addEventListener('click', scrollLeft);
btnRight.addEventListener('click', scrollRight);
btnPause.addEventListener('click', togglePlay);

// تشغيل تلقائي كل 3 ثوانٍ
const startAuto = () => {
  timer = setInterval(() => { if (autoplay) scrollRight(); }, 3000);
};
startAuto();

// إيقاف مؤقت عند تمرير الفأرة
slider.addEventListener('mouseenter', () => autoplay = false);
slider.addEventListener('mouseleave', () => autoplay = true);

document.addEventListener('DOMContentLoaded', function () {
    const scrollBtns = document.querySelectorAll('.scroll-btn');

    scrollBtns.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const isNext = this.classList.contains('scroll-btn-next');
            let container;

            if (targetId === 'recommended' || targetId === 'specials') {
                container = document.querySelector(`.${targetId}-section .product-scroll-container`);
            } else if (targetId === 'brands') {
                container = document.querySelector('.brands-scroll-container');
            }

            if (container) {
                const scrollAmount = container.querySelector('.product-item, .brand-item-wrapper').offsetWidth + 10;
                
                if (isNext) {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        });
    });
});
