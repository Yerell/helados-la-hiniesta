console.log('Hola');


var Expand = (function() {
    var tile = $('.strips__strip');
    var tileLink = $('.strips__strip > .strip__content');
    var tileText = tileLink.find('.strip__inner-text');
    var stripClose = $('.strip__close');
    
    var expanded  = false;
  
    var open = function() {
        
      var tile = $(this).parent();
  
        if (!expanded) {
          tile.addClass('strips__strip--expanded');
          // add delay to inner text
          tileText.css('transition', 'all .5s .3s cubic-bezier(0.23, 1, 0.32, 1)');
          stripClose.addClass('strip__close--show');
          stripClose.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
          expanded = true;
        } 
      };
    
    var close = function() {
      if (expanded) {
        tile.removeClass('strips__strip--expanded');
        // remove delay from inner text
        tileText.css('transition', 'all 0.15s 0 cubic-bezier(0.23, 1, 0.32, 1)');
        stripClose.removeClass('strip__close--show');
        stripClose.css('transition', 'all 0.2s 0s cubic-bezier(0.23, 1, 0.32, 1)')
        expanded = false;
      }
    }
  
      var bindActions = function() {
        tileLink.on('click', open);
        stripClose.on('click', close);
      };
  
      var init = function() {
        bindActions();
      };
  
      return {
        init: init
      };
  
    }());
  
  Expand.init(); 
(function() {
  window.addEventListener('scroll', function(event) {
    var depth, layer, layers, movement, topDistance, translate3d, _i, _len;
    topDistance = this.pageYOffset;
    layers = document.querySelectorAll("[data-type='parallax']");
    for (_i = 0, _len = layers.length; _i < _len; _i++) {
      layer = layers[_i];
      depth = layer.getAttribute('data-depth');
      movement = -(topDistance * depth);
      translate3d = 'translate3d(0, ' + movement + 'px, 0)';
      layer.style['-webkit-transform'] = translate3d;
      layer.style['-moz-transform'] = translate3d;
      layer.style['-ms-transform'] = translate3d;
      layer.style['-o-transform'] = translate3d;
      layer.style.transform = translate3d;
    }
  });

}).call(this);

document.addEventListener("DOMContentLoaded", function () {
  

  
    // Variables
    var buttonUp = document.querySelector('a[href="#up"]');
    var easings = {
        linear(t) {
            return t;
        },
        easeInQuad(t) {
            return t * t;
        },
        easeOutQuad(t) {
            return t * (2 - t);
        },
        easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
            return t * t * t;
        },
        easeOutCubic(t) {
            return (--t) * t * t + 1;
        },
        easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart(t) {
            return t * t * t * t;
        },
        easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        },
        easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        },
        easeInQuint(t) {
            return t * t * t * t * t;
        },
        easeOutQuint(t) {
            return 1 + (--t) * t * t * t * t;
        },
        easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
        }
    };

    // Functions
    /**
     * Animated scroll to up
     */
    function scrollUp(duration, easing) {
        var start = window.pageYOffset;
        var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, 0);
            return;
        }
        // Animation
        function scroll() {
            var now = 'now' in window.performance ? performance.now() : new Date().getTime();
            var time = Math.min(1, ((now - startTime) / duration));
            var timeFunction = easings[easing](time);
            window.scroll(0, Math.ceil((timeFunction * (0 - start)) + start));
            if (window.pageYOffset === 0) {
                return;
            }
            requestAnimationFrame(scroll);
        }
        // Move
        scroll();
    }

    /**
     * Show and hide button
     */
    function isVisibled() {
        var heightHide = parseInt(buttonUp.getAttribute('height-hide')) || 100;
        if (document.body.scrollTop > heightHide || document.documentElement.scrollTop > heightHide) {
            buttonUp.classList.remove('simplescrollup__button--hide');
            buttonUp.classList.add('simplescrollup__button--show');
        } else {
            // Hide
            buttonUp.classList.remove('simplescrollup__button--show');
            buttonUp.classList.add('simplescrollup__button--hide');
        }
    }

    // Events

    // Click button
    buttonUp.addEventListener('click', function() {
        // Get attributes
        var duration = parseInt(buttonUp.getAttribute('duration')) || 1000;
        var easing = buttonUp.getAttribute('easing') || 'easeInOutQuad';
        // Run
        scrollUp(duration, easing);
    });

    // Auto show and hide button
    window.addEventListener('scroll', isVisibled);
});


