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
    {el: document.querySelector('.arrow-up'), easeIn: mina.easein, easeOut: mina.easeout, toSpeed: 300, fromSpeed: 150},
    {el: document.querySelector('.arrow-down'), easeIn: mina.easein, easeOut: mina.easeout, toSpeed: 300, fromSpeed: 150},
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
