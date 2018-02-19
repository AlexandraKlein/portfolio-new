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
