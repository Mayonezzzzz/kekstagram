import {getRandomNumber, getRandomArrayElements} from './util.js';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артем',
  'Маша',
  'Игорь',
  'Анна',
  'Венниамин',
  'Игнат',
  'Изольда',
  'Таня',
  'Виктор',
  'Данил',
  'Ирина',
  'Дмитрий',
  'Юлия'
];

const DESCRIPTION_PHOTO = [
  'крутое место',
  'в шоке',
  'а как вам',
  'где это?',
  'как давно',
  'усталость',
  'отдых',
  'красиво',
  'очень хорошо'
];

const NUMBER_OF_DESCRIPTION = 25;
const MAX_NUMBER_OF_COMMENTS = 10;

const createComments = () => {
  const comments = [];
  for(let i = 0; i < getRandomNumber(1, MAX_NUMBER_OF_COMMENTS); i++) {
    comments.push(
      {
        id: i + 1,
        avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
        message: getRandomArrayElements(COMMENTS),
        name: getRandomArrayElements(NAMES)
      }
    );
  }
  return comments;
};

const createDescription = () => {
  const photos = [];
  for (let i = 0; i < NUMBER_OF_DESCRIPTION; i++) {
    photos.push(
      {
        id: i + 1,
        url: `photos/${i + 1}.jpg`,
        description: getRandomArrayElements(DESCRIPTION_PHOTO),
        likes: getRandomNumber(15,200),
        comments: createComments()
      }
    );
  }
  return photos;
};

export {createDescription};
