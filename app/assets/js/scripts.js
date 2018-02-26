'use strict';

var $document = $(document);
var $body = $('body');
var $barbaWrapper = $('#barba-wrapper');

var pageTransitions = function() {

  var Homepage = Barba.BaseView.extend({
    namespace: 'homepage',
    onEnter: function onEnter() {
      $document.trigger('homepageOnEnter');
      $body.addClass('home');
      $body.attr('id', 'home');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('homepageOnEnterCompleted');
      $body.removeClass().addClass('home');
    },
    onLeave: function onLeave() {
      $document.trigger('homepageOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('homepageOnLeaveCompleted');
    }
  });

  var Projects = Barba.BaseView.extend({
    namespace: 'projects',
    onEnter: function onEnter() {
      $document.trigger('projectsOnEnter');
      $body.addClass('projects');
      $body.attr('id', 'projects');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('projectsOnEnterCompleted');
      $body.removeClass().addClass('projects');
    },
    onLeave: function onLeave() {
      $document.trigger('projectsOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('projectsOnLeaveCompleted');
    }
  });

  var About = Barba.BaseView.extend({
    namespace: 'about',
    onEnter: function onEnter() {
      $document.trigger('aboutOnEnter');
      $body.addClass('about');
      $body.attr('id', 'about');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('aboutOnEnterCompleted');
      $body.removeClass().addClass('about');
    },
    onLeave: function onLeave() {
      $document.trigger('aboutOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('aboutOnLeaveCompleted');
    }
  });

  Homepage.init();
  Projects.init();
  About.init();

  Barba.Pjax.start();
  Barba.Prefetch.init();

  var speed = 750;

  var transition = Barba.BaseTransition.extend({
    start: function start() {
      Promise.all([this.newContainerLoading, this.transitionOut()]).then(this.transitionIn.bind(this));
    },
    transitionOut: function transitionOut() {
      var $elOld = $(this.oldContainer);

      $elOld.removeClass('transition-in').addClass('transition-out');

      setTimeout(function () {
        return $elOld.show().promise();
      }, speed);
    },
    transitionIn: function transitionIn() {
      var _this2 = this;

      var _this = this;
      var $elNew = $(this.newContainer);

      setTimeout(function () {
        $(_this2.oldContainer).hide();
        $(_this2.oldContainer).show();
        _this.done();
      }, speed);

      $elNew.css({
        visibility: 'visible'
      });

      $elNew.addClass('transition-in').removeClass('transition-out');
    }
  });

  Barba.Pjax.getTransition = function () {
    return transition;
  };

  Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus) {

    $($document).trigger('allPagesEnter');

    switch (true) {

      case oldStatus.namespace === 'projects' && currentStatus.namespace === 'projects':
        $barbaWrapper.addClass('tertiary-transition');
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, speed);
        break;

      case currentStatus.namespace === 'homepage':
        $barbaWrapper.removeClass('fade-in');
        setTimeout(function () {
          window.scrollTo(0, 0);
          $barbaWrapper.addClass('fade-in');
        }, speed);
        console.log('homepage');
        break;

      default:
        $barbaWrapper.removeClass();
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, speed);
    }
  });
};

$(function () {
  return pageTransitions();
});

var about = function() {

  $document.on('aboutOnEnter', function() {
    console.log('aboutOnEnter');
  });

  $document.on('aboutOnEnterCompleted', function() {
    console.log('aboutOnEnterCompleted');
  });

  $document.on('aboutOnLeave', function() {
    console.log('aboutOnLeave');
  });

  $document.on('aboutOnLeaveCompleted', function() {
    console.log('aboutOnLeaveCompleted');
  });
};

$(function () {
  return about();
});

function directionAwareButton() {
  $('.btn')
    .on('mouseenter', function(e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find('span').css({top:relY, left:relX})
    })
    .on('mouseout', function(e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find('span').css({top:relY, left:relX})
    });
}

directionAwareButton();

$($document).on('allPagesEnter', function() {
  directionAwareButton();
});

$(document).on('homepageOnEnterCompleted', function() {
  $('.carousel').slick({
    infinite: true,
    variableWidth: true,
    slidesToShow: 1,
    prevArrow: $('.arrow-prev'),
    nextArrow: $('.arrow-next')
  });

  $('.slick-active').addClass('active');
});

var homePage = function() {

  $document.on('homepageOnEnter', function() {
    console.log('homepageOnEnter');
  });

  $document.on('homepageOnEnterCompleted', function() {
    console.log('homepageOnEnterCompleted');
  });

  $document.on('homepageOnLeave', function() {
    console.log('homepageOnLeave');
  });

  $document.on('homepageOnLeaveCompleted', function() {
    console.log('homepageOnLeaveCompleted');
  });
};

$(function () {
  return homePage();
});

var $body = $('body');
var $navToggle = $('.nav');
var $navItem = $('nav ul li a');

$navToggle.on('click', function() {
  $(this).toggleClass('is-closed');

  if(!$(this).hasClass('is-closed')) {
    $body.addClass('is-open');
  } else {
    $body.removeClass('is-open');
  }
});

$navItem.on('click', function() {
  $navToggle.toggleClass('is-closed');
  if(!$navToggle.hasClass('is-closed')) {
    $body.addClass('is-open');
  } else {
    $body.removeClass('is-open');
  }
});

function parallax() {
  var $container = $('.devices');
  var $desktop = $('img.desktop');
  var $laptop = $('img.laptop');
  var $mobile = $('img.mobile');
  var container_w = $container.width();
  var container_h = $container.height();

  $(window).resize(function () {
    container_w = $container.width();
    container_h = $container.height();
  });

  $(window).on('mousemove deviceorientation', function (event) {
    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    var pos_x = isMobile ? Math.round(event.originalEvent.gamma * 50) : event.pageX;
    var pos_y = isMobile ? Math.round(event.originalEvent.beta * 50) : event.pageY;
    var left = container_w / 2 - pos_x;
    var top = container_h / 2 - pos_y;

    $('#deviceOrientation').text('gamma: ' + event.originalEvent.gamma + ' beta: ' + event.originalEvent.beta);

    function translateTween(args) {
      TweenLite.to(args.el, 1, {
        css: {
          transform: 'translateX(' + left / args.posLeft + 'px) translateY(' + top / args.posTop + 'px)'
        },
        ease: Expo.easeOut,
        overwrite: 'all'
      });
    }

    var parallaxPropsArray = [
      { el: $desktop, posLeft: 75, posTop: 35},
      { el: $laptop, posLeft: 45, posTop: 15},
      { el: $mobile, posLeft: 55, posTop: 25}
    ];

    for (var i = 0; i < parallaxPropsArray.length; i++) {
      translateTween(parallaxPropsArray[i]);
    }
  });
  //
  //var cursorOnDiv = false;
  //
  //$(document).on({
  //    mouseenter: function(){
  //      cursorOnDiv = true;
  //    },
  //    mouseleave: function(){
  //      cursorOnDiv = false;
  //    }
  //  },
  //  '.circle'
  //);
  //
  //$(document).mousemove(function(e) {
  //
  //  if (cursorOnDiv) {
  //    $('.custom-cursor').position({
  //      my: 'left center',
  //      of: e,
  //      collision: 'none'
  //    });
  //  }
  //
  //});
}

$(document).on('homepageOnEnterCompleted', function() {
  parallax();
});

var projects = function() {

  $document.on('projectsOnEnter', function() {
    console.log('projectsOnEnter');
  });

  $document.on('projectsOnEnterCompleted', function() {
    console.log('projectsOnEnterCompleted');
  });

  $document.on('projectsOnLeave', function() {
    console.log('projectsOnLeave');
  });

  $document.on('projectsOnLeaveCompleted', function() {
    console.log('projectsOnLeaveCompleted');
  });
};

$(function () {
  return projects();
});

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


if($('body').hasClass('home')) {
  $.scrollify(settings);
  window.scrollTo(0, 0);
  $.scrollify.move(0);
}

$(document).on('homepageOnEnter', function() {
  window.scrollTo(0, 0);
  $.scrollify.move(0);
  paginationArrowsMove();
});

$(document).on('homepageOnEnterCompleted', function() {
  $.scrollify(settings);
});

$(document).on('homepageOnLeaveCompleted', function() {
  $.scrollify.destroy();
});



var morphEls = function() {
  function snapMorphHover(args) {
    var s = Snap(args.el);
    var path = s.select('path');

    var pathConfig = {
      toSpeed: args.toSpeed,
      fromSpeed: args.fromSpeed,
      from: path.attr('d'),
      to: args.el.getAttribute('data-morph-active')
    };

    args.el.addEventListener('mouseover', function () {
      path.animate({ 'path': pathConfig.to }, pathConfig.toSpeed, args.easeIn);
    });

    args.el.addEventListener('mouseout', function () {
      path.animate({ 'path': pathConfig.from }, pathConfig.fromSpeed, args.easeOut);
    });
  }

  var snapEls = [
    {el: document.querySelector('.arrow-up'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500},
    {el: document.querySelector('.arrow-down'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500},
    {el: document.querySelector('.arrow-next'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500},
    {el: document.querySelector('.arrow-prev'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500}
  ];

  for (var i=0; i<snapEls.length; i++) {
    snapMorphHover(snapEls[i]);
  }
};

if ($('body').hasClass('home')) {
  morphEls();
}

$(document).on('homepageOnEnter', function() {
  morphEls();
});
