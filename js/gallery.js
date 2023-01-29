import {createDescription} from './data.js';
import {createPictures} from './pictures.js';
import {isEscapeKey} from './util.js';

const DESCRIPTIONS = createDescription();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

//создание галереи и попапа с изображением
createPictures(DESCRIPTIONS, pictureTemplate, picturesContainer);

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

popupCancel.addEventListener('click', () => {
  closePopup();
});

export {closePopup, onPopupEcsKeydown};
