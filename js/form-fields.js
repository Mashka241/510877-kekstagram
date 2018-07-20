'use strict';
(function () {
  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_HASHTAG_LENGTH = 1;
  var pictureSetup = document.querySelector('.img-upload');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var commentField = uploadForm.querySelector('.text__description');
  var hashtagField = uploadForm.querySelector('.text__hashtags');
  window.formFields = {
    comments: commentField,
    hashtags: hashtagField
  };
  var getNewArrayWithoutIndex = function (array, index) {
    return array.slice(0, index).concat(array.slice(index + 1));
  };

  var isDouble = function (array) {
    array.forEach(function (item, index, arr) {
      var newArray = getNewArrayWithoutIndex(arr, index);
      if (newArray.indexOf(item) !== -1) {
        return true;
      }
    });
    return false;
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

    hashtagArray.forEach(function (currentHashtag) {
      if (currentHashtag[0] !== '#') {
        hashtagField.setCustomValidity('хэш-тег должен начинаться с символа #');
        hashtagField.classList.add('text__hashtags--invalid');
        return false;
      } else if (currentHashtag.length === MIN_HASHTAG_LENGTH && currentHashtag[0] === '#') {
        hashtagField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        hashtagField.classList.add('text__hashtags--invalid');
        return false;
      } else if (currentHashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        hashtagField.classList.add('text__hashtags--invalid');
        return false;
      }
    });

    hashtagField.setCustomValidity('');
    hashtagField.classList.remove('text__hashtags--invalid');
    return true;
  };

  var similarUploadError = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
  var uploadError = similarUploadError.cloneNode(true);
  pictureSetup.appendChild(uploadError);

  var onError = function (message) {
    uploadForm.classList.add('hidden');
    uploadError.textContent = message;
    uploadError.classList.remove('hidden');
  };

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(uploadForm), function () {
      uploadOverlay.classList.add('hidden');
      uploadForm.reset();
    }, onError);
    evt.preventDefault();
  });

  hashtagField.addEventListener('change', function () {
    validateHashtagField();
  });
})();
