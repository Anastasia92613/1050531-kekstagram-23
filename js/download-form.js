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

const createHashArrayTags = (stringToSplit, separator, space) => {
  let arrayHashTags = [];
  const arrayTag = [];
  arrayHashTags = stringToSplit.split(separator);
  arrayHashTags.splice(0, 1);
  arrayHashTags.forEach((word) => {
    arrayTag.push(`#${word}`);
  });
  const stringHashTag = arrayTag.join(space);
  return stringHashTag;
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
  let arrayTags = arrayHashTags.split(separator);
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
hashTagsInput.addEventListener('input', (evt) => {
  const re = new RegExp('#[A-Za-zА-Яа-я]{1,19}');
  const inputValue = hashTagsInput.value.toLowerCase();
  if (!re.test(inputValue)) {
    hashTagsInput.setCustomValidity('Хэштег может состоять только из букв и чисел, должен начинаться с символа #, и не должен превышать 20 символов');
  } else if (comparisonHashTag(inputValue, sharp)) {
    hashTagsInput.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
  } else if (countingHashTag(inputValue, sharp)) {
    hashTagsInput.setCustomValidity('Хэштегов не может быть больше пяти');
  } else {
    hashTagsInput.setCustomValidity('');
    createHashArrayTags(inputValue, sharp, space);
  }
});

//Отмена нажатия Esc при фокусе в инпуте
hashTagsInput.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});
