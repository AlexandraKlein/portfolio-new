/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */
(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    Barba.Pjax.start();
    Barba.Prefetch.init();

    var transition = Barba.BaseTransition.extend({
      start: function() {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },

      fadeOut: function() {
        var $elOld = $(this.oldContainer);
        var $nextArticle = $elOld.find('.next');
        var height = $nextArticle.height();
        var translationValue = $nextArticle.offset().top + (height / 2);

        $elOld.removeClass('transition-in')
              .addClass('transition-out')
              .find('.next').css({ 'transform': 'translate3d(0, -' + translationValue + 'px, 0)' });

        $('html, body').animate({ scrollTop: 0 }, 400);

        return $elOld.animate({ opacity: 1 }).promise();
      },

      fadeIn: function() {
        var _this = this;
        var $elNew = $(this.newContainer);

        $(this.oldContainer).hide();

        $elNew.css({
          visibility : 'visible',
          opacity : 1
        });

        $elNew.animate(
          { opacity: 1 }
          , 1000, function() {
            _this.done();
        });




        $elNew.addClass('transition-in')
              .removeClass('transition-out');

      }
    });

    Barba.Pjax.getTransition = function() {
      return transition;
    };

  });

})(jQuery, window, document);
