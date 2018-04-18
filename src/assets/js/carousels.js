$(document).on('homepageOnEnterCompleted', () => {
  $('.carousel').slick({
    infinite: true,
    variableWidth: true,
    slidesToShow: 1,
    prevArrow: $('.arrow-prev'),
    nextArrow: $('.arrow-next')
  });

  $('.slick-active').addClass('active');

  $('.carousel').on('afterChange', function() {
    $(this).find('.slide.slick-active').addClass('animate')
      .siblings().removeClass('animate');
  });

  $('.carousel .slick-active').addClass('animate');

});
