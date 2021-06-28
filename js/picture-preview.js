import { createPost } from './post.js';

const SIMILAR_POST_COUNT = 26;

//Создание массива с постами
const similarPost = new Array(SIMILAR_POST_COUNT).fill(null).map(() => createPost());

//Создание превью
const pictureListElement = document.querySelector('.pictures');
const similarPreviewPicture = document.querySelector('#picture').content.querySelector('.picture');
const similarPreview = similarPost;
const pictureListFragment = document.createDocumentFragment();

//перебор массива и создание превью
similarPreview.forEach(({ url, likes, comments }) => {
  const previewElement = similarPreviewPicture.cloneNode(true);
  previewElement.querySelector('.picture__img').src = url;
  previewElement.querySelector('.picture__likes').textContent = likes;
  previewElement.querySelector('.picture__comments').textContent = comments.length;
  pictureListElement.appendChild(previewElement);
});

pictureListElement.appendChild(pictureListFragment);
