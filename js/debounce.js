'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  window.debounce = function (update) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(update, DEBOUNCE_INTERVAL);
  };
})();
