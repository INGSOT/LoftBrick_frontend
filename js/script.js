
if ($(window).width() <= 1125) {

  $('#header .layer1 .burger').click(function () {
    $('#header .layer2').addClass('on');
  })

  $('#header .layer2 .head .close').click(function () {
    $('#header .layer2').removeClass('on');
  })

}

$('#header .layer2 .header_catalog .open').click(function () {
  $(this).closest('.header_catalog').toggleClass('on');
});

$(document).ready(function () {
  $(document).on('click', function (e) {
    // якщо клік був не всередині .cont
    if (!$(e.target).closest('#header .layer2 .header_catalog').length) {
      $('#header .layer2 .header_catalog').removeClass('on');
    }
  });
});

//!Мейн слайдер
$(document).ready(function () {
  const $slider = $('#main_banner .big_slider').slick({
    dots: false,
    arrows: true,
    slidesToScroll: 1,
    touchThreshold: 100,
    swipeToSlide: true,
    lazyLoad: 'ondemand',
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    infinite: false,
    prevArrow: $('#main_banner .big_slider_nav .arrows .prev'),
    nextArrow: $('#main_banner .big_slider_nav .arrows .next'),
  });

  function formatNumber(num) {
    return num < 10 ? '0' + num : num;
  }

  // Після ініціалізації слайдера отримуємо кількість слайдів і оновлюємо загальну кількість
  $slider.on('init', function (event, slick) {
    const totalSlides = slick.slideCount;
    $('#totalSlides').text(formatNumber(totalSlides));
  });

  // Викликаємо `init` вручну, щоб вона спрацювала
  $slider.slick('setPosition');

  // Оновлення поточного слайда при зміні слайдів
  $slider.on('afterChange', function (event, slick, currentSlide) {
    $('#currentSlide').text(formatNumber(currentSlide + 1));
  });

  // Для надійності також отримуємо кількість слайдів після створення слайдера
  const slickInstance = $slider.slick('getSlick');
  $('#totalSlides').text(formatNumber(slickInstance.slideCount));
});

$('#advantages .cont .item').click(function () {
  $('#advantages .cont .item').not(this).removeClass('on');
  $('#advantages .cont .item').not(this).find('.drop').slideUp(500);
  $(this).toggleClass('on');
  $(this).find('.drop').slideToggle(500);
})

$('.goods_block .item .to_cart').click(function (e) {
  e.preventDefault();
})

$('#new_projects .cont .item .box').click(function () {
  const $item = $(this).closest('.item'); // Знаходимо найближчий .item
  // Закриваємо інші елементи
  $('#new_projects .cont .item').not($item).removeClass('on');
  $('#new_projects .cont .item').not($item).find('.drop').slideUp(300);

  // Відкриваємо або закриваємо поточний елемент
  $item.toggleClass('on');
  $item.find('.drop').slideToggle(500, function () {
    // Перевірка, чи ініціалізовано слайдер, перед викликом setPosition
    if ($(this).is(':visible') && $(window).width() <= 768) {
      if ($(this).find('.slider').hasClass('slick-initialized')) {
        $(this).find('.slider').slick('setPosition');
      }
    }
  });
});

$(document).ready(function () {
  // Функція для ініціалізації або знищення слайдера
  function initializeSlick() {
    if ($(window).width() <= 768) {
      if (!$('#new_projects .cont .item .drop .slider').hasClass('slick-initialized')) {
        $('#new_projects .cont .item .drop .slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        });
      }
    } else {
      if ($('#new_projects .cont .item .drop .slider').hasClass('slick-initialized')) {
        $('#new_projects .cont .item .drop .slider').slick('unslick'); // Знищити слайдер на великих екранах
      }
    }
  }

  // Виклик функції при завантаженні сторінки
  initializeSlick();

  // Виклик функції при зміні розміру вікна
  $(window).on('resize', function () {
    initializeSlick();
  });
});

$('#gallery .cont .left .info_slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  fade: true,
  asNavFor: '#gallery .cont .right .slider',
  prevArrow: $('#gallery .cont .left .control button:nth-of-type(1)'),
  nextArrow: $('#gallery .cont .left .control button:nth-of-type(2)'),
});

$('#gallery .cont .right .slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  fade: true,
  asNavFor: '#gallery .cont .left .info_slider',
  prevArrow: $('#gallery .cont .left .control button:nth-of-type(1)'),
  nextArrow: $('#gallery .cont .left .control button:nth-of-type(2)'),
  appendDots: $('#gallery .cont .right .dots'),
});

$('#filters_box .filters_btn').click(function () {
  $(this).toggleClass('on').closest('.head').siblings('.drop_filters').slideToggle(300);
})

$('#filters_box .filters .item button').click(function () {
  $(this).toggleClass('on').siblings('.drop').slideToggle(500);
})


const materialActiveItem = document.querySelector('#category_page .material a.on');

// Прокручуємо контейнер до активного елемента
if (materialActiveItem) {
  materialActiveItem.scrollIntoView({
    behavior: 'smooth', // Плавна прокрутка
    inline: 'center',   // Вирівнювання елемента по центру
  });
}

$('.frequently_questions .item').click(function () {
  $(this).toggleClass('on').find('.drop').slideToggle(300);
})

$(document).ready(function () {
  if ($('#product .big .img').length > 1) {
    $('#product .big').slick({
      dots: false,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 100,
      swipeToSlide: true,
      lazyLoad: 'ondemand',
      fade: true,
      infinite: true,
    });
  }
});

document.querySelectorAll('#product .small .img img').forEach((smallImg, index) => {
  smallImg.addEventListener('click', () => {
    $('#product .big').slick('slickGoTo', index);

    // Додаємо клас .on та знімаємо з інших
    document.querySelectorAll('#product .small .img').forEach(img => img.classList.remove('on'));
    smallImg.parentElement.classList.add('on');

    // Прокручування до початку контейнера
    smallImg.parentElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  });
});

$('#product .big').on('afterChange', function (event, slick, currentSlide) {
  const smallImages = document.querySelectorAll('#product .small .img');

  // Додаємо клас .on та знімаємо з інших
  smallImages.forEach(img => img.classList.remove('on'));
  smallImages[currentSlide].classList.add('on');

  // Прокручування до відповідного маленького зображення
  smallImages[currentSlide].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
});

document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('#product .small .prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      $('.big').slick('slickPrev'); // Переміщуємо слайдер назад
      syncSmallSlider(-1);          // Синхронізуємо малий слайдер
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.querySelector('#product .small .next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      $('.big').slick('slickNext'); // Переміщуємо слайдер вперед
      syncSmallSlider(1);           // Синхронізуємо малий слайдер
    });
  }
});


function syncSmallSlider(direction) {
  const active = document.querySelector('#product .small .img.on');
  if (!active) return;

  let nextEl = direction === 1 ? active.nextElementSibling : active.previousElementSibling;

  if (nextEl && nextEl.classList.contains('img')) {
    document.querySelectorAll('#product .small .img').forEach(img => img.classList.remove('on'));
    nextEl.classList.add('on');

    nextEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }
};

function updateSliderControls() {
  const slider = document.querySelector("#product .small .slider");
  const images = document.querySelectorAll("#product .small .slider .img");
  const prevButton = document.querySelector("#product .small .prev");
  const nextButton = document.querySelector("#product .small .next");

  // якщо немає слайдера або кнопок — вихід
  if (!slider || !prevButton || !nextButton) return;

  let totalWidth = 0;

  images.forEach((img, index) => {
    if (img) {
      totalWidth += img.offsetWidth + (index > 0 ? 10 : 0);
    }
  });

  if (totalWidth <= slider.offsetWidth) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  } else {
    prevButton.style.display = "";
    nextButton.style.display = "";
  }
}

// викликати після завантаження DOM
document.addEventListener('DOMContentLoaded', updateSliderControls);

// Запускаємо перевірку під час зміни розміру вікна
window.addEventListener("resize", updateSliderControls);


$(document).ready(function () {
  $('#product .big .img').click(function () {
    $(this).closest('.md').addClass('on');
    $("#product .big").slick("slickSetOption", {}, true);
  })
});

$(document).ready(function () {
  $("#product .md").click(function (e) {
    if (!$(e.target).closest(".big").length) {
      $(this).removeClass("on");
      $("#product .big").slick("slickSetOption", {}, true);
    }
  });
});

// $('#product .info .text button').click(function () {
//   let buttonName = $(this).html();
//   if (buttonName === 'ПОКАЗАТИ ВСЕ') {
//     $(this).html('ЗВЕРНУТИ')
//   }
//   else {
//     $(this).html('ПОКАЗАТИ ВСЕ')
//   }
//   $(this).siblings('p').toggleClass('on');
// })

$('#product .info .wtf_box .item').click(function () {
  $('#product .info .wtf_box .item').not(this).removeClass('on');
  $('#product .info .wtf_box .item').not(this).find('.drop').slideUp(500);
  $(this).toggleClass('on');
  $(this).find('.drop').slideToggle(500);
})

$('.size button').click(function () {
  let buttons = $(this).closest('.size');
  buttons.find('button').removeClass('on');
  $(this).addClass('on');
})

$('.free_sample button').click(function () {
  $('#modal').addClass('on');
})

$('#modal .head button').click(function () {
  $('#modal').removeClass('on');
})

$(document).mouseup(function (e) {
  if ($('#modal').has(e.target).length === 0) {
    $('#modal').removeClass('on');
  }
});

$(document).ready(function () {
  $("#modal .cont .body .file_label input").change(function () {
    const fileName = $(this).val().split("\\").pop(); // Отримуємо ім'я файлу
    if (fileName) {
      $("#modal .cont .body .file_label .file_name").text(fileName); // Показуємо ім'я файлу
    } else {
      $("#modal .cont .body .file_label .file_name").text("Файл не обрано"); // Якщо скасовано вибір
    }
  });
});

$('#design nav button').click(function () {
  $('#design nav button').removeClass('on');
  $(this).addClass('on');
});


$(document).ready(function () {
  if ($(window).width() > 550) {
    $('.v3 img').on('click', function () {
      const images = $('.v3 img');
      const clickedIndex = images.index(this);

      if (images.length > 1) {
        $('.imgs_slider').remove();
        $('.v3').after('<div class="imgs_slider"><div class="slider"></div></div>');

        images.each(function (index, img) {
          $('.imgs_slider .slider').append('<div></div>');
          $('.imgs_slider .slider div').last().append($(img).clone());
        });

        $('.imgs_slider .slider').slick({
          initialSlide: clickedIndex,
          dots: false,
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          touchThreshold: 100,
          swipeToSlide: true,
          infinite: true,
          adaptiveHeight: true,
        });

        $('.imgs_slider').on('click', function (e) {
          if (
            !$(e.target).closest('.slick-slide').length &&
            !$(e.target).closest('.slick-prev').length &&
            !$(e.target).closest('.slick-next').length
          ) {
            $('.imgs_slider .slider').slick('unslick');
            $('.imgs_slider').remove();
          }
        });

        // Обробка натискання клавіші Esc
        $(document).on('keydown', function (e) {
          if (e.key === 'Escape') {
            $('.imgs_slider .slider').slick('unslick');
            $('.imgs_slider').remove();
          }
        });
      }
    });
  }
});





