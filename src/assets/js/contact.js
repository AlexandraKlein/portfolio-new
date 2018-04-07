var contact = function() {

  $document.on('contactOnEnter', function() {
    console.log('contactOnEnter');
  });

  $document.on('contactOnEnterCompleted', function() {
    console.log('contactOnEnterCompleted');
  });

  $document.on('contactOnLeave', function() {
    console.log('contactOnLeave');
  });

  $document.on('contactOnLeaveCompleted', function() {
    console.log('contactOnLeaveCompleted');
  });
};

$(function () {
  return contact();
});
