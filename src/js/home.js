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
