const homePage = () => {

  $document.on('homepageOnEnter', () => {
    console.log('homepageOnEnter');
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
