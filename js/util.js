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

export { getRandomNumber, stringLength, buttonClose, isEscEvent};
