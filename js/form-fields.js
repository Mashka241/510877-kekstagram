'use strict';
(function () {
  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var pictureSetup = document.querySelector('.img-upload');
  var uploadForm = document.querySelector('.img-upload__form');
  var commentField = uploadForm.querySelector('.text__description');
  var hashtagField = uploadForm.querySelector('.text__hashtags');
  // var uploadStart = document.querySelector('.img-upload__start');
  window.formFields = {
    comments: commentField,
    hashtags: hashtagField
  };
  var getNewArrayWithoutIndex = function (array, index) {
    return array.slice(0, index).concat(array.slice(index + 1));
  };

  var isDouble = function (array) {
    var counter = 0;
    for (var index = 0; index < array.length; index++) {
      var newArray = getNewArrayWithoutIndex(array, index);
      if (newArray.indexOf(array[index]) !== -1) {
        counter += 1;
      }
    }
    return counter > 0;
  };

  var validateHashtagField = function () {
    hashtagField.setCustomValidity('');
    hashtagField.classList.remove('text__hashtags--invalid');
    var hashtagContent = hashtagField.value;
    if (hashtagContent.length === 0) {
      return true;
    }
    var hashtagArray = hashtagContent.trim().toLowerCase().split(' ');
    if (hashtagArray.length > MAX_HASHTAGS_NUMBER) {
      hashtagField.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      hashtagField.classList.add('text__hashtags--invalid');
      return false;
    }
    if (isDouble(hashtagArray)) {
      hashtagField.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      hashtagField.classList.add('text__hashtags--invalid');
      return false;
    }
    for (var j = 0; j < hashtagArray.length; j++) {
      var currentHashtag = hashtagArray[j];
      if (currentHashtag[0] !== '#') {
        hashtagField.setCustomValidity('хэш-тег должен начинаться с символа #');
        hashtagField.classList.add('text__hashtags--invalid');
        return false;
      } else if (currentHashtag.length === 1 && currentHashtag[0] === '#') {
        hashtagField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        hashtagField.classList.add('text__hashtags--invalid');
        return false;
      } else if (currentHashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        hashtagField.classList.add('text__hashtags--invalid');
        return false;
      }
    }
    hashtagField.setCustomValidity('');
    hashtagField.classList.remove('text__hashtags--invalid');
    return true;
  };

  // uploadForm.addEventListener('submit', function (evt) {
  //   evt.preventDefault();
  //   if (validateHashtagField()) {
  //     uploadForm.submit();
  //   }
  // });

  var similarUploadError = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
  var uploadError = similarUploadError.cloneNode(true);
  pictureSetup.appendChild(uploadError);
  // uploadError.classList.remove('hidden');

  var onError = function (message) {
    console.error(message);
    uploadForm.classList.add('hidden');
    uploadError.classList.remove('hidden');
  };

  uploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(uploadForm), function () {
      pictureSetup.classList.add('hidden');
      hashtagField.value = '';
      commentField.value = '';
    }, onError);
    evt.preventDefault();
  });

  hashtagField.addEventListener('change', function () {
    validateHashtagField();
  });
})();
