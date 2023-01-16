const picturePopup = document.querySelector('.big-picture');
const popupCancel = picturePopup.querySelector('#picture-cancel');
const image = picturePopup.querySelector('.big-picture__img').querySelector('img');
const likesCount = picturePopup.querySelector('.likes-count');
const commentsCount = picturePopup.querySelector('.comments-count');
const descriptionPhoto = picturePopup.querySelector('.social__caption');
//список с комментариями
const comments = picturePopup.querySelector('.social__comments');

//функция создания попапа
const getPopup = (url, likes, commentsNumber, description) => {
  picturePopup.classList.remove('hidden');
  image.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = commentsNumber;
  descriptionPhoto.textContent = description;

  popupCancel.addEventListener('click', () => {
    picturePopup.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
};

//функция создания комментариев в попапе
const createComments = (array) => {
  comments.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  array.forEach((element) => {
    const commentsItem = document.createElement('li');
    commentsItem.classList.add('social__comment');
    commentsFragment.appendChild(commentsItem);
    const socialCommentImg = document.createElement('img');
    socialCommentImg.classList.add('social__picture');
    socialCommentImg.src = element.avatar;
    socialCommentImg.alt = element.name;
    socialCommentImg.width = '35';
    socialCommentImg.height = '35';
    commentsItem.appendChild(socialCommentImg);
    const socialCommentText = document.createElement('p');
    socialCommentText.classList.add('social__text');
    socialCommentText.textContent = element.message;
    commentsItem.appendChild(socialCommentText);
    comments.appendChild(commentsFragment);
  });
};

export {getPopup, createComments};
