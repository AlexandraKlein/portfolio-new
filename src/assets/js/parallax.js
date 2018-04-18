function parallax() {
  const $container = $('.devices');
  const $desktop = $('img.desktop');
  const $laptop = $('img.laptop');
  const $mobile = $('img.mobile');
  let container_w = $container.width();
  let container_h = $container.height();

  $(window).resize(() => {
    container_w = $container.width();
    container_h = $container.height();
  });

  $(window).on('mousemove deviceorientation', event => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const pos_x = isMobile ? Math.round(event.originalEvent.gamma * 10) : event.pageX;
    const pos_y = isMobile ? Math.round(event.originalEvent.beta * 10) : event.pageY;
    const left = container_w / 2 - pos_x;
    const top = container_h / 2 - pos_y;

    $('#deviceOrientation').text(`gamma: ${event.originalEvent.gamma} beta: ${event.originalEvent.beta}`);

    function translateTween(args) {
      TweenLite.to(args.el, 1, {
        css: {
          transform: `translateX(${left / args.posLeft}px) translateY(${top / args.posTop}px)`
        },
        ease: Expo.easeOut,
        overwrite: 'all'
      });
    }

    const parallaxPropsArray = [
      { el: $desktop, posLeft: 75, posTop: 35},
      { el: $laptop, posLeft: 45, posTop: 15},
      { el: $mobile, posLeft: 55, posTop: 25}
    ];

    for (let i = 0; i < parallaxPropsArray.length; i++) {
      translateTween(parallaxPropsArray[i]);
    }
  });
}

$(document).on('homepageOnEnterCompleted', () => {
  parallax();
});
