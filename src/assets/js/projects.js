const projects = () => {

  $document.on('projectsOnEnter', () => {
    console.log('projectsOnEnter');
  });

  $document.on('projectsOnEnterCompleted', () => {
    console.log('projectsOnEnterCompleted');
  });

  $document.on('projectsOnLeave', () => {
    console.log('projectsOnLeave');
  });

  $document.on('projectsOnLeaveCompleted', () => {
    console.log('projectsOnLeaveCompleted');
  });
};

$(() => projects());
