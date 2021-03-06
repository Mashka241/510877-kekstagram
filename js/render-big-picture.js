'use strict';
(function () {
  var SHOWED_COMMENTS_COUNT = 5;
  var AVATAR_MAX_NUMBER = 6;
  var AVATAR_MIN_NUMBER = 1;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  window.renderBigPicture = function (data) {
    bigPicture.querySelector('.big-picture__img > img').src = data.url;
    bigPicture.querySelector('.likes-count').textContent = data.likes;
    bigPicture.querySelector('.comments-count').textContent = data.comments.length;
    var socialComments = bigPicture.querySelector('.social__comments');
    var commentsCount = (data.comments.length < SHOWED_COMMENTS_COUNT) ? data.comments.length : SHOWED_COMMENTS_COUNT;

    var previousComments = socialComments.querySelectorAll('.social__comment');
    previousComments.forEach(function (picture) {
      picture.remove();
    });

    for (var index = 0; index < commentsCount; index++) {
      var comment = '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + window.util.getRandomNumber(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + data.comments[index] + '</p></li>';
      socialComments.insertAdjacentHTML('beforeend', comment);
    }

    bigPicture.querySelector('.social__caption').textContent = data.comments[0];
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');
  };

  var closePicture = function () {
    bigPicture.classList.add('hidden');
  };

  var onPictureEscPress = function (evt) {
    if (window.util.isEscEvent(evt, closePicture)) {
      document.removeEventListener('keydown', onPictureEscPress);
    }
  };

  var onPictureCloseEnterPress = function (evt) {
    if (window.util.isEnterEvent(evt, closePicture)) {
      document.removeEventListener('keydown', onPictureCloseEnterPress);
    }
  };

  var onPictureCloseClick = function () {
    closePicture();
  };

  bigPictureClose.addEventListener('click', onPictureCloseClick);

  bigPictureClose.addEventListener('keydown', onPictureCloseEnterPress);

  document.addEventListener('keydown', onPictureEscPress);
})();
