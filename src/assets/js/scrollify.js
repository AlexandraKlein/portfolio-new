const settings = {
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
  before(i, panels) {

    const ref = panels[i].attr('data-section-name');
    const classes = 'active previous next';

    $('.pagination .active').removeClass('active');
    $('.pagination').find(`a[href="#${ref}"]`).addClass('active');

    function removeAddClasses(args) {
      args.el.removeClass(classes)
        .addClass(args.classToAdd)
        .siblings('.scroll-section')
        .removeClass(args.classToAdd);
    }

    const removeAddClassesArray = [
      { el: $('.scroll-section').eq(i), classToAdd: 'active'},
      { el: $('.scroll-section').eq(i - 1), classToAdd: 'previous'},
      { el: $('.scroll-section').eq(i + 1), classToAdd: 'next'}
    ];

    for (let index = 0; index < removeAddClassesArray.length; index++) {
      removeAddClasses(removeAddClassesArray[index]);
    }

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

  $('.pagination a').toArray().forEach((el, i) => {
    const $el = $(el);
    $el.click(e => {
      e.preventDefault();
      $.scrollify.move(i);
    });
  });

  $('.arrow-down').click(() => {
    $.scrollify.next();
  });

  $('.arrow-up').click(() => {
    $.scrollify.previous();
  });
}


if($('body').hasClass('home')) {
  $.scrollify(settings);
  window.scrollTo(0, 0);
  $.scrollify.move(0);
}

$(document).on('homepageOnEnter', () => {
  window.scrollTo(0, 0);
  $.scrollify.move(0);
  paginationArrowsMove();
});

$(document).on('homepageOnEnterCompleted', () => {
  $.scrollify(settings);
});

$(document).on('homepageOnLeaveCompleted', () => {
  $.scrollify.destroy();
});

