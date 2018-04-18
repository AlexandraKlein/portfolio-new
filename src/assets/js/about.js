const about = () => {

  $document.on('aboutOnEnter', () => {
    console.log('aboutOnEnter');
  });

  $document.on('aboutOnEnterCompleted', () => {
    console.log('aboutOnEnterCompleted');
  });

  $document.on('aboutOnLeave', () => {
    console.log('aboutOnLeave');
  });

  $document.on('aboutOnLeaveCompleted', () => {
    console.log('aboutOnLeaveCompleted');
  });
};

$(() => about());
