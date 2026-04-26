document.addEventListener('DOMContentLoaded', function() {


    /* БУРГЕР МЕНЮ */

    const burgerBtn = document.getElementById('burgerBtn');
    const menuList = document.getElementById('menuList');
    const menuLinks = document.querySelectorAll('.main-nav a');


    burgerBtn.addEventListener('click', () => {
        menuList.classList.toggle('active');
        burgerBtn.classList.toggle('open');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuList.classList.remove('active');
            burgerBtn.classList.remove('open');
        });
    });


    /* ФОРМА */ 

    
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('statusMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 


        const formData = new FormData(form);


        fetch('', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(response) {
            if (response.ok) {
                statusMsg.textContent = '✅ Заявка успешно отправлена!';
                statusMsg.className = 'status success';
                form.reset();
            } else {

                statusMsg.textContent = '❌ Ошибка отправки.';
                statusMsg.className = 'status error';
            }
        })
        .catch(function(error) {
            statusMsg.textContent = '❌ Ошибка отправки.';
            statusMsg.className = 'status error';
        });
    });

});




/* СЛАЙДЕР */

$(document).ready(function(){

    var $slider = $('.cottage-slider');

    $slider.slick({
        infinite: true,
        slidesToShow: 1, 
        slidesToScroll: 1,
        fade: true, 
        arrows: true, 
        prevArrow: $('.prev-slide'), 
        nextArrow: $('.next-slide')
    });

    var totalSlides = $slider.slick('getSlick').slideCount;

    if (totalSlides < 10) {
        $('.total').text('0' + totalSlides);
    } else {
        $('.total').text(totalSlides);
    }

    $slider.on('afterChange', function(event, slick, currentSlide){
        
        var slideNumber = currentSlide + 1;

        if (slideNumber < 10) {
            $('.current').text('0' + slideNumber);
        } else {
            $('.current').text(slideNumber);
        }
        
    });

});

