import {getPopup} from './big-picture.js';

//функция для создания галереи и попапа
const removePictures = () => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
};

const createPictures = (array) => {
  removePictures();
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');


  array.forEach((element) => {
    const pictureFragment = document.createDocumentFragment();
    const picture = pictureTemplate.cloneNode(true);
    const img = picture.querySelector('.picture__img');
    const likes = picture.querySelector('.picture__likes');
    const comments = picture.querySelector('.picture__comments');
    img.src = element.url;
    likes.textContent = element.likes;
    comments.textContent = element.comments.length;
    pictureFragment.appendChild(picture);
    picturesContainer.appendChild(pictureFragment);

    picture.addEventListener('click', () => {
      getPopup(element);
    });
  });
};

export {createPictures};
