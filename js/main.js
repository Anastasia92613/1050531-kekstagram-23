function getRandomNumber(min, max) {
  if (min < 0) {
    min = min * -1;
  }
  if (max < 0) {
    max = max * -1;
  }
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  if (min == max) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomNumber(-5, 0);
//источник метода для возврата целого числа https://myrusakov.ru/js-random-numbers.html

function stringLength(string, max) {
  let count = string.length;
  if (count <= max) {
    return true;
  }
  return false;
};

stringLength('Длина строки', 140);
