const image = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(sliderElement, {
  range: {
    min:DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

const isDefauitEffect = () => currentEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step
  });

  if(isDefauitEffect()) {
    sliderElement.classList.add('hidden');
  }
};

const defaultHidden = () => {
  if(isDefauitEffect()) {
    sliderElement.classList.add('hidden');
  }
};

defaultHidden();

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

const onMiniatureClick = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    updateSlider();
  }
};

const onSliderChange = () => {
  image.style.filter = 'none';
  image.className = '';
  valueElement.value = '';
  const sliderValue = sliderElement.noUiSlider.get();
  image.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  image.classList.add(`effects__preview--${currentEffect.name}`);
  valueElement.value = sliderValue;
};

form.addEventListener('change', onMiniatureClick);
sliderElement.noUiSlider.on('update', onSliderChange);

export {resetEffects};
