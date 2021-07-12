import { createPost } from './post.js';
import { openingBigPicture, getBigPicture, getComment, addComments, countingСomments, getCountComment } from './big-picture.js';
import './slider.js';

const SIMILAR_POST_COUNT = 26;
let clickIndex = 0;
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

const commentsLoader = document.querySelector('.comments-loader');
let comIndex = 0;
const countComment = 5;

//Подсчет количества показанных комментариев
const coutigComm = (count) => {
  getCountComment(count);
};

//Создание пяти комментариев
const createFiveComment = (comments) => {
  const fragment = document.createDocumentFragment();
  const commentList = comments.slice(comIndex, countComment + comIndex);
  if (comments.length <= countComment + comIndex) {
    coutigComm(comments.length);
  } else {
    coutigComm(countComment + comIndex);
  }
  commentList.forEach((comment) => fragment.appendChild(getComment(comment.message, comment.avatar, comment.name)));
  countingСomments(comments.length, countComment + comIndex);
  return fragment;
};

//Создание фрагмента с комментариями
const createFragmentComments = () => {
  const postComments = [];
  similarPreview.forEach((post) => {
    postComments.push(createFiveComment(post.comments));
  });
  return postComments;
};

commentsLoader.addEventListener('click', () => {
  comIndex += countComment;
  const lastFiveComment = createFiveComment(similarPreview[clickIndex].comments);
  addComments(lastFiveComment);
});

//Добавление описание к фото
const createDescriptionPhoto = () => {
  const descriptionsPhoto = [];
  similarPreview.forEach((post) => descriptionsPhoto.push(post.description));
  return descriptionsPhoto;
};

previewPictures.forEach((preview, index) => {
  preview.addEventListener('click', () => {
    comIndex = 0;
    clickIndex = index;
    openingBigPicture();
    const imageSRC = preview.querySelector('.picture__img').src;
    const countLikes = preview.querySelector('.picture__likes').textContent;
    const countComm = preview.querySelector('.picture__comments').textContent;
    const fragmentComments = createFragmentComments()[index];
    const descriptionPhoto = createDescriptionPhoto()[index];
    if (countComm <= countComment) {
      getCountComment(countComm);
    } else {
      getCountComment(countComment);
    }
    getBigPicture(imageSRC, countLikes, countComm, fragmentComments, descriptionPhoto);
    countingСomments(countComm , countComment);
  });
});
