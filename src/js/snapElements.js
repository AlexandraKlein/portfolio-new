var morphEls = function() {
  function snapMorphHover(args) {
    var s = Snap(args.el);
    var path = s.select('path');

    var pathConfig = {
      toSpeed: 300,
      fromSpeed: 1500,
      from: path.attr('d'),
      to: args.el.getAttribute('data-morph-active')
    };

    args.el.addEventListener('mouseover', function () {
      path.animate({ 'path': pathConfig.to }, pathConfig.toSpeed, mina.easein);
    });

    args.el.addEventListener('mouseout', function () {
      path.animate({ 'path': pathConfig.from }, pathConfig.fromSpeed, mina.elastic);
    });
  }

  var snapEls = [
    {el: document.querySelector('.arrow-up')},
    {el: document.querySelector('.arrow-down')},
    {el: document.querySelector('.arrow-next')},
    {el: document.querySelector('.arrow-prev')}
  ];

  for (var i=0; i<snapEls.length; i++) {
    snapMorphHover(snapEls[i]);
  }
};

morphEls();

$(document).on('homepageOnEnter', function() {
  morphEls();
});
