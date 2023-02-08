import {createPictures} from './pictures.js';
import {isEscapeKey} from './util.js';
import { getData } from './api.js';

const errorLoad = (string) => {
  const block = document.createElement('div');
  block.style.width = '600px';
  block.style.height = '300px';
  block.style.backgroundColor = 'black';
  block.style.zIndex = '100';
  block.style.position = 'fixed';
  block.style.top = '30%';
  block.style.left = '34%';
  block.style.display = 'flex';
  block.style.alignItems = 'center';
  block.style.justifyContent = 'center';
  const paragraph = document.createElement('p');
  paragraph.textContent = string;
  paragraph.style.color = 'white';
  paragraph.style.textAlign = 'center';
  paragraph.style.fontSize = '40px';
  paragraph.style.lineHeight = '60px';
  block.append(paragraph);

  document.querySelector('body').appendChild(block);

  setTimeout(() => {
    block.remove();
  }, 7000);
};

getData(createPictures, errorLoad);

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
