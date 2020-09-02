var myScroll;
var pageY;
var isMobile = $(window).outerWidth() < 768;
var mobileSliders = [];
var isHandheld = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function initScrollbar() {
  myScroll = new IScroll('#body', {
    bounce: true,
    mouseWheel: true,
    scrollbars: true,
    probeType: 2,
    disablePointer: true,
    scrollY: true,
    scrollX: false,
    useTransition: true,
    interactiveScrollbars: true,
  });
}

function addActiveSection() {
  window.addEventListener('scroll', function () {
    var windowY = window.scrollY;

    if (windowY > 200) {
      $('header').addClass('scrolled');
    } else {
      $('header').removeClass('scrolled');
    }

    $('main > section').each(function () {
      var $section = $(this);
      var thisOT = $(this).position().top;
      var thisOH = $(this).outerHeight();

      if (thisOT <= windowY + 500 && thisOT + thisOH - 200 > windowY) {
        $section.addClass('is-active');
      } else {
        $section.removeClass('is-active');
      }
    });
  });
}

function parallaxInit() {
  $('[parallax-text]').each(function () {
    var $this = $(this);
    var thisVal = $this.text().trim();
    var arr = thisVal.split('');
    $this.text('');

    arr.forEach(e => {
      $this.append(`<span parallax-elem>${e}</span>`);
    });
  });

  myScroll.on('scroll', function () {
    var windowHeight = $(window).height();
    var windowY = -myScroll.y;

    if (windowY > 200) {
      $('header').addClass('scrolled');
    } else {
      $('header').removeClass('scrolled');
    }

    $('main > section').each(function () {
      var $section = $(this);
      var thisOT = $(this).position().top;
      var thisOH = $(this).outerHeight();

      if (thisOT <= windowY + 500 && thisOT + thisOH - 200 > windowY) {
        $section.addClass('is-active');
      } else {
        $section.removeClass('is-active');
      }
    });

    $('.parallax-image').each(function () {
      var $this = $(this);
      var thisH = $this.outerHeight();
      var thisParentTop = $this.closest('section').position().top;

      var transformVal = 'translate3d(0,' + (-thisH - (thisParentTop - windowHeight - windowY)) / 2 + 'px, 0)';

      $this.attr('style', `transform:${transformVal}`);
    });

    $('[parallax-elem]').each(function (idx, e) {
      var $this = $(this);
      var thisH = $this.outerHeight();

      if ($this.closest('section').hasClass('is-active')) {
        var val = -($(window).outerWidth() / 14) + (windowY - ($this.closest('section').outerHeight() - thisH / 1.3)) / 5.2;
        var transformVal;

        transformVal = `translateY(${val}px)`;
        $this.attr('style', `transform:${transformVal}`);
      }
    });
  });
}

function initTextAnim() {
  $('[text-anim]').each(function (idx) {
    var thisHtml = $(this)[0].outerHTML;
    $(`<span class="text-anim-span">${thisHtml}</span>`).insertBefore($(this));

    $(this).remove();
  });
}

function imageAnimsInit() {
  $('[data-anim-type="ltr"]').each(function () {
    $(this).append("<div class='img-cover'></div>");
  });
}

function initMobileSwipers() {
  $('.mobile-sliders').each(function () {
    var $this = $(this);

    $this.addClass('slider-container');
    $this.find('> *').addClass('slider-wrapper');
    $this.find('> * > *').addClass('slider-slide');

    var config = {
      slidesPerView: 1,
      spaceBetween: 15,
      containerModifierClass: 'slider-container--',
      wrapperClass: 'slider-wrapper',
      slideClass: 'slider-slide',
      slideActiveClass: 'slider-slide--active',
      slideNextClass: 'slider-slide--next',
      slidePrevClass: 'slider-slide--prev',
    };

    var slider = new Swiper('.slider-container', config);

    mobileSliders.push(slider);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  initTextAnim();
  imageAnimsInit();

  if (!isMobile) {
    initScrollbar();
    parallaxInit();

    $('.menu-trigger-button').on('click', function () {
      $(this).parent().toggleClass('is-active');
    });
  } else {
    addActiveSection();
    initMobileSwipers();
  }
});
