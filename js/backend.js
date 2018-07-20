'use strict';
(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;
  var BAD_REQUEST_CODE = 400;
  var NOT_FOUND_CODE = 404;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case SUCCESS_CODE:
            onLoad(xhr.response);
            break;
          case BAD_REQUEST_CODE:
            error = 'Неверный запрос';
            break;
          case NOT_FOUND_CODE:
            error = 'Ничего не найдено';
            break;
          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL_UPLOAD);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case SUCCESS_CODE:
            onLoad();
            break;
          case BAD_REQUEST_CODE:
            error = 'Неверный запрос';
            break;
          case NOT_FOUND_CODE:
            error = 'Ничего не найдено';
            break;
          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('POST', URL_DOWNLOAD);
      xhr.send(data);
    }
  };
})();
