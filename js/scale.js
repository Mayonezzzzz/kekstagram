const image = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');
const DEFAULT_SCALE = 100;
const reduceScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const scaleStep = 25;
const minValue = 25;
const maxValue = 100;

const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value/100})`;
  scaleInput.value = `${value}%`;
};

const onReduseScaleButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - scaleStep;
  if(newValue < minValue) {
    newValue = minValue;
  }
  scaleImage(newValue);
};

const onIncreaseScaleButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + scaleStep;
  if(newValue > maxValue) {
    newValue = maxValue;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage();
};

reduceScaleButton.addEventListener('click', onReduseScaleButtonClick);
increaseScaleButton.addEventListener('click', onIncreaseScaleButtonClick);

export {resetScale};
