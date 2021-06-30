import { DESCRIPTION_PHOTO, MESSAGE, NAME } from './data.js';
import { getRandomNumber } from './util.js';

//Создание случайного поста в Кекстограмме
const createPost = () => {
  const randomLengthArray = new Array(getRandomNumber(1, 10)).fill(null);
  return {
    id: getRandomNumber(1, 25),
    url: `photos/${getRandomNumber(1, 25)}.jpg`,
    description: DESCRIPTION_PHOTO[getRandomNumber(0, 10)],
    likes: getRandomNumber(15, 200),
    comments: randomLengthArray.map(() => ({
      id: getRandomNumber(1, 25),
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: MESSAGE[getRandomNumber(0, 5)] + MESSAGE[getRandomNumber(0, 5)],
      name: NAME[getRandomNumber(0, 9)],
    }),
    ),
  };
};

export { createPost };
