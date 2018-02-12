var projects = function() {

  $document.on('projectsOnEnter', function() {
    console.log('projectsOnEnter');
  });

  $document.on('projectsOnEnterCompleted', function() {
    console.log('projectsOnEnterCompleted');
  });

  $document.on('projectsOnLeave', function() {
    console.log('projectsOnLeave');
  });

  $document.on('projectsOnLeaveCompleted', function() {
    console.log('projectsOnLeaveCompleted');
  });
};

$(function () {
  return projects();
});
