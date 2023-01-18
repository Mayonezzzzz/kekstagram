const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//const checkStringLength = (string, length) => string.length <= length;

const getRandomArrayElements = (array) => array[getRandomNumber(0,array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, getRandomArrayElements, isEscapeKey};
