var bod = $('body');
var tog = $('.nav');

tog.on("click", function() {
  $(this).toggleClass('is-closed');
  if(!$(this).hasClass('is-closed')) {
    bod.addClass('is-open');
  } else {
    bod.removeClass('is-open');
  }
});
