var morphEls = function() {
  function snapMorphHover(args) {
    var s = Snap(args.target);
    var path = s.select('path');

    var pathConfig = {
      toSpeed: 300,
      fromSpeed: 1500,
      from: path.attr('d'),
      to: args.target.getAttribute('data-morph-active')
    };

    args.target.addEventListener('mouseenter', function () {
      path.animate({ 'path': pathConfig.to }, pathConfig.toSpeed, mina.easein);
    });

    args.target.addEventListener('mouseleave', function () {
      path.animate({ 'path': pathConfig.from }, pathConfig.fromSpeed, mina.elastic);

    });
  }

  var snapEls = [
    {target: document.querySelector('.arrow-up')},
    {target: document.querySelector('.arrow-down')},
    {target: document.querySelector('.arrow-next')},
    {target: document.querySelector('.arrow-prev')}
  ];

  for (var i=0; i<snapEls.length; i++) {
    snapMorphHover(snapEls[i]);
  }
};

morphEls();

$(document).on('homepageOnEnter', function() {
  morphEls();
});
