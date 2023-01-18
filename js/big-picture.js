const picturePopup = document.querySelector('.big-picture');

const getPopup = (obj) => {

  const image = picturePopup.querySelector('.big-picture__img').querySelector('img');
  const likesCount = picturePopup.querySelector('.likes-count');
  const commentsCount = picturePopup.querySelector('.comments-count');
  const descriptionPhoto = picturePopup.querySelector('.social__caption');
  const comments = picturePopup.querySelector('.social__comments');
  image.src = obj.url;
  likesCount.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
  descriptionPhoto.textContent = obj.description;
  comments.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();

  obj.comments.forEach((comment) => {
    const listItem = document.createElement('li');
    listItem.classList.add('social__comment');
    commentsFragment.appendChild(listItem);
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = '35';
    img.height = '35';
    listItem.appendChild(img);
    const paragraph = document.createElement('p');
    paragraph.classList.add('social__text');
    paragraph.textContent = comment.message;
    listItem.appendChild(paragraph);
    comments.appendChild(commentsFragment);
  });
};

export {getPopup};
