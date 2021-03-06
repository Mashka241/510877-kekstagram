'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.util = {
    isEscEvent: function (evt, action, parameter) {
      if (evt.keyCode === ESC_KEYCODE) {
        action(parameter);
      }
    },
    isEnterEvent: function (evt, action, parameter) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(parameter);
      }
    },
    getRandomNumber: function (num1, num2) {
      var number = Math.floor(num1 + ((Math.random() * (num2 - num1))));
      return number;
    },
    debounce: function (update) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(update, DEBOUNCE_INTERVAL);
    }
  };
})();
