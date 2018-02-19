var slickOptions = {
  infinite: true,
  variableWidth: true,
  slidesToShow: 1
};

$(document).on('homepageOnEnterCompleted', function() {
  $('.carousel').slick(slickOptions);
});
