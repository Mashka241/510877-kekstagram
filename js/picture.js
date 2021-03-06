'use strict';
(function () {
  var SHOWED_PICTURES_COUNT = 10;
  var picturesList = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var sortNewPhotos = function (arr) {
    var copiedPhotos = arr.slice();
    copiedPhotos.sort(function () {
      return Math.random() - 0.5;
    });
    var showedPhotos = [];

    if (selectedPhotos.length === 0) {
      showedPhotos = copiedPhotos.slice(0, SHOWED_PICTURES_COUNT);
    } else {
      var uniquePhotos = copiedPhotos.filter(function (item) {
        return selectedPhotos.indexOf(item) === -1;
      });
      showedPhotos = uniquePhotos.slice(0, SHOWED_PICTURES_COUNT);
    }
    selectedPhotos = showedPhotos;
    return showedPhotos;
  };

  var sortDiscussedPhotos = function (arr) {
    var copiedPhotos = arr.slice();
    copiedPhotos.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    return copiedPhotos;
  };

  var filterData = {
    'filter-new': sortNewPhotos,
    'filter-discussed': sortDiscussedPhotos
  };

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

    photoArr.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });
    picturesList.appendChild(fragment);
  };

  var photosArray = [];

  var onLoad = function (photos) {
    renderPhotos(photos);
    photosArray = Array.from(photos);
    filtersList.classList.remove('img-filters--inactive');
  };

  var loadError = document.querySelector('.pop-up--failure');
  var errorText = loadError.querySelector('.pop-up__text');

  var onError = function (message) {
    errorText.textContent = message;
    loadError.classList.remove('hidden');
  };

  window.backend.request(onLoad, onError, 'load');

  var filtersList = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');

  var selectedPhotos = [];

  var allFilters = Array.from(document.querySelectorAll('.img-filters__button'));

  var filterPhotos = function (filter) {
    if (filter === 'filter-popular') {
      window.util.debounce(function () {
        renderPhotos(photosArray);
      });
    } else {
      window.util.debounce(function () {
        renderPhotos(filterData[filter](photosArray));
      });
    }
  };

  var onFilterClick = function (evt) {
    allFilters.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    var currentFilter = evt.target.id;
    filterPhotos(currentFilter);
    evt.target.classList.add('img-filters__button--active');
  };

  filtersForm.addEventListener('click', onFilterClick);

})();
