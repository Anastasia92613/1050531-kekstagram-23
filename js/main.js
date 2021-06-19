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
getRandomNumber(-5, 0);
//источник метода для возврата целого числа https://myrusakov.ru/js-random-numbers.html

//проверка на максимальную длину строки
function stringLength(string, max) {
  const COUNT = string.length;
  if (COUNT <= max) {
    return true;
  }
  return false;
}

stringLength('Длина строки', 140);

const DESCRIPTION_PHOTO = [
  'Мы, кислые зеленые яблоки, живем своей непостежимой беззаботной жизнью',
  'А когда тебя держит за лапу другая лапа - какая разница, что там',
  '- Мне нравится ваш оптимихм. Постараюсь отрастить себе такой же... Чем вы его поливаете? - Кровью несчастных жертв!',
  'Опять забыл где я припоркавал свой стеклянный лифт...',
  '- Мой сад - это мой сад, - сказал Великан, - и каждому это должно быть ясно, и, уж конечно, никому, кроме самого себя, я не позволю здесь играть!',
  '- Да это сама жизнь! - воскликнул он и быстро обернулся, чтобы взглянуть на свою возлюбленную. Она была мертва.',
  '- Это что такое? - Ваше Величество они хотели... - Ну все ясно - отрубите им головы.',
  'Оно, конечно, если что, но, тем не менее, однако!',
  'Обвиняя себя, ты можешь просто пожать плечами и забыть.',
  'Дорога в ад вымощена... в отличие от дороги в рай, и райцентр',
  'Ничто не возвышает человека над толпой, как виселица',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Пирожок',
  'Штаны удачи',
  'Шнобби Шноббс',
  'Ринсвид',
  'Веренс I',
  'Изабель',
  'Люпита',
  'Вашингтон',
  'Коэн-Варвар',
  'Мор',
];

const SIMILAR_POST_COUNT = 25;

//Создание случайного поста в Кекстограмме
const createPost = () => {
  return {
    id: getRandomNumber(1, 25),
    url: 'photos/' + getRandomNumber(1, 25) + '.jpg',
    description: DESCRIPTION_PHOTO[getRandomNumber(0, 10)],
    likes: getRandomNumber(15, 200),
    comments: {
      id: getRandomNumber(1, 25),
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: MESSAGE[getRandomNumber(0, 5)] + MESSAGE[getRandomNumber(0, 5)],
      name: NAME[getRandomNumber(0, 9)],
    }
  }
};

const similarPost = new Array(SIMILAR_POST_COUNT).fill(null).map(() => createPost());
