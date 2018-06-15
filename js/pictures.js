'use strict';

var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var photoDescription = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var getRandomNumber = function (x,y) {
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
  var newArray = []
  for (var i = 1; i <= num; i++) {
    newArray.push(i);
  }
  newArray.sort(compareRandom);
  return newArray;
};

var createRandomPhoto = function (photoNumber, comments, description) {
  var url = 'photos/' + photoNumber +'.jpg';
  var likes = getRandomNumber(15, 200);
  var comments = getRandomArrElement(comments);
  var description = getRandomArrElement(description);
  var randomPhoto = {
    url: url,
    likes: likes,
    comments: comments,
    description: description
  };
  return randomPhoto;  
};

var createPhotosArray = function (numberOfPhotos) {
  var photosArray = [];
  var photoUrl = getUnorderedArray(numberOfPhotos);
  for (var i = 0; i < numberOfPhotos; i++) {
    var newPhoto = createRandomPhoto(photoUrl[i], photoComments, photoDescription);
    photosArray.push(newPhoto);
  }
  return photosArray;
};

createPhotosArray(25);