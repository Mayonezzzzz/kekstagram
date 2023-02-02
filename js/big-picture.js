import { onPopupEcsKeydown } from './gallery.js';

const picturePopup = document.querySelector('.big-picture');
const commentsLoader = picturePopup.querySelector('.comments-loader');
const socialCommentsCount = picturePopup.querySelector('.social__comment-count');
const COMMENTS_PER_PORTION = 5;
let commentsShow = 0;
let commentsArr = [];

const createComment = (elem) => {
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = elem.avatar;
  img.alt = elem.name;
  img.width = '35';
  img.height = '35';
  listItem.appendChild(img);
  const paragraph = document.createElement('p');
  paragraph.classList.add('social__text');
  paragraph.textContent = elem.message;
  listItem.appendChild(paragraph);

  return listItem;
};

const getComments = () => {
  commentsShow += COMMENTS_PER_PORTION;
  const commentsContainer = picturePopup.querySelector('.social__comments');

  if (commentsShow >= commentsArr.length) {
    commentsLoader.classList.add('hidden');
    commentsShow = commentsArr.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShow; i++) {
    const commentElement = createComment(commentsArr[i]);
    commentsFragment.append(commentElement);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
  socialCommentsCount.innerHTML = `${commentsShow} из <span class="comments-count">${commentsArr.length}</span> комментариев`;
};

const getPopup = (obj) => {

  const image = picturePopup.querySelector('.big-picture__img').querySelector('img');
  const likesCount = picturePopup.querySelector('.likes-count');
  const descriptionPhoto = picturePopup.querySelector('.social__caption');

  picturePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEcsKeydown);
  commentsShow = 0;
  image.src = obj.url;
  likesCount.textContent = obj.likes;
  descriptionPhoto.textContent = obj.description;

  commentsArr = obj.comments;
  getComments();
};


commentsLoader.addEventListener('click', () => {
  getComments();
});

export {getPopup};
