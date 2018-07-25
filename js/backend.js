'use strict';
(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var HTTPStatuse = {
    SUCCESS_CODE: 200,
    BAD_REQUEST_CODE: 400,
    NOT_FOUND_CODE: 404
  };

  var typesRequest = {
    load: 'load',
    upload: 'upload'
  };

  window.backend = {
    request: function (onLoad, onError, type, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case HTTPStatuse.SUCCESS_CODE:
            if (type === typesRequest.upload) {
              onLoad();
            } else if (type === typesRequest.load) {
              onLoad(xhr.response);
            }
            break;
          case HTTPStatuse.BAD_REQUEST_CODE:
            error = 'Неверный запрос';
            break;
          case HTTPStatuse.NOT_FOUND_CODE:
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
      if (type === typesRequest.load) {
        xhr.open('GET', URL_DOWNLOAD);
        xhr.send();
      } else if (type === typesRequest.upload) {
        xhr.open('POST', URL_UPLOAD);
        xhr.send(data);
      }
    }
  };
})();
