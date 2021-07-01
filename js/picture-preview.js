import { createPost } from './post.js';
import { openingBigPicture, getBigPicture, getComment} from './big-picture.js';

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

//поиск миниатюр
const previewPictures = document.querySelectorAll('.picture');
const postComments = [];

//Создание фрагмента с комментариями
// const createFragmentComments = function () {
//   const postComments = new Array().fill(null);

//   for (let i = 0; i < similarPost.length; i++) {

//     for (let j = 0; j < commentLis.length; j++) {
//       const itemComment = getComment(commentLis[j].message, commentLis[j].avatar);
//       fragment.appendChild(itemComment);
//     }
//     postComments[i] = fragment;
//   }
//   return postComments;
// };

similarPost.forEach((post)=> {
  const fragment = document.createDocumentFragment();
  const commentLis = post.comments;
  commentLis.forEach((comment) => fragment.appendChild(getComment(comment.message, comment.avatar)));
  postComments.push(fragment);
});


//Добавление описание к фото
const createDescriptionPhoto = function () {
  const descriptionsPhoto = new Array().fill(null);
  for (let i = 0; i < similarPost.length; i++) {
    descriptionsPhoto[i] = similarPost[i].description;
  }
  return descriptionsPhoto;
};

//Подставление данных под большим изображением
for (let i = 0; i < previewPictures.length; i++) {
  previewPictures[i].addEventListener('click', () => {
    openingBigPicture();
    const countLikes = previewPictures[i].querySelector('.picture__likes').textContent;
    const countComm = previewPictures[i].querySelector('.picture__comments').textContent;
    const imageSRC = previewPictures[i].querySelector('.picture__img').src;

    getBigPicture(imageSRC, countLikes, countComm, postComments[i], createDescriptionPhoto()[i]);

  });
}

