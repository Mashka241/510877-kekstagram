'use strict';
(function () {
  var SIZE_STEP = 25;
  var MIN_PICTURE_SIZE = 25;
  var MAX_PICTURE_SIZE = 100;
  var DEFAULT_FILTER = 'none';
  var ONE_HUNDRED_PERCENT = 100;
  var RADIX_PARAMETER = 10;
  var LEFT_SCALE_EDGE = 0;

  var uploadOpen = document.querySelector('#upload-file');
  var upload = document.querySelector('.img-upload__overlay');
  var uploadClose = upload.querySelector('.img-upload__cancel');
  var resizeMinus = document.querySelector('.resize__control--minus');
  var resizePlus = document.querySelector('.resize__control--plus');
  var resizeValue = document.querySelector('.resize__control--value');
  var defaultFilterInput = document.querySelector('#effect-none');

  var effectTypes = [
    {
      value: 'none',
      effect: '',
      min: '',
      max: '',
      typeValue: ''
    },
    {
      value: 'chrome',
      effect: 'grayscale',
      min: 0,
      max: 1,
      typeValue: '',
    },
    {
      value: 'sepia',
      effect: 'sepia',
      min: 0,
      max: 1,
      typeValue: ''
    },
    {
      value: 'marvin',
      effect: 'invert',
      min: 0,
      max: 100,
      typeValue: '%'
    },
    {
      value: 'phobos',
      effect: 'blur',
      min: 0,
      max: 3,
      typeValue: 'px'
    },
    {
      value: 'heat',
      effect: 'brightness',
      min: 1,
      max: 3,
      typeValue: ''
    }];

  uploadOpen.addEventListener('change', function () {
    upload.classList.remove('hidden');
    addEffect(DEFAULT_FILTER);
    defaultFilterInput.click();
  });

  var removeEffect = function () {
    if (previewPicture.classList.length) {
      var currentEffect = previewPicture.className;
      previewPicture.classList.remove(currentEffect);
    }
  };

  var addEffect = function (effect) {
    var effectClass = 'effects__preview--' + effect;
    previewPicture.classList.add(effectClass);
    scaleLevel.style.width = ONE_HUNDRED_PERCENT + '%';
    scaleValueInput.value = ONE_HUNDRED_PERCENT;
    scaleValueInput.setAttribute('value', ONE_HUNDRED_PERCENT + '');
    scalePin.style.left = scaleLine.offsetWidth + 'px';

    effectTypes.forEach(function (curEffect) {
      if (curEffect.value === effect) {
        previewPicture.style.filter = curEffect.effect + '(' + curEffect.max + curEffect.typeValue + ')';
      }
    });
  };

  var closePopup = function () {
    upload.classList.add('hidden');
    uploadOpen.value = null;
    removeEffect();
    resizeValue.value = '100%';
    previewPicture.style.transform = 'scale(1)';
  };

  var checkActiveFields = function (evt) {
    if (evt.target === window.formFields.hashtags) {
      window.formFields.hashtags.blur();
    } else if (evt.target === window.formFields.comments) {
      window.formFields.comments.blur();
    } else {
      closePopup();
    }
  };

  var onPopupEscPress = function (evt) {
    if (window.util.isEscEvent(evt, checkActiveFields, evt)) {
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onButtonCancelClick = function () {
    closePopup();
  };

  uploadClose.addEventListener('click', onButtonCancelClick);

  document.addEventListener('keydown', onPopupEscPress);

  var previewPicture = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');

  effectsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      removeEffect();
      effectsScale.classList.add('hidden');
      previewPicture.style.filter = 'none';
      if (evt.target.value !== 'none') {
        effectsScale.classList.remove('hidden');
        addEffect(evt.target.value);
      }
    }
  });

  var resizePicture = function (operation) {
    var currentSize = parseInt(resizeValue.value, RADIX_PARAMETER);
    var size;
    if (operation === 'minus') {
      size = currentSize - SIZE_STEP;
    } else if (operation === 'plus') {
      size = currentSize + SIZE_STEP;
    }
    if (size >= MIN_PICTURE_SIZE && size <= MAX_PICTURE_SIZE) {
      resizeValue.value = size + '%';
      previewPicture.style.transform = 'scale(' + (size / ONE_HUNDRED_PERCENT) + ')';
    }
  };

  resizeMinus.addEventListener('click', function () {
    resizePicture('minus');
  });

  resizePlus.addEventListener('click', function () {
    resizePicture('plus');
  });

  var effectsScale = document.querySelector('.img-upload__scale');
  var scalePin = effectsScale.querySelector('.scale__pin');
  var scaleValueInput = effectsScale.querySelector('.scale__value');
  var scaleLevel = effectsScale.querySelector('.scale__level');
  var scaleLine = effectsScale.querySelector('.scale__line');

  var changeEffectValue = function (currentEffect, effectDepth) {
    var effectValue = ((currentEffect.max - currentEffect.min) * effectDepth / ONE_HUNDRED_PERCENT) + currentEffect.min;
    previewPicture.style.filter = currentEffect.effect + '(' + effectValue + currentEffect.typeValue + ')';
    scaleLevel.style.width = effectDepth + '%';
    scaleValueInput.value = effectDepth + '';
    scaleValueInput.setAttribute('value', effectDepth + '');
  };

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinateX = evt.clientX;
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shiftX = startCoordinateX - moveEvt.clientX;
      startCoordinateX = moveEvt.clientX;

      var newCoordinateX = scalePin.offsetLeft - shiftX;

      if (newCoordinateX < LEFT_SCALE_EDGE) {
        newCoordinateX = LEFT_SCALE_EDGE;
      }

      var rightEdge = scaleLine.offsetWidth;

      if (newCoordinateX > rightEdge) {
        newCoordinateX = rightEdge;
      }

      scalePin.style.left = newCoordinateX + 'px';
      var scaleValue = Math.round(newCoordinateX * ONE_HUNDRED_PERCENT / rightEdge);

      effectTypes.forEach(function (currentEffect) {
        if (previewPicture.classList.contains('effects__preview--' + currentEffect.value)) {
          changeEffectValue(currentEffect, scaleValue);
        }
      });
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          scalePin.removeEventListener('click', onClickPreventDefault);
        };
        scalePin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
