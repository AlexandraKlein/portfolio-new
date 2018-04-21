$.fn.isOnScreen = function () {
  const viewport = {
    top: $(window).scrollTop()
  };

  viewport.bottom = viewport.top + $(window).height();

  const bounds = this.offset();
  bounds.bottom = this.offset().top + this.outerHeight();

  return !(viewport.bottom < bounds.top || viewport.top > bounds.bottom);
};

$(window).on('scroll', () => {

  $('.project .img').toArray().forEach(el => {
    const $el = $(el);
    $el.isOnScreen() === true ? $el.addClass('in-viewport') :$el.removeClass('in-viewport');
  });
});
