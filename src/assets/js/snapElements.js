const morphEls = () => {
  function snapMorphHover(args) {
    const s = Snap(args.el);
    const path = s.select('path');

    const pathConfig = {
      toSpeed: args.toSpeed,
      fromSpeed: args.fromSpeed,
      from: path.attr('d'),
      to: args.el.getAttribute('data-morph-active')
    };

    args.el.addEventListener('mouseover', () => {
      path.animate({ 'path': pathConfig.to }, pathConfig.toSpeed, args.easeIn);
    });

    args.el.addEventListener('mouseout', () => {
      path.animate({ 'path': pathConfig.from }, pathConfig.fromSpeed, args.easeOut);
    });
  }

  const snapEls = [
    {el: document.querySelector('.arrow-up'), easeIn: mina.easein, easeOut: mina.easeout, toSpeed: 300, fromSpeed: 150},
    {el: document.querySelector('.arrow-down'), easeIn: mina.easein, easeOut: mina.easeout, toSpeed: 300, fromSpeed: 150},
    {el: document.querySelector('.arrow-next'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500},
    {el: document.querySelector('.arrow-prev'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500}
  ];

  for (let i=0; i<snapEls.length; i++) {
    snapMorphHover(snapEls[i]);
  }
};

if ($('body').hasClass('home')) {
  morphEls();
}

$(document).on('homepageOnEnter', () => {
  morphEls();
});