import {createDescription} from './data.js';
import {createPictures} from './pictures.js';
import {isEscapeKey} from './util.js';

const DESCRIPTIONS = createDescription();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

//создание галереи и попапа с изображением
createPictures(DESCRIPTIONS, pictureTemplate, picturesContainer);

//создание массива с превью, для того чтобы повесить на них событие по открытию полноэкранного попапа
const PREVIEWS = Array.from(picturesContainer.children).filter((preview) => {
  if (preview.classList.contains('picture')) {
    return true;
  }
});

const picturePopup = document.querySelector('.big-picture');
const popupCancel = picturePopup.querySelector('#picture-cancel');

const onPopupEcsKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePopup();
  }
};

const closePopup = () => {
  picturePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', (onPopupEcsKeydown));
};

const openPopup = () => {
  document.body.classList.add('modal-open');
  picturePopup.classList.remove('hidden');
  document.addEventListener('keydown', (onPopupEcsKeydown));
};

PREVIEWS.forEach((preview) => {
  preview.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup();
  });
});

popupCancel.addEventListener('click', () => {
  closePopup();
});
