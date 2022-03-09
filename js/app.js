
(() => {
    // Variables
    const menuToggle = document.querySelector('#menu-toggle');
    const menu = document.querySelector('.custom-nav-list');
    const customYear = document.querySelector('#custom-year');
    const header = document.querySelector('.custom-nav');


    // Get year for footer
    const date = new Date();
    const year = date.getFullYear();
    customYear.innerHTML = year;

    // View menu responsive
    menuToggle.addEventListener('click', () => {
        if (menuToggle.checked === true) {
            $('.custom-nav-list').slideToggle('slow', 'swing', function () {
                menu.classList.add('show-menu');
            });


        } else {
            $('.custom-nav-list').slideToggle('slow', 'swing', function () {
                menu.classList.remove('show-menu');
            });

        }
    });

    // Close menu when click item menu
    $('.custom-nav-item a').click(function () {
        menuToggle.checked = false;
        if (menuToggle.checked === true) {
            $('.custom-nav-list').slideToggle('slow', 'swing', function () {
                menu.classList.add('show-menu');
            });
        } else {
            $('.custom-nav-list').slideToggle('slow', 'swing', function () {
                menu.classList.remove('show-menu');
            });

        }
    });

    //AOS function
    AOS.init();

    // Sticky Menu

    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 50);
    });

    // Video Carrousel 
    const videoSlider = $('.video-slider').owlCarousel({
        items: 1,
        loop: true,
        touchDrag: false,
        mouseDrag: false,
    });

    // Go to the next item
    $('#arrow-right-1 span').click(function () {
        videoSlider.trigger('next.owl.carousel', [1000]);
    });

    // Go to the previous item
    $('#arrow-left-1 span').click(function () {
        videoSlider.trigger('prev.owl.carousel', [1000]);
    });

    // Video Carrousel 2
    const videoSlider2 = $('.video-slider-2').owlCarousel({
        items: 2,
        loop: true,
        touchDrag: false,
        mouseDrag: false,
        dots: true,
        dotsSpeed: 1000,
        responsive:{
            0:{
                items:1,
            },
            767:{
                items:2,
            },
        },
    });

    // Go to the next item
    $('#arrow-right-2 span').click(function () {
        videoSlider2.trigger('next.owl.carousel', [1000]);
    });

    // Go to the previous item
    $('#arrow-left-2 span').click(function () {
        videoSlider2.trigger('prev.owl.carousel', [1000]);
    });

    // Video Carrousel 3
    const videoSlider3 = $('.video-slider-3').owlCarousel({
        items: 2,
        loop: true,
        touchDrag: false,
        mouseDrag: false,
        dots: true,
        dotsSpeed: 1000,
        responsive:{
            0:{
                items:1,
            },
            767:{
                items:2,
            },
        },
    });

    // Go to the next item
    $('#arrow-right-3 span').click(function () {
        videoSlider3.trigger('next.owl.carousel', [1000]);
    });

    // Go to the previous item
    $('#arrow-left-3 span').click(function () {
        videoSlider3.trigger('prev.owl.carousel', [1000]);
    });

    // Video Carrousel 4
    const videoSlider4 = $('.video-slider-4').owlCarousel({
        items: 2,
        loop: true,
        touchDrag: false,
        mouseDrag: false,
        dots: true,
        dotsSpeed: 1000,
        responsive:{
            0:{
                items:1,
            },
            767:{
                items:2,
            },
        },
    });

    // Go to the next item
    $('#arrow-right-4 span').click(function () {
        videoSlider4.trigger('next.owl.carousel', [1000]);
    });

    // Go to the previous item
    $('#arrow-left-4 span').click(function () {
        videoSlider4.trigger('prev.owl.carousel', [1000]);
    });

    //Card Carrousel
    $('.custom-slider').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4500,
        smartSpeed: 6000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            767: {
                items: 2,
            },
            1200: {
                items: 3,
            }
        }
    });
})();