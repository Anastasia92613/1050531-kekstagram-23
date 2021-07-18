import { createPost } from './picture-preview.js';
import { getRandomNumber } from './util.js';
import { debounce } from './utils/debounce.js';

let originalArrayPosts = [];

const getPost = (posts) => {

  originalArrayPosts = posts;

  createPost(originalArrayPosts);

  //Сортировка по количеству комментариев
  const sortingComments = () => {
    const arrayPosts = originalArrayPosts.slice();
    arrayPosts.sort((first, second) => second.comments.length - first.comments.length);
    return arrayPosts;
  };

  //10 случайных не повторяющихся постов
  const countElementArray = 10;
  const minValue = 0;
  const maxValue = originalArrayPosts.length - 1;

  const randomPost = () => {
    const arrayPosts = originalArrayPosts.slice();
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    const unique = arrayPosts.filter(onlyUnique);
    const randomArray = [];
    for (let index = 0; randomArray.length < countElementArray; index++) {
      const random = getRandomNumber(minValue, maxValue);
      randomArray.push(unique[random]);
    }
    return randomArray;
  };

  const form = document.querySelector('.img-filters__form');
  const discussed = form.querySelector('#filter-discussed');
  const randomItem = form.querySelector('#filter-random');
  const defaultItem = form.querySelector('#filter-default');

  const RERENDER_DELAY = 500;

  const sortFunction = (order) => {
    switch (order) {
      case discussed:
        defaultItem.classList.remove('img-filters__button--active');
        randomItem.classList.remove('img-filters__button--active');
        discussed.classList.add('img-filters__button--active');
        createPost(sortingComments());
        break;
      case randomItem:
        defaultItem.classList.remove('img-filters__button--active');
        discussed.classList.remove('img-filters__button--active');
        randomItem.classList.add('img-filters__button--active');
        createPost(randomPost());
        break;
      case defaultItem:
        randomItem.classList.remove('img-filters__button--active');
        discussed.classList.remove('img-filters__button--active');
        defaultItem.classList.add('img-filters__button--active');
        createPost(originalArrayPosts);
        break;
    }
  };

  form.addEventListener('click', debounce(
    (evt) => sortFunction(evt.target),
    RERENDER_DELAY),
  );
};

export { getPost };
