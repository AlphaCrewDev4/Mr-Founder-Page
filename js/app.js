
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


    menuToggle.addEventListener('click', () => {
        console.log(menu);
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