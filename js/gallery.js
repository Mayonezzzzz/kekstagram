import {createPictures} from './pictures.js';
import {isEscapeKey} from './util.js';
import { debounce } from './util.js';
import { getData } from './api.js';

const imfFiltersForm = document.querySelector('.img-filters__form');
const filterDefault = imfFiltersForm.querySelector('#filter-default');
const filterRandom = imfFiltersForm.querySelector('#filter-random');
const filterDiscussed = imfFiltersForm.querySelector('#filter-discussed');
let newPicturesArray = [];


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

const randomSort = () => Math.random() - 0.5;

const discussedSort = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const sortPictures = (picturesArray, db) => {
  imfFiltersForm.addEventListener('click', (evt) => {
    newPicturesArray = [...picturesArray];
    switch (evt.target.id) {
      case 'filter-default':
        filterDefault.classList.add('img-filters__button--active');
        filterRandom.classList.remove('img-filters__button--active');
        filterDiscussed.classList.remove('img-filters__button--active');
        break;
      case 'filter-random':
        filterDefault.classList.remove('img-filters__button--active');
        filterRandom.classList.add('img-filters__button--active');
        filterDiscussed.classList.remove('img-filters__button--active');
        newPicturesArray = newPicturesArray.sort(randomSort).slice(0, 10);
        break;
      case 'filter-discussed':
        filterDefault.classList.remove('img-filters__button--active');
        filterRandom.classList.remove('img-filters__button--active');
        filterDiscussed.classList.add('img-filters__button--active');
        newPicturesArray = newPicturesArray.sort(discussedSort);
        break;
    }
    db();
  });
};

const renderPictures = (pictures) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  createPictures(pictures);
  sortPictures(pictures, debounce(() => createPictures(newPicturesArray)));
};

getData(renderPictures, errorLoad);

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
