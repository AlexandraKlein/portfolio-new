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

var slickOptions = {
  infinite: true,
  variableWidth: true,
  slidesToShow: 1
};

$(document).on('homepageOnEnterCompleted', function() {
  $('.carousel').slick(slickOptions);

  console.log('should slick')
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
  before:function(index) {
    $('.scroll-section').eq(index)
      .removeClass('active previous next')
      .addClass('active')
      .siblings('.scroll-section')
      .removeClass('active');

    $('.scroll-section').eq(index - 1)
      .removeClass('active previous next')
      .addClass('previous')
      .siblings('.scroll-section')
      .removeClass('previous');

    $('.scroll-section').eq(index + 1)
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


