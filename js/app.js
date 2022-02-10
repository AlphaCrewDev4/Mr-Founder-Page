
// Variables
const menuToggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('.custom-nav-list');


menuToggle.addEventListener('click', ()=> {
    console.log(menu);
    if(menuToggle.checked === true) {
        $('.custom-nav-list').slideToggle('slow','swing', function() {
            menu.classList.add('show-menu');
        } );
        
        
    } else {
        $('.custom-nav-list').slideToggle('slow','swing', function() {
            menu.classList.remove('show-menu');
        } );
        
    }
});