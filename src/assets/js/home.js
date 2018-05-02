const homePage = () => {

  function landingPageIntroAnimation() {
    $('section.intro').addClass('landing-animation');

    setTimeout(() => {
      $('section.intro').removeClass('landing-animation');
    }, 2000);

    console.warn('landing animation')
  }

  if ($('body').hasClass('home')) {
    landingPageIntroAnimation();
  }

  $document.on('homepageOnEnter', () => {
    console.log('homepageOnEnter');
    landingPageIntroAnimation();
  });

  $document.on('homepageOnEnterCompleted', () => {
    console.log('homepageOnEnterCompleted');
  });

  $document.on('homepageOnLeave', () => {
    console.log('homepageOnLeave');
  });

  $document.on('homepageOnLeaveCompleted', () => {
    console.log('homepageOnLeaveCompleted');
  });
};

$(document).on('homepageEnterComplete', ()=> {
  $(() => homePage());
});

$(() => homePage());
