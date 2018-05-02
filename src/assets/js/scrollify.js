const settings = {
  section : '.scroll-section',
  easing: 'easeOutExpo',
  scrollSpeed: 1000,
  offset : 0,
  scrollbars: true,
  setHeights: true,
  overflowScroll: true,
  updateHash: true,
  touchScroll: true,
  afterRender() {
    $('.scroll-section')
      .eq(0)
      .addClass('active');

    $('.pagination li')
      .eq(0)
      .addClass('active');
  },
  before(i, panels) {

    const ref = panels[i].attr('data-section-name');
    const classes = 'active previous next';

    $('.pagination .active')
       .removeClass('active');

    $('.pagination')
       .find(`a[href="#${ref}"]`)
       .addClass('active');

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


if($('body').hasClass('home') || $('body').hasClass('work')) {
  $.scrollify(settings);
}

$(document).on('homepageOnEnter workOnEnter', () => {
  paginationArrowsMove();
});

$(document).on('homepageOnEnterCompleted workOnEnterCompleted', () => {
  $.scrollify(settings);
});

//$(document).on('homepageOnLeaveCompleted workOnLeaveCompleted', () => {
//  $.scrollify.destroy();
//});





