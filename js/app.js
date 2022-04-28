
(() => {
    // Variables
    const menuToggle = document.querySelector('#menu-toggle');
    const secondMenuBody = document.querySelector('#secondary-menu-body');
    const secondMenuToggle = document.querySelector('#secondary-menu-toggle');
    const menu = document.querySelector('.custom-nav-list');
    const secondMenu = document.querySelector('#secondary-menu');
    const customYear = document.querySelector('#custom-year');
    const header = document.querySelector('.custom-nav');
    const personItem = document.querySelectorAll('#personItem');
    const meetVideo = document.querySelectorAll("#meetVideo");
    const menuToggleItem = document.querySelector('#toggle-item');

    //AOS function
    AOS.init();
    
    // Get year for footer
    const date = new Date();
    const year = date.getFullYear();
    customYear.innerHTML = year;

    // View menu responsive
    menuToggle?.addEventListener('click', () => {
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

    //Secondary Menu

    secondMenuToggle?.addEventListener('click', () => {
        if(secondMenuBody.classList.contains('secondary-menu-active')) {
            secondMenuBody.classList.remove('secondary-menu-active');
        } else {
            secondMenuBody.classList.add('secondary-menu-active');
        }
        $('#secondary-menu').slideToggle('slow', 'swing', function () {
            secondMenu.classList.add('show-menu');
        });
    });

    menuToggleItem?.addEventListener('click', (event)=> {
        event.preventDefault();
    });

    // Close menu when click item menu
    /*$('.custom-nav-item a').click(function () {
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
    });*/

    // Sticky Menu

    window.addEventListener('scroll', () => {
        header?.classList.toggle('sticky', window.scrollY > 50);
    });

    // Function Meet
    const meetEvent = ({page}) => {
        _.map(personItem, (item, index) => {
            if(index === page.index) {
                item.classList.add('active-person');
                meetVideo[index].play();
            } else {
                item.classList.remove('active-person');
                meetVideo[index].pause();
            }
        });
    }

    // Meet Carrousel 
    const meetSlider = $('#meetSlide').owlCarousel({
        items: 1,
        loop: true,
        margin: 32,
        startPosition: 0,
        touchDrag: false,
        mouseDrag: false,
        onTranslate: meetEvent,
    });

    // Click meet person

    _.map(personItem, (item, index) => {
        item.addEventListener('click', () => {
            meetSlider.trigger('to.owl.carousel', [index, 1000]);
        })
    });

    // Go to the next item
    $('#arrow-right-5 span').click(function () {
        meetSlider.trigger('next.owl.carousel', [1000]);
    });

    // Go to the previous item
    $('#arrow-left-5 span').click(function () {
        meetSlider.trigger('prev.owl.carousel', [1000]);
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