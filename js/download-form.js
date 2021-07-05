import { buttonClose, isEscEvent } from './util.js';

const form = document.querySelector('#upload-select-image');
const downloadInput = form.querySelector('.img-upload__input');
const formEditPhoto = form.querySelector('.img-upload__overlay');
const modalOpen = document.querySelector('body');
const buttonCancel = form.querySelector('#upload-cancel');
const hashTagsInput = form.querySelector('.text__hashtags');

//Открытие формы загрузки
const delClassForm = () => {
  formEditPhoto.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
};

//Закрытие формы загруки
downloadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  formEditPhoto.classList.remove('hidden');
  modalOpen.classList.add('modal-open');
  document.removeEventListener('keydown', buttonClose(buttonCancel, delClassForm), isEscEvent(delClassForm));
  downloadInput.value = '';
});

//Вывод хэштегов?
const sharp = '#';
const space = ' ';

const createHashArrayTags = (stringToSplit, separator, spaceDelimeter) => {
  let arrayHashTags = [];
  const arrayTag = [];
  arrayHashTags = stringToSplit.value.split(separator);
  arrayHashTags.splice(0, 1);
  arrayHashTags.forEach((word) => {
    arrayTag.push(`#${word}`);
  });
  const stringHashTag = arrayTag.join(spaceDelimeter);
  return stringHashTag;
};

//Создание массива тегов
const createArrayTags = (stringToSplit, separator) => {
  let previewArrayTags = [];
  const arrayTag = [];
  previewArrayTags = stringToSplit.value.split(separator);
  previewArrayTags.splice(0, 1);
  previewArrayTags.forEach((word) => {
    arrayTag.push(`#${word}`);
  });
  return arrayTag;
};

//Проверка одинаковых хэштегов
const delSpace = (array) => {
  const trimArrayTag = [];
  for (let index = 0; index < array.length; index++) {
    trimArrayTag.push(array[index].trim());
  }
  return trimArrayTag;
};

const comparisonHashTag = (arrayHashTags, separator) => {
  let arrayTags = arrayHashTags.value.split(separator);
  arrayTags.splice(0, 1);
  arrayTags = delSpace(arrayTags);
  for (let index = 0; index < arrayTags.length; index++) {
    if (index !== arrayTags.indexOf(arrayTags[index])) {
      return true;
    }
  }
};

//Проверка количетсва хэштегов
const countingHashTag = (string, separator) => {
  const arrayTag = string.split(separator);
  arrayTag.splice(0, 1);
  if (arrayTag.length > 5) {
    return true;
  }
};

//Валидация хэштегов
hashTagsInput.addEventListener('input', (event) => {
  const re = new RegExp('#[A-Za-zА-Яа-я]{1,19}');
  // console.log(hashTagsInput);
  // let inputValue = hashTagsInput.value.toLowerCase();
  let inputValue = event.target;
  inputValue = createArrayTags(inputValue,sharp, space);
  // console.log(inputValue);
  if (!re.test(inputValue)) {
    inputValue.setCustomValidity('Хэштег может состоять только из букв и чисел, должен начинаться с символа #, и не должен превышать 20 символов');
    // console.log('Хэштег может состоять только из букв и чисел, должен начинаться с символа #, и не должен превышать 20 символов');
  } else if (comparisonHashTag(inputValue, sharp)) {
    inputValue.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
    // console.log('Один и тот же хэштег не может быть использован дважды');
  } else if (countingHashTag(inputValue, sharp)) {
    inputValue.setCustomValidity('Хэштегов не может быть больше пяти');
    // console.log('Хэштегов не может быть больше пяти');
  } else {
    inputValue.setCustomValidity('');
    createHashArrayTags(inputValue, sharp, space);
  }
});

//Отмена нажатия Esc при фокусе в инпуте
hashTagsInput.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});
