// import { getPost } from './picture-preview.js';
import { getPost } from './sort.js';
import { showAlert, showAlertErr } from './util.js';

//Получение картинок с сервера
const filters = document.querySelector('.img-filters');
const getPosts = () => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')

    .then((response) => {
      if (response.ok) {
        response.json().then((posts) => getPost(posts));
        filters.classList.remove('img-filters--inactive');
      } else {
        showAlertErr('Что-то пошло не так. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      showAlertErr('Что-то пошло не так. Попробуйте ещё раз');
    });
};
getPosts();

const templateAlertOk = document.querySelector('#success');
const formOk = '.success';
const successOk = 'success';
const buttonOk = 'success__button';

const templateAlertErr = document.querySelector('#error');
const formErr = '.error';
const successErr = 'error';
const buttonErr = 'error__button';

const sendPost = (closeForm, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      closeForm();
      if (response.ok) {
        showAlert(templateAlertOk,formOk, successOk, buttonOk);
      } else {
        showAlert(templateAlertErr, formErr, successErr, buttonErr);
      }
    })
    .catch(() => {
      showAlert(templateAlertErr, formErr, successErr, buttonErr);
    });
};

export { sendPost };
