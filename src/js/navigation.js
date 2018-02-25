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
