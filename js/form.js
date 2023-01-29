import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const imgUpload = form.querySelector('.img-upload__overlay');
const uploadFile = form.querySelector('#upload-file');
const closeButtonForm = form.querySelector('.img-upload__cancel');
const commentsField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');

const isFocused = () => document.activeElement === commentsField || document.activeElement === hashtagsField;

const onPopupEcsKeydown = (evt) => {
  if (isEscapeKey (evt) && !isFocused()) {
    closeForm();
  }
};

const closeForm = () => {
  document.body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
  document.removeEventListener('keydown', (onPopupEcsKeydown));
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const openForm = () => {
  form.reset();
  pristine.reset();
  document.body.classList.add('modal-open');
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', (onPopupEcsKeydown));
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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadFile.addEventListener('change', openForm);
closeButtonForm.addEventListener('click', closeForm);
form.addEventListener('submit', onFormSubmit);

