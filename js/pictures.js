'use strict';

var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var photoDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var getRandomNumber = function (x, y) {
  var number = Math.floor(x + ((Math.random() * (y - x))));
  return number;
};

var getRandomArrElement = function (arr) {
  var number = Math.floor(Math.random() * arr.length);
  return arr[number];
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var getUnorderedArray = function (num) {
  var newArray = [];
  for (var i = 1; i <= num; i++) {
    newArray.push(i);
  }
  newArray.sort(compareRandom);
  return newArray;
};

var createComments = function (numberOfComments, listOfComments) {
  var commentsArray = [];
  for (var i = 0; i < numberOfComments; i++) {
    var comment = getRandomArrElement(listOfComments);
    if ((Math.random() - 0.5) > 0) {
      comment += getRandomArrElement(listOfComments);
    }
    commentsArray.push(comment);
  }
  return commentsArray;
};

var createRandomPhoto = function (photoNumber, photoComment, photoDescription) {
  var url = 'photos/' + photoNumber + '.jpg';
  var likes = getRandomNumber(15, 200);
  var commentsNumber = getRandomNumber(1, 5);
  var comments = createComments(commentsNumber, photoComment);
  var description = getRandomArrElement(photoDescription);
  var randomPhoto = {
    url: url,
    likes: likes,
    comments: comments.length,
    commentsContent: comments,
    description: description
  };
  return randomPhoto;
};

var createPhotosArray = function (numberOfPhotos) {
  var photosArray = [];
  var photoUrl = getUnorderedArray(numberOfPhotos);
  for (var i = 0; i < numberOfPhotos; i++) {
    var newPhoto = createRandomPhoto(photoUrl[i], photoComments, photoDescriptions);
    photosArray.push(newPhoto);
  }
  return photosArray;
};

var photosArray = createPhotosArray(25);

var picturesList = document.querySelector('.pictures');
var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var renderPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments;
  return photoElement;
};

var fragment = document.createDocumentFragment();

var renderPhotos = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPhoto(arr[i]));
  }
  return fragment;
};

picturesList.appendChild(renderPhotos(photosArray));

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img').src = photosArray[0].url;
bigPicture.querySelector('.likes-count').textContent = photosArray[0].likes;
bigPicture.querySelector('.comments-count').textContent = photosArray[0].comments;

var socialComments = bigPicture.querySelector('.social__comments');
var commentsList = socialComments.querySelectorAll('li');

for (var i = 0; i < commentsList.length; i++) {
  var commentPhoto = commentsList[i].querySelector('.social__picture');
  var commentText = commentsList[i].querySelector('.social__text');
  commentPhoto.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  commentText.textContent = photosArray[0].commentsContent[i];
};

bigPicture.querySelector('.social__caption').textContent = photosArray[0].description;

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
