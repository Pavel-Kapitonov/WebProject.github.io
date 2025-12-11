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



/* ФОРМА */
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('statusMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы

        // 1. Показываем статус "Отправка..." (чтобы пользователь понимал, что процесс идет)
        statusMsg.textContent = 'Отправка...';
        statusMsg.className = 'status';

        // 2. Собираем данные
        const formData = new FormData(form);

        try {
            // Точь-в-точь как на твоем рабочем сайте
            const response = await fetch('https://formcarry.com/s/9MOe0WO5uDQ', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Проверка успеха (коды от 200 до 399 считаются успехом)
            // Именно эта проверка была в твоем рабочем коде
            const isSuccess = response.status >= 200 && response.status < 400;

            if (isSuccess) {
                statusMsg.textContent = '✅ Форма успешно отправлена!';
                statusMsg.className = 'status success';
                form.reset(); // Очищаем поля
            } else {
                // Если сервис вернул ошибку, пробуем прочитать, что там
                const result = await response.json();
                throw new Error(result.message || 'Ошибка сервера');
            }

        } catch (error) {
            // Если интернета нет или другая ошибка
            statusMsg.textContent = '❌ Ошибка отправки. Попробуйте позже.';
            statusMsg.className = 'status error';
            console.error(error); // Для отладки в консоли (F12)
        }
    });

});


});
