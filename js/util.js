//получение рандомного числа из диапазона
function getRandomNumber(min, max) {
  if (min < 0) {
    min = min * -1;
  }
  if (max < 0) {
    max = max * -1;
  }
  if (min > max) {
    const TEMP = min;
    min = max;
    max = TEMP;
  }
  if (min === max) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//источник метода для возврата целого числа https://myrusakov.ru/js-random-numbers.html

//проверка на максимальную длину строки
function stringLength(string, max) {
  const COUNT = string.length;
  if (COUNT <= max) {
    return true;
  }
  return false;
}

//Кнопка закрытия
const buttonClose = (selector, removeClass) => {
  selector.addEventListener('click', () => {
    removeClass();
  });
};

//Закрытие по Esc
const isEscEvent = (removeClass) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      removeClass();
    }
  });
};


// const getArray = (someObject) => {
//   Object.fromEntries(someObject);
//   return someObject;
// };

//Сообщение при ошибке загрузки превью
const ALERT_SHOW_TIME = 5000;

const showAlertErr = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#FF4D4D';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//Сообщение при отправке формы
const showAlert = (templateAlert, classOk, success, button) => {
  const alert = templateAlert.cloneNode(true);
  document.body.appendChild(alert.content);
  const form = document.querySelector(classOk);
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(success) || evt.target.classList.contains(button)) {
      form.remove();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      form.remove();
    }
  });
};

export { getRandomNumber, stringLength, buttonClose, isEscEvent, showAlertErr, showAlert};
