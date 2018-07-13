'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');


  window.renderBigPicture = function (data) {
    bigPicture.querySelector('.big-picture__img > img').src = data.url;
    bigPicture.querySelector('.likes-count').textContent = data.likes;
    bigPicture.querySelector('.comments-count').textContent = data.comments.length;
    var socialComments = bigPicture.querySelector('.social__comments');

    for (var index = 0; index < data.comments.length; index++) {
      var comment = '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + data.comments[index] + '</p></li>';
      socialComments.insertAdjacentHTML('beforeend', comment);
    }

    // bigPicture.querySelector('.social__caption').textContent = data.description;
    bigPicture.querySelector('.social__caption').textContent = data.comments[0];
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');
  };

  var closePicture = function () {
    bigPicture.classList.add('hidden');
  };

  var onPictureEscPress = function (evt) {
    window.util.isEscEvent(evt, closePicture);
  };

  var onPictureCloseEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePicture);
  };

  bigPicture.addEventListener('click', closePicture);
  bigPictureClose.addEventListener('keydown', onPictureCloseEnterPress);

  document.addEventListener('keydown', onPictureEscPress);
})();
