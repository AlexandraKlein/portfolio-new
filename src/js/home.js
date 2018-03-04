var homePage = function() {

  function landingPageIntroAnimation() {
    $('section.intro').addClass('landing-animation');

    setTimeout(function() {
      $('section.intro').removeClass('landing-animation');
    }, 2000)
  }

  landingPageIntroAnimation();

  $document.on('homepageOnEnter', function() {
    console.log('homepageOnEnter');
    landingPageIntroAnimation();
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


if ($('body').hasClass('home')) {
  $(function () {
    return homePage();
  });
}
