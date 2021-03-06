import '../nouislider/nouislider.js';

//Работа с маштабом изображения
const formSizePicture = document.querySelector('.img-upload__scale');
const buttonSmallPicture = formSizePicture.querySelector('.scale__control--smaller');
const buttonBigPicture = formSizePicture.querySelector('.scale__control--bigger');
const valueSizePicture = formSizePicture.querySelector('.scale__control--value');
const RANGE_MIN = 25;
const RANGE_MAX = 100;
const STEP = 25;
const effectLevel = document.querySelector('.img-upload__effect-level');
const formEffects = document.querySelector('.img-upload__effects');
const picture = document.querySelector('.img-upload__preview').children[0];
const sliderEffect = document.querySelector('.effect-level__slider');
const handleEffect = document.querySelector('.effect-level__value');
let reduceCurrentValue = '';

const getReduceValue = () => {
  const value = +valueSizePicture.value.replace('%', '');
  if (value <= RANGE_MIN) {
    reduceCurrentValue = RANGE_MIN;
    valueSizePicture.value = `${RANGE_MIN }%`;
    picture.style.transform = `scale(${RANGE_MIN / 100})`;
  } else {
    reduceCurrentValue = value - STEP;
    valueSizePicture.value = `${value - STEP}%`;
    picture.style.transform = `scale(${(value - STEP) / 100})`;
  }
  return reduceCurrentValue;
};

const getZoomValue = () => {
  const value = +valueSizePicture.value.replace('%', '');
  if (value >= RANGE_MAX) {
    reduceCurrentValue = RANGE_MAX;
    valueSizePicture.value = `${RANGE_MAX}%`;
    picture.style.transform = `scale(${RANGE_MAX / 100})`;
  } else {
    reduceCurrentValue = value + STEP;
    valueSizePicture.value = `${value + STEP}%`;
    picture.style.transform = `scale(${(value + STEP) / 100})`;
  }
  return reduceCurrentValue;
};

const listenerСlickArrowRemove = () => {
  buttonSmallPicture.removeEventListener('click', getReduceValue);
  buttonBigPicture.removeEventListener('click', getZoomValue);
};

const listenerСlickArrow = () => {
  valueSizePicture.value = `${RANGE_MAX}%`;
  picture.style.transform = `scale(${RANGE_MAX / 100})`;
  buttonBigPicture.addEventListener('click', getZoomValue);
  buttonSmallPicture.addEventListener('click', getReduceValue);
};

//Работа с фильтрами
noUiSlider.create(sliderEffect, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const rangeMin = {
  none: 0,
  marvin: 0,
  phobos: 0,
  heat: 0,
  chrome: 0,
  sepia: 0,
};

const rangeMax = {
  none: 10,
  marvin: 100,
  phobos: 3,
  heat: 3,
  chrome: 1,
  sepia: 1,
};
const start = {
  none: 0,
  marvin: 100,
  phobos: 3,
  heat: 3,
  chrome: 1,
  sepia: 1,
};
const step = {
  none: 1,
  marvin: 1,
  phobos: 0.1,
  heat: 0.1,
  chrome: 0.1,
  sepia: 0.1,
};

let currentEffect = 'none';

const resetFilter = () => {
  currentEffect = 'none';
  effectLevel.classList.add('hidden');
  picture.style.filter = currentEffect;
};

const changeFilter = (evt) => {
  const className = `effects__preview--${evt.target.value}`;
  picture.className = '';
  picture.classList.add(className);
  currentEffect = evt.target.value;
  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    sliderEffect.noUiSlider.updateOptions({
      range: {
        min: rangeMin[currentEffect],
        max: rangeMax[currentEffect],
      },
      start: start[currentEffect],
      step: step[currentEffect],
    });
  } else {
    effectLevel.classList.remove('hidden');
    sliderEffect.noUiSlider.updateOptions({
      range: {
        min: rangeMin[currentEffect],
        max: rangeMax[currentEffect],
      },
      start: start[currentEffect],
      step: step[currentEffect],
    });
  }
};

formEffects.addEventListener('change', changeFilter);

sliderEffect.noUiSlider.on('update', (value, hadle, unencoded) => {
  handleEffect.value = unencoded[hadle];
  const effectFilet = {
    none: 'none',
    chrome: `grayscale(${handleEffect.value})`,
    sepia: `sepia(${handleEffect.value})`,
    marvin: `invert(${handleEffect.value}%)`,
    phobos: `blur(${handleEffect.value}px`,
    heat: `brightness(${handleEffect.value})`,
  };
  picture.style.filter = effectFilet[currentEffect];

});

export {resetFilter, listenerСlickArrowRemove, listenerСlickArrow };
