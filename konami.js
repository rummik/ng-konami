/**
 * ngKonami
 *
 * @example
 *   konami.on(function() { 
 *     alert('Konami code entered!');
 *   });
 */

angular
  .module('ng-konami', [])
  .service('konami', ['$window', function konami($window) {
    var kode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var stak = new Array(kode.length);

    var binds = [];

    /**
     * Binds a function to the konami event
     * @param {function} function  Function to be called when someone enters the konami code
     */
    this.on = function(fn) {
      if (typeof fn === 'function') {
        binds.push(fn);
      }
    };

    /**
     * Unbinds a function from the konami event
     * @param {function} function  Function to be unbound
     */
    this.off = function(fn) {
      for (var i=0, l=binds.length; i<l; i++) {
        if (binds[i] === fn) {
          binds.slice(i, i + 1);
        }
      }
    };

    $window.addEventListener('keydown', function keydown(event) {
      stak.shift();
      stak.push(event.keyCode);

      if (stak.toString() == kode) {
        for (var i=0, l=binds.length; i<l; i++) {
          binds[i].call();
        }
      }
    });
  }]);
