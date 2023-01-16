import {createDescription} from './data.js';
import {getPopup, createComments} from './big-picture.js';

const DESCRIPTIONS_ARRAY = createDescription();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

//создание превью миниатюр
DESCRIPTIONS_ARRAY.forEach((description) => {
  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');
  img.src = description.url;
  likes.textContent = description.likes;
  comments.textContent = description.comments.length;
  pictureFragment.appendChild(picture);
});

picturesContainer.appendChild(pictureFragment);

//создание массива с превью, для того чтобы повесить на них событие по открытию полноэкранного попапа
const PREVIEWS = Array.from(picturesContainer.children).filter((preview) => {
  if (preview.classList.contains('picture')) {
    return true;
  }
});

//создание массива с комментариями
const COMMENTS_SET = DESCRIPTIONS_ARRAY.map((description) => description.comments);

//вешаем событие на превью и получаем данные из массивов, с использованием функции для создания попапа и комментариев
PREVIEWS.forEach((preview, i) => {
  const imgUrl = DESCRIPTIONS_ARRAY[i].url;
  const likes = DESCRIPTIONS_ARRAY[i].likes;
  const commentsNumber = DESCRIPTIONS_ARRAY[i].comments.length;
  const description = DESCRIPTIONS_ARRAY[i].description;
  const COMMENTS = COMMENTS_SET[i];

  preview.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.body.classList.add('modal-open');
    getPopup(imgUrl, likes, commentsNumber, description);
    createComments(COMMENTS);
  });
});

//закрытие попапа по нажатию esc
document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    const picturePopup = document.querySelector('.big-picture');
    picturePopup.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
