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
    filtersList.classList.remove('img-filters--inactive');
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

  var sortDiscussedPhotos = function (arr) {
    var arrCopy = arr.slice();
    arrCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    return arrCopy;
  };

  var selectedPhotos = [];

  var sortNewPhotos = function (arr) {
    var arrCopy = arr.slice();
    arrCopy.sort(function () {
      return Math.random() - 0.5;
    });
    var currentArray = [];

    if (selectedPhotos.length === 0) {
      currentArray = arrCopy.slice(0, 10);
    } else {
      var newArray = arrCopy.filter(function (item) {
        return selectedPhotos.indexOf(item) === -1;
      });
      currentArray = newArray.slice(0, 10);
    }
    selectedPhotos = currentArray;
    return currentArray;
  };

  var allFilters = Array.from(document.querySelectorAll('.img-filters__button'));

  var filterData = {
    // 'filter-popular': '',
    'filter-new': sortNewPhotos,
    'filter-discussed': sortDiscussedPhotos
  };

  var filterPhotos = function (filter) {
    if (filter === 'filter-popular') {
      window.debounce(function () {
        renderPhotos(photosArray);
      });
    } else {
      window.debounce(function () {
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
