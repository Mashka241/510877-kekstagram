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

  var renderPhotos = function (photoArr) {
    var pictures = picturesList.querySelectorAll('.picture__link');
    pictures.forEach(function (picture) {
      picture.remove();
    });

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoArr.length; i++) {
      fragment.appendChild(renderPhoto(photoArr[i]));
    }
    picturesList.appendChild(fragment);
  };

  var photosArray = [];

  var onLoad = function (photos) {
    renderPhotos(photos);
    photosArray = Array.from(photos);
  };

  var loadError = document.querySelector('.pop-up--failure');
  var errorText = loadError.querySelector('.pop-up__text');

  var onError = function (message) {
    errorText.textContent = message;
    loadError.classList.remove('hidden');
  };

  window.load(onLoad, onError);

  var filtersList = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  
  filtersList.classList.remove('img-filters--inactive');

  var filterPopular = filtersList.querySelector('#filter-popular');
  var filterDiscussed = filtersList.querySelector('#filter-discussed');
  var filterNew = filtersList.querySelector('#filter-new');

  var sortDiscussedPhotos = function (arr) {
    var arrCopy = arr.slice();
    arrCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    return arrCopy;
  };

  var sortNewPhotos = function (arr) {
    var arrCopy = arr.slice();
    arrCopy.sort(function (first, second) {
      return Math.random() - 0.5;
    });
    return arrCopy.slice(0, 10);
  };

  filtersForm.addEventListener('click', function (evt) {

    if (evt.target.id === 'filter-popular') {
      renderPhotos(photosArray);      
    } else if (evt.target.id === 'filter-new') {
      renderPhotos(sortNewPhotos(photosArray));
    } else if (evt.target.id === 'filter-discussed') {
      renderPhotos(sortDiscussedPhotos(photosArray));
    }

    evt.target.classList.add('img-filters__button--active');

  });

})();
