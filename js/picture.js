'use strict';
(function () {
  var picturesList = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var renderPhoto = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    photoElement.addEventListener('click', function () {
      window.renderBigPicture(photo);
    });
    return photoElement;
  };

  // var fragment = document.createDocumentFragment();

  // var renderPhotos = function (arr) {
  //   for (var j = 0; j < arr.length; j++) {
  //     fragment.appendChild(renderPhoto(arr[j]));
  //   }
  //   return fragment;
  // };

  // picturesList.appendChild(renderPhotos(window.photosArray));

  var onLoad = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesList.appendChild(fragment);
  };

  var loadError = document.querySelector('.pop-up--failure');
  var errorText = loadError.querySelector('.pop-up__text');

  var onError = function (message) {
    errorText.textContent = message;
    loadError.classList.remove('hidden');
  };

  window.load(onLoad, onError);

})();
