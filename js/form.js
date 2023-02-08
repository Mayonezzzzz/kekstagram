import {isEscapeKey} from './util.js';
import './scale.js';
import './effects.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';


const form = document.querySelector('.img-upload__form');
const imgUpload = form.querySelector('.img-upload__overlay');
const uploadFile = form.querySelector('#upload-file');
const closeButtonForm = form.querySelector('.img-upload__cancel');
const commentsField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('#upload-submit');

const isFocused = () => document.activeElement === commentsField || document.activeElement === hashtagsField;

const onPopupEcsKeydown = (evt) => {
  if (isEscapeKey (evt) && !isFocused()) {
    // eslint-disable-next-line no-use-before-define
    closeForm();
  }
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const closeForm = () => {
  form.reset();
  pristine.reset();
  document.body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
  document.removeEventListener('keydown', (onPopupEcsKeydown));
};

const openForm = () => {
  document.body.classList.add('modal-open');
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', (onPopupEcsKeydown));
  resetScale();
  resetEffects();
};

const regEx = /[^а-яёЁА-Яa-zA-Z0-9]/g;

const validLength = (tags) => tags.length <= 5;

const validTagSymbols = (string) => !regEx.test(string.slice(1));

const validTagLength = (string) => string.length >=2 && string.length <= 20;

const isHashTag = (string) => string[0] === '#';

const validTag = (tag) => validTagSymbols(tag) && validTagLength(tag) && isHashTag(tag);

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim());
  return validLength(tags) && hasUniqueTags(tags) && tags.every(validTag);
};

pristine.addValidator(
  hashtagsField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

const onSendSuccess = () => {
  closeForm();
  const succesTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = succesTemplate.cloneNode(true);
  document.querySelector('body').appendChild(successMessage);

  const onMessageSuccessEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      // eslint-disable-next-line no-use-before-define
      closeSuccesMessage();
    }
  };

  const onMessageSuccessMouseDown = (evt) => {
    if (evt.target.classList.contains('success')) {
      // eslint-disable-next-line no-use-before-define
      closeSuccesMessage();
    }
  };

  const closeSuccesMessage = () => {
    successMessage.remove();
    document.removeEventListener('keydown', onMessageSuccessEscKeydown);
    document.removeEventListener('click', onMessageSuccessMouseDown);
  };

  const onSuccessButtonClick = (evt) => {
    if (evt.target.classList.contains('success__button')) {
      closeSuccesMessage();
    }
  };

  successMessage.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onMessageSuccessEscKeydown);
  document.addEventListener('click', onMessageSuccessMouseDown);
};

const onSendFail = () => {
  const failTemtate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = failTemtate.cloneNode(true);
  document.querySelector('body').appendChild(errorMessage);
  document.removeEventListener('keydown', onPopupEcsKeydown);

  const onMessageFailEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      // eslint-disable-next-line no-use-before-define
      closeFailMessage();
    }
  };

  const onMessageFailMouseDown = (evt) => {
    if (evt.target.classList.contains('error')) {
      // eslint-disable-next-line no-use-before-define
      closeFailMessage();
    }
  };

  const closeFailMessage = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onMessageFailEscKeydown);
    document.removeEventListener('click', onMessageFailMouseDown);
    document.addEventListener('keydown', onPopupEcsKeydown);
  };

  const onFailButtonClick = (evt) => {
    if (evt.target.classList.contains('error__button')) {
      closeFailMessage();
    }
  };

  errorMessage.addEventListener('click', onFailButtonClick);
  document.addEventListener('keydown', onMessageFailEscKeydown);
  document.addEventListener('click', onMessageFailMouseDown);
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      disableSubmitButton();
      await cb(new FormData(form));
      enableSubmitButton();
    }
  });
};

uploadFile.addEventListener('change', openForm);
closeButtonForm.addEventListener('click', closeForm);

export {setOnFormSubmit, onSendSuccess, onSendFail};
