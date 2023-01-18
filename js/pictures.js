import {getPopup} from './big-picture.js';

//функция для создания галереи и попапа

const createPictures = (array, template, container) => {
  array.forEach((element) => {
    const pictureFragment = document.createDocumentFragment();
    const picture = template.cloneNode(true);
    const img = picture.querySelector('.picture__img');
    const likes = picture.querySelector('.picture__likes');
    const comments = picture.querySelector('.picture__comments');
    img.src = element.url;
    likes.textContent = element.likes;
    comments.textContent = element.comments.length;
    pictureFragment.appendChild(picture);
    container.appendChild(pictureFragment);

    picture.addEventListener('click', () => {
      getPopup(element);
    });
  });
};

export {createPictures};
