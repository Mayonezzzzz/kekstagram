const FILE_TYPES = ['jpg','jpeg','png','gif'];
const photoPrewiev = document.querySelector('.img-upload__preview img');
const effectPrewievs = document.querySelectorAll('.effects__preview');
const fileField = document.querySelector('#upload-file');

fileField.addEventListener('change', () => {
  const file = fileField.files[0];

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPrewiev.src = URL.createObjectURL(file);
    effectPrewievs.forEach((prewiev) => {
      prewiev.style.backgroundImage = `url('${photoPrewiev.src}')`;
    });
  }
});
