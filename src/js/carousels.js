$(document).on('homepageOnEnterCompleted', function() {
  $('.carousel').slick({
    infinite: true,
    variableWidth: true,
    slidesToShow: 1,
    prevArrow: $('.prev'),
    nextArrow: $('.next')
  });

  $('.btn').click(function() {
    $(this).closest('.circle').addClass('active');
  })
});
