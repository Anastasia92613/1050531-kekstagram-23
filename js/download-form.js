import { buttonClose, isEscEvent } from './util.js';
import { resetFilter } from './slider.js';
import { sendPost } from './api.js';

const form = document.querySelector('#upload-select-image');
const downloadInput = form.querySelector('.img-upload__input');
const formEditPhoto = form.querySelector('.img-upload__overlay');
const modalOpen = document.querySelector('body');
const buttonCancel = form.querySelector('#upload-cancel');
const hashTagsInput = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

//Закрытие формы загрузки
const delClassForm = () => {
  formEditPhoto.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
  downloadInput.value = '';
  hashTagsInput.value = '';
  description.value = '';
  resetFilter();
};

//Отправка данных
downloadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  formEditPhoto.classList.remove('hidden');
  modalOpen.classList.add('modal-open');
  document.removeEventListener('keydown', buttonClose(buttonCancel, delClassForm), isEscEvent(delClassForm));
  if (downloadInput.files[0]) {
    const loadFile = new FileReader();
    loadFile.addEventListener('load', () => {
      const previewPhoto = form.querySelector('.img-upload__preview').children[0];
      previewPhoto.src = loadFile.result;
    }, false);
    loadFile.readAsDataURL(downloadInput.files[0]);
  }
});

// Перевод строки в массив
const creatArrayHashTag = (stringTag, separator) => {
  const arrayTags = stringTag.split(separator);
  arrayTags.splice(0, 1);
  return arrayTags;
};

//Вывод хэштегов?
const SHARP = '#';
const SPACE = ' ';

const createHashArrayTags = (stringToSplit, separator, spacing) => {
  let arrayHashTags = [];
  const arrayTag = [];
  arrayHashTags = creatArrayHashTag(stringToSplit, separator);
  arrayHashTags.forEach((word) => {
    arrayTag.push(`#${word}`);
  });
  const stringHashTag = arrayTag.join(spacing);
  return stringHashTag;
};

//Поиск пробелов внутри слова
const searchSpace = (stringTag, separator) => {
  const arrayTags = creatArrayHashTag(stringTag, separator);
  for (let index = 0; index < arrayTags.length; index++) {
    if (arrayTags[index].trim().indexOf(' ') >= 0) {
      return true;
    }
  }
};

//Проверка на наличие пробела между хэштегами
const availabilitySpace = (stringTag, separator) => {
  let isValid = true;
  const arrayTags = stringTag.split(separator);
  if (arrayTags.length > 0) {
    arrayTags.forEach((el) => {
      if (el && el.match(/#/g) && el.match(/#/g).length !== 1) {
        isValid = false;
      }
    });
  }
  return isValid;
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
  let arrayTags = creatArrayHashTag(arrayHashTags, separator);
  arrayTags = delSpace(arrayTags);
  for (let index = 0; index < arrayTags.length; index++) {
    if (index !== arrayTags.indexOf(arrayTags[index].toLowerCase())) {
      return true;
    }
  }
};

//Проверка количетсва хэштегов
const countingHashTag = (string, separator) => {
  const arrayTag = creatArrayHashTag(string, separator);
  if (arrayTag.length > 5) {
    return true;
  }
};

//Валидация хэштегов
hashTagsInput.addEventListener('input', (event) => {
  const re = new RegExp('#[A-Za-zА-Яа-я]{1,19}');
  const input = event.target;
  const inputValue = input.value;
  availabilitySpace(inputValue, SHARP);
  if (!re.test(inputValue)) {
    input.setCustomValidity('Хэштег может состоять только из букв и чисел, должен начинаться с символа #, и не должен превышать 20 символов');
  } else if (searchSpace(inputValue, SHARP)) {
    input.setCustomValidity('В Хэштеге не может быть пробелов');
  } else if (!availabilitySpace(inputValue, SPACE)) {
    input.setCustomValidity('Хэштеги должны быть разделены пробелами');
  } else if (comparisonHashTag(inputValue, SHARP)) {
    input.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
  } else if (countingHashTag(inputValue, SHARP)) {
    input.setCustomValidity('Хэштегов не может быть больше пяти');
  } else {
    input.setCustomValidity('');
    createHashArrayTags(inputValue, SHARP, SPACE);
  }
  input.reportValidity();
});

//Отмена нажатия Esc при фокусе в инпуте
hashTagsInput.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});

//Отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // const formData = new FormData(evt.target);
  sendPost(new FormData(evt.target));
});

export { delClassForm };
