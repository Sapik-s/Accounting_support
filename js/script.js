$(document).ready(function(){
	// Slick слайдер
	$('.cert__slider, .reviews__slider').slick({
		// сколько слайдеров показывает
		slidesToShow: 1,
		// сколько слайдеров листает
		slidesToScroll: 1,
		// автоматическая прокрутка
		autoplay: true,
		// скорость прокрутки
		autoplaySpeed: 3500,
		// включаем стрелки
		arrows: true,
		// включить точки
        dots: true,
    });

	// Фиксация навигационного меню
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1000) {
            $('.nav').addClass('fixed');
        } else {
            $('.nav').removeClass('fixed');
        }
    });

    // Скрипт для стрелки вверх
	$(window).scroll(function() {
		// Пролистывая 1600 пикселей появится стрелка
		if ($(this).scrollTop() > 1300) {
			// Указать класс ссылки, внутри которой находится изображение со стрелкой
			$('.up').fadeIn();
		} else {
			// Указать класс ссылки, внутри которой находится изображение со стрелкой
			$('.up').fadeOut();
		}
	});

    // Плавный скролл наверх
	$("a[href^='#']").click(function(){
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
    });
    
    
    // Ошибки для формы
	function valideForms(form){
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				text: {
					required: true,
					minlength: 5
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Пожалуйста введите не менее {0} символов")
				},
				phone: "Пожалуйста введите свой номер телефона",
				text: {
					required: "Пожалуйста, введите впорос",
					minlength: jQuery.validator.format("Пожалуйста введите не менее {0} символов")
				}
			}
		});
	};

    // Ошибки, которые применятся к формам, установить в html id
    valideForms('#form-2');
	valideForms('#form');
	valideForms('#application');

	// Модальные окна
	// Указать в html data-modal у нужных кнопок и указать класс ( $('[data-modal=application]') )
	$('[data-modal=application]').on('click', function() {
		// Затемненный задний фон, его класс ( $('.modal-forms__overlay, )
		// Кнопка при нажатии на которую будет появляться модальное окно ( #application').fadeIn(); )
		$('.modal-forms__overlay, #application').fadeIn('slow');
	});

	// Класс крестика ( $('.modal-forms__close') )
	$('.modal-forms__close').on('click', function() {
		// Будет закрываться то что не нужно ( $('.modal-forms__overlay, #application, #order, #thanks') )
		$('.modal-forms__overlay, #application, #thanks').fadeOut('slow');
	});

	var ua = navigator.userAgent;
	var isAndroid = /Android/i.test(ua);
	var isChrome = /Chrome/i.test(ua);

	// Fix masking on Chrome for mobile devices
	if (isAndroid && isChrome) {
		$('.price_input').attr('type','tel');
	}     
	$('input[name=phone]').mask("+7 (999) 999-99-99");

	// Отправка писем на почту
	// Обращение ко всем формам $('form').submit(function(e)
	$('form, form-2, application').submit(function(e) {
		// Отменяем стандартное поведение браузера e.preventDefault();
		e.preventDefault();
		$.ajax({
			// Указывем что будем отдавать данные type: "POST"
			type: "POST",
			// То, куда мы будем отправлять наш запрос url: "repository/Heart_Rate_Monitor/mailer"
			url: "mailer/smart.php",
			// Данные которые хочу отправить на сервер data: $(this).serialize()
			data: $(this).serialize()
		}).done(function() {
			// Находим то, что внутри нашей формы $(this).find("input")
			// Очищает формы после отправки .val("")
			$(this).find("input").val("");
			// Закрываем ненужные формы, для того чтоб потом высветилась форма благодарнсоти $('#application, #order').fadeOut();
			$('#application').fadeOut();
			// Появление затемненного экрана и окна благодарности, с медленной скоростью $('.modal-forms__overlay, #thanks').fadeIn('slow');
			$('.modal-forms__overlay, #thanks').fadeIn('slow');
			// Чтоб все формы очистились в конце $('form').trigger('reset');
			$('form, form-2').trigger('reset');
		});
		return false;
	});

});