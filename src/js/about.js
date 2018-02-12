'use strict';

var $document = $(document);

var about = function() {

  $document.on('aboutOnEnter', function() {
    console.log('aboutOnEnter');
  });

  $document.on('aboutOnEnterCompleted', function() {
    console.log('aboutOnEnterCompleted');
  });

  $document.on('aboutOnLeave', function() {
    console.log('aboutOnLeave');
  });

  $document.on('aboutOnLeaveCompleted', function() {
    console.log('aboutOnLeaveCompleted');
  });
};

$(function () {
  return about();
});
