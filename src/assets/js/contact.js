const contact = () => {

  $document.on('contactOnEnter', () => {
    console.log('contactOnEnter');
  });

  $document.on('contactOnEnterCompleted', () => {
    console.log('contactOnEnterCompleted');
  });

  $document.on('contactOnLeave', () => {
    console.log('contactOnLeave');
  });

  $document.on('contactOnLeaveCompleted', () => {
    console.log('contactOnLeaveCompleted');
  });
};

$(() => contact());
