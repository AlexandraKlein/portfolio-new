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

    var ref = panels[i].attr('data-section-name');
    $('.pagination .active').removeClass('active');
    $('.pagination').find('a[href="#' + ref + '"]').addClass('active');

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

    if (i === panels.length - 1) {
      $('.arrow-down').addClass('disabled');
    } else if (i === 0) {
      $('.arrow-up').addClass('disabled');
    } else {
      $('.arrow-up, .arrow-down').removeClass('disabled');
    }
  }
};

function paginationArrowsMove() {
  $('.pagination a').each(function (i) {
    $(this).click(function (e) {
      e.preventDefault();
      $.scrollify.move(i);
    });
  });

  $('.arrow-down').click(function () {
    $.scrollify.next();
  });

  $('.arrow-up').click(function () {
    $.scrollify.previous();
  });
}

paginationArrowsMove();

if($('body').hasClass('home')) {
  $.scrollify(settings);
  $.scrollify.move(0);
  window.scrollTo(0, 0);
}

$(document).on('homepageOnEnter', function() {
  window.scrollTo(0, 0);
  $.scrollify.move(0);
});

$(document).on('homepageOnEnterCompleted', function() {
  $.scrollify(settings);
  paginationArrowsMove();
});

$(document).on('homepageOnLeaveCompleted', function() {
  $.scrollify.destroy();
});


