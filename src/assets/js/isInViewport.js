$.fn.isOnScreen = function () {
  var viewport = {
    top: $(window).scrollTop()
  };

  viewport.bottom = viewport.top + $(window).height();

  var bounds = this.offset();
  bounds.bottom = this.offset().top + this.outerHeight();

  return !(viewport.bottom < bounds.top || viewport.top > bounds.bottom);
};

$(window).on('scroll', function () {

  $('.project .img').each(function () {
    $(this).isOnScreen() === true ? $(this).addClass('in-viewport') : $(this).removeClass('in-viewport');
  });
});
