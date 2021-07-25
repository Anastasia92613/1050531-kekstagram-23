import { openBigPicture, getBigPicture, getComment, addComments, countingСomments, getCountComment } from './big-picture.js';
import './slider.js';
// import { debounce } from './utils/debounce.js';

let clickIndex = 0;
let similarPreviews = [];

const createPost = (arrayPosts) => {
  //Создание превью
  const pictureListElement = document.querySelector('.pictures');
  const similarPreviewPicture = document.querySelector('#picture').content.querySelector('.picture');
  const pictureListFragment = document.createDocumentFragment();
  const commentsLoader = document.querySelector('.comments-loader');
  const countComment = 5;
  let comIndex = 0;

  similarPreviews = arrayPosts;

  //перебор массива и создание превью
  const createPreviewPhoto = () => {
    const test = document.querySelectorAll('.picture');
    test.forEach((element) => {
      element.parentNode.removeChild(element);
    });
    similarPreviews.forEach(({ url, likes, comments }) => {
      const previewElement = similarPreviewPicture.cloneNode(true);
      previewElement.querySelector('.picture__img').src = url;
      previewElement.querySelector('.picture__likes').textContent = likes;
      previewElement.querySelector('.picture__comments').textContent = comments.length;
      pictureListElement.appendChild(previewElement);
    });
    pictureListElement.appendChild(pictureListFragment);
  };

  createPreviewPhoto();

  //Подсчет количества показанных комментариев
  const calculateComm = (count) => {
    getCountComment(count);
  };

  //Создание пяти комментариев
  const createFiveComment = (comments) => {
    const fragment = document.createDocumentFragment();
    const commentList = comments.slice(comIndex, countComment + comIndex);
    if (comments.length <= countComment + comIndex) {
      calculateComm(comments.length);
    } else {
      calculateComm(countComment + comIndex);
    }
    commentList.forEach((comment) => fragment.appendChild(getComment(comment.message, comment.avatar, comment.name)));
    countingСomments(comments.length, countComment + comIndex);
    return fragment;
  };

  //Создание фрагмента с комментариями
  const createFragmentComments = () => {
    const postComments = [];
    similarPreviews.forEach((post) => {
      postComments.push(createFiveComment(post.comments));
    });
    return postComments;
  };

  commentsLoader.addEventListener('click', () => {
    comIndex += countComment;
    const lastFiveComment = createFiveComment(similarPreviews[clickIndex].comments);
    addComments(lastFiveComment);
  });

  //Добавление описание к фото
  const createDescriptionPhoto = () => {
    const descriptionsPhotos = [];
    similarPreviews.forEach((post) => descriptionsPhotos.push(post.description));
    return descriptionsPhotos;
  };

  const listenerClickPreview = () => {
    const previewPictures = document.querySelectorAll('.picture');
    previewPictures.forEach((preview, index) => {
      preview.addEventListener('click', () => {
        comIndex = 0;
        clickIndex = index;
        openBigPicture();
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
        countingСomments(countComm, countComment);
      });
    });
  };

  listenerClickPreview();
};

export { createPost };
