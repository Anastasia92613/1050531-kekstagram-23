import { сloseForm, isEscEvent, checkStringLength, colouringBorder, KEY_ESC } from './util.js';
import { resetFilter, listenerСlickArrowRemove, listenerСlickArrow} from './slider.js';
import { sendPost } from './api.js';

const form = document.querySelector('#upload-select-image');
const downloadInput = form.querySelector('.img-upload__input');
const formEditPhoto = form.querySelector('.img-upload__overlay');
const modalOpen = document.querySelector('body');
const buttonCancel = form.querySelector('#upload-cancel');
const hashTagsInput = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const SHARP = '#';
const SPACE = ' ';
const descriptionText = form.querySelector('.text__description');
const COUNT_TAG = 5;
const COUNT_SIMBOL = 140;
const COUNT_SPACE= 0;

//Закрытие формы загрузки
const deleteClassForm = () => {
  formEditPhoto.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
  downloadInput.value = '';
  hashTagsInput.value = '';
  description.value = '';
  listenerСlickArrowRemove();
  resetFilter();
};

downloadInput.addEventListener('click', () => {
  listenerСlickArrow();
});

//Отправка данных
downloadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  formEditPhoto.classList.remove('hidden');
  modalOpen.classList.add('modal-open');
  document.removeEventListener('keydown', сloseForm(buttonCancel, deleteClassForm), isEscEvent(deleteClassForm));
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
const createHashArrayTags = (stringToSplit, separator, spacing) => {
  let arrayHashTags = [];
  const arrayTags = [];
  arrayHashTags = creatArrayHashTag(stringToSplit, separator);
  arrayHashTags.forEach((word) => {
    arrayTags.push(`#${word}`);
  });
  const stringHashTag = arrayTags.join(spacing);
  return stringHashTag;
};

//Поиск пробелов внутри слова
const searchSpace = (stringTag, separator) => {
  const arrayTags = creatArrayHashTag(stringTag, separator);
  for (let index = 0; index < arrayTags.length; index++) {
    if (arrayTags[index].trim().indexOf(' ') >= COUNT_SPACE) {
      return true;
    }
  }
};

//Проверка на наличие пробела между хэштегами
const checkSpace = (stringTag, separator) => {
  let isValid = true;
  const arrayTags = stringTag.split(separator);
  if (arrayTags.length > COUNT_SPACE) {
    arrayTags.forEach((el) => {
      if (el && el.match(/#/g) && el.match(/#/g).length !== 1) {
        isValid = false;
      }
    });
  }
  return isValid;
};


const compareHashTag = (hashTags, separator) => {
  const arrayTags = hashTags.split(separator);
  for (let index = 0; index < arrayTags.length; index++) {
    if (index !== arrayTags.indexOf(arrayTags[index].toLowerCase())) {
      return true;
    }
  }
};

descriptionText.addEventListener('input', () => {
  const descr = descriptionText.value;
  if (checkStringLength(descr, COUNT_SIMBOL)) {
    descriptionText.setCustomValidity('Строка не должна быть длиннее 140 символов');
    colouringBorder(descriptionText);
  }
  descriptionText.reportValidity();
});

//Проверка количетсва хэштегов
const calculateHashTag = (string, separator) => {
  const arrayTags = creatArrayHashTag(string, separator);
  if (arrayTags.length > COUNT_TAG) {
    return true;
  }
};

const checkReg = (string, separator) => {
  const re = new RegExp('#[A-Za-zА-Яа-я]{1,19}');
  const arrayTags = string.split(separator);
  for (let index = 0; index < arrayTags.length; index++) {
    if(!re.test(arrayTags[index])) {
      return true;
    }
  }
};

//Валидация хэштегов
hashTagsInput.addEventListener('input', (event) => {
  const input = event.target;
  const inputValue = input.value;
  checkSpace(inputValue, SHARP);
  if (checkReg(inputValue, SPACE)) {
    input.setCustomValidity('Хэштег может состоять только из букв и чисел, должен начинаться с символа #, и не должен превышать 20 символов');
    colouringBorder(hashTagsInput);
  } else if (searchSpace(inputValue, SHARP)) {
    input.setCustomValidity('В Хэштеге не может быть пробелов');
    colouringBorder(hashTagsInput);
  } else if (!checkSpace(inputValue, SPACE)) {
    input.setCustomValidity('Хэштеги должны быть разделены пробелами');
    colouringBorder(hashTagsInput);
  } else if (compareHashTag(inputValue, SPACE)) {
    input.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
    colouringBorder(hashTagsInput);
  } else if (calculateHashTag(inputValue, SHARP)) {
    input.setCustomValidity('Хэштегов не может быть больше пяти');
    colouringBorder(hashTagsInput);
  } else {
    input.setCustomValidity('');
    createHashArrayTags(inputValue, SHARP, SPACE);
  }
  input.reportValidity();
});

//Отмена нажатия Esc при фокусе в инпуте
const prohibitClose = (evt) => {
  if (evt.keyCode === KEY_ESC) {
    evt.stopPropagation();
  }
};

hashTagsInput.addEventListener('keydown', (evt) => {
  prohibitClose(evt);
});

description.addEventListener('keydown', (evt) => {
  prohibitClose(evt);
});

//Отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendPost(
    deleteClassForm,
    new FormData(evt.target),
  );
});
