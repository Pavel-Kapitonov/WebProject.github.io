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
        e.preventDefault(); // Чтобы страница не перезагружалась

        // Собираем данные
        const formData = new FormData(form);

        // Отправляем
        fetch('https://formcarry.com/s/9MOe0WO5uDQ', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(response) {
            if (response.ok) {
                statusMsg.textContent = '✅ Заявка успешно отправлена!';
                statusMsg.className = 'status success';
                form.reset(); // Очистить поля
            } else {
                // Если ошибка
                statusMsg.textContent = '❌ Ошибка отправки.';
                statusMsg.className = 'status error';
            }
        })
        .catch(function(error) {
            // Если совсем всё плохо (например, нет интернета)
            statusMsg.textContent = '❌ Ошибка отправки.';
            statusMsg.className = 'status error';
        });
    });

});




/* СЛАЙДЕР */

$(document).ready(function(){

    // 1. Находим наш слайдер и сохраняем в переменную
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

    // 3. Узнаем, сколько всего слайдов
    var totalSlides = $slider.slick('getSlick').slideCount;

    // Если число меньше 10, добавляем нолик (было 6 - стало 06)
    if (totalSlides < 10) {
        $('.total').text('0' + totalSlides);
    } else {
        $('.total').text(totalSlides);
    }

    // Каждый раз, когда слайд сменился, запускается эта функция
    $slider.on('afterChange', function(event, slick, currentSlide){
        
        // currentSlide — это номер слайда, начиная с 0 (0, 1, 2...)
        // Нам нужно привычное число, поэтому прибавляем 1
        var slideNumber = currentSlide + 1;

        // Опять проверка: если меньше 10, добавляем "0" в начало
        if (slideNumber < 10) {
            $('.current').text('0' + slideNumber);
        } else {
            $('.current').text(slideNumber);
        }
        
    });

});
