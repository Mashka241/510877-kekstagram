'use strict';
(function () {
  var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var photoDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  var getRandomArrElement = function (arr) {
    var number = Math.floor(Math.random() * arr.length);
    return arr[number];
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
    var likes = window.util.getRandomNumber(15, 200);
    var commentsNumber = window.util.getRandomNumber(1, 5);
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

  window.photosArray = [];

  for (var i = 0; i < 25; i++) {
    var newPhoto = createRandomPhoto(i + 1, photoComments, photoDescriptions);
    window.photosArray.push(newPhoto);
  }
})();
