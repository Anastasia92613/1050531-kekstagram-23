import { getPost } from './picture-preview.js';
import { showAlert, showAlertErr } from './util.js';
import {delClassForm} from './download-form.js';

//Получение картинок с сервера
const getPosts = () => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')

    .then((response) => {
      if (response.ok) {
        response.json().then((posts) => getPost(posts));
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

const sendPost = (body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        delClassForm(),
        showAlert(templateAlertOk,formOk, successOk, buttonOk);
      } else {
        delClassForm();
        showAlert(templateAlertErr, formErr, successErr, buttonErr);
      }
    })
    .catch(() => {
      showAlert(templateAlertErr, formErr, successErr, buttonErr);
    });
};

export { sendPost };
