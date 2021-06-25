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
// getRandomNumber(-5, 0);
//источник метода для возврата целого числа https://myrusakov.ru/js-random-numbers.html

//проверка на максимальную длину строки
function stringLength(string, max) {
  const COUNT = string.length;
  if (COUNT <= max) {
    return true;
  }
  return false;
}

// stringLength('Длина строки', 140);

export { getRandomNumber, stringLength };
