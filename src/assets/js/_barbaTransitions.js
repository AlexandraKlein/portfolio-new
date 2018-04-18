const $document = $(document);
const $body = $('body');
const $barbaWrapper = $('#barba-wrapper');

const pageTransitions = () => {

  const Homepage = Barba.BaseView.extend({
    namespace: 'home',
    onEnter: function onEnter() {
      $document.trigger('homepageOnEnter');
      $body.addClass('home');
      $body.attr('id', 'home');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('homepageOnEnterCompleted');
      $body.removeClass().addClass('home');
    },
    onLeave: function onLeave() {
      $document.trigger('homepageOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('homepageOnLeaveCompleted');
    }
  });

  const Projects = Barba.BaseView.extend({
    namespace: 'projects',
    onEnter: function onEnter() {
      $document.trigger('projectsOnEnter');
      $body.addClass('projects');
      $body.attr('id', 'projects');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('projectsOnEnterCompleted');
      $body.removeClass().addClass('projects');
    },
    onLeave: function onLeave() {
      $document.trigger('projectsOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('projectsOnLeaveCompleted');
    }
  });

  const About = Barba.BaseView.extend({
    namespace: 'about',
    onEnter: function onEnter() {
      $document.trigger('aboutOnEnter');
      $body.addClass('about');
      $body.attr('id', 'about');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('aboutOnEnterCompleted');
      $body.removeClass().addClass('about');
    },
    onLeave: function onLeave() {
      $document.trigger('aboutOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('aboutOnLeaveCompleted');
    }
  });

  const Contact = Barba.BaseView.extend({
    namespace: 'contact',
    onEnter: function onEnter() {
      $document.trigger('contactOnEnter');
      $body.addClass('contact');
      $body.attr('id', 'contact');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('contactOnEnterCompleted');
      $body.removeClass().addClass('contact');
    },
    onLeave: function onLeave() {
      $document.trigger('contactOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('contactOnLeaveCompleted');
    }
  });

  Homepage.init();
  Projects.init();
  About.init();
  Contact.init();

  Barba.Pjax.start();
  Barba.Prefetch.init();

  const speed = 750;

  const transition = Barba.BaseTransition.extend({
    start: function start() {
      Promise.all([this.newContainerLoading, this.transitionOut()]).then(this.transitionIn.bind(this));
    },
    transitionOut: function transitionOut() {
      const $elOld = $(this.oldContainer);

      $elOld.removeClass('transition-in').addClass('transition-out');

      setTimeout(() => $elOld.show().promise(), speed);
    },
    transitionIn: function transitionIn() {
      const _this2 = this;

      const _this = this;
      const $elNew = $(this.newContainer);

      setTimeout(() => {
        $(_this2.oldContainer).hide();
        $(_this2.oldContainer).show();
        _this.done();
      }, speed);

      $elNew.css({
        visibility: 'visible'
      });

      $elNew.addClass('transition-in').removeClass('transition-out');
    }
  });

  Barba.Pjax.getTransition = () => transition;

  Barba.Dispatcher.on('newPageReady', (currentStatus, oldStatus) => {

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, speed);

    $($document).trigger('allPagesEnter');
    console.log('allPagesEnter');

    switch (true) {

      case oldStatus.namespace === 'projects' && currentStatus.namespace === 'projects':
        $barbaWrapper.addClass('tertiary-transition');
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, speed);
        break;

      case currentStatus.namespace === 'homepage':
        $barbaWrapper.removeClass('fade-in');
        setTimeout(() => {
          window.scrollTo(0, 0);
          $barbaWrapper.addClass('fade-in');
        }, speed);
        console.log('homepage');
        break;

      default:
        $barbaWrapper.removeClass();
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, speed);
    }
  });
};

$(() => pageTransitions());
