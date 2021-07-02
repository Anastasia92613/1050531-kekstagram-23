import { createPost } from './post.js';
import { openingBigPicture, getBigPicture, getComment } from './big-picture.js';

const SIMILAR_POST_COUNT = 26;

//Создание массива с постами
const similarPost = new Array(SIMILAR_POST_COUNT).fill(null).map((el, key) => createPost(key));

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

//поиск миниатюр
const previewPictures = document.querySelectorAll('.picture');

//Создание фрагмента с комментариями
const createFragmentComments = () => {
  const postComments = [];
  similarPreview.forEach((post) => {
    const fragment = document.createDocumentFragment();
    const commentLis = post.comments;
    commentLis.forEach((comment) => fragment.appendChild(getComment(comment.message, comment.avatar)));
    postComments.push(fragment);
  });
  return postComments;
};

//Добавление описание к фото
const createDescriptionPhoto = () => {
  const descriptionsPhoto = [];
  similarPreview.forEach((post) => descriptionsPhoto.push(post.description));
  return descriptionsPhoto;
};

previewPictures.forEach((preview, index) => {
  preview.addEventListener('click', () => {
    openingBigPicture();
    const imageSRC = preview.querySelector('.picture__img').src;
    const countLikes = preview.querySelector('.picture__likes').textContent;
    const countComm = preview.querySelector('.picture__comments').textContent;
    const fragmentComments = createFragmentComments()[index];
    const descriptionPhoto = createDescriptionPhoto()[index];
    getBigPicture(imageSRC, countLikes, countComm, fragmentComments, descriptionPhoto);
  });
});
