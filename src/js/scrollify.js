var settings = {
  section : '.scroll-section',
  easing: 'easeOutExpo',
  scrollSpeed: 1000,
  offset : 0,
  standardScrollElements: 'body:not(.home)',
  scrollbars: true,
  setHeights: true,
  overflowScroll: true,
  updateHash: false,
  touchScroll: true,
  before:function(i, panels) {
    $('.scroll-section').eq(i)
      .removeClass('active previous next')
      .addClass('active')
      .siblings('.scroll-section')
      .removeClass('active');

    $('.scroll-section').eq(i - 1)
      .removeClass('active previous next')
      .addClass('previous')
      .siblings('.scroll-section')
      .removeClass('previous');

    $('.scroll-section').eq(i + 1)
      .removeClass('active previous next')
      .addClass('next')
      .siblings('.scroll-section')
      .removeClass('next');
  }
};

if($('body').hasClass('home')) {
  $.scrollify(settings);
}

$(document).on('homepageOnEnterCompleted', function() {
  $.scrollify(settings);
});

$(document).on('homepageOnLeaveCompleted', function() {
  $.scrollify.destroy();
});


