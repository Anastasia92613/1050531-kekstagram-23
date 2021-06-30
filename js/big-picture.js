const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const modalOpen = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

//Открытие большого изображения
const openingBigPicture = function () {
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  modalOpen.classList.add('modal-open');
};

//Закрытие большого изображения
bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  modalOpen.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
    commentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    modalOpen.classList.remove('modal-open');
  }
});

//Подставление создание комментариев
const picture = bigPicture.querySelector('.big-picture__img');
const urlBigPicture = picture.querySelector('img');
const likesBigPicture = bigPicture.querySelector('.likes-count');
const countComment = bigPicture.querySelector('.comments-count');
const commentConteiner = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const descriptionPhoto = bigPicture.querySelector('.social__caption');

const getBigPicture = function (url, countLikes, countComm, comments, description) {
  urlBigPicture.src = url;
  likesBigPicture.textContent = countLikes;
  countComment.textContent = countComm;
  commentConteiner.innerHTML = '';
  commentConteiner.appendChild(comments);
  descriptionPhoto.textContent = description;
};

const getComment = function (comment, avatar) {
  const element = socialComment.cloneNode(true);
  element.children[0].src = avatar;
  element.children[1].textContent = comment;
  return element;
};

export { openingBigPicture, getBigPicture, getComment};
