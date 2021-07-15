import { createPost } from './picture-preview.js';
import { getRandomNumber } from './util.js';

let originalArrayposts = [];

const getPost = (posts) => {

  originalArrayposts = posts;

  createPost(originalArrayposts);

  //Сортировка по количеству комментариев
  const sortingComments = () => {
    const arrayPosts = originalArrayposts.slice();
    arrayPosts.sort((first, second) => second.comments.length - first.comments.length);
    return arrayPosts;
  };

  //10 случайных не повторяющихся постов
  const countElementArray = 10;
  const minValue = 0;
  const maxValue = originalArrayposts.length - 1;

  const randomPost = () => {
    const arrayPosts = originalArrayposts.slice();
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

  const sortFunction = (order) => {
    switch (order) {
      case discussed:
        defaultItem.classList.remove('img-filters__button--active');
        randomItem.classList.remove('img-filters__button--active');
        discussed.classList.add('img-filters__button--active');
        return createPost(sortingComments());
      case randomItem:
        defaultItem.classList.remove('img-filters__button--active');
        discussed.classList.remove('img-filters__button--active');
        return createPost(randomPost());
      case defaultItem:
        randomItem.classList.remove('img-filters__button--active');
        discussed.classList.remove('img-filters__button--active');
        defaultItem.classList.add('img-filters__button--active');
        return createPost(originalArrayposts);
    }
  };

  form.addEventListener('click', (evt) => {
    sortFunction(evt.target);
  });
};

export { getPost };
