const work = () => {

  $document.on('workOnEnter', () => {
    console.log('workOnEnter');
  });

  $document.on('workOnEnterCompleted', () => {
    console.log('workOnEnterCompleted');
  });

  $document.on('workOnLeave', () => {
    console.log('workOnLeave');
  });

  $document.on('workOnLeaveCompleted', () => {
    console.log('workOnLeaveCompleted');
  });
};

$(() => work());
