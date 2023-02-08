const getData = async (onSuccess, onFail) => {
  try {
    const responce = await fetch('https://25.javascript.pages.academy/kekstagram/data',
      {
        cache: 'no-store'
      }
    );

    if (!responce.ok) {
      throw new Error ('Не удалось загрузить фото, попробуйте обновить страницу');
    }

    const data = await responce.json();
    onSuccess(data);
  } catch(error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const responce = await fetch('https://25.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body
      }
    );

    if (!responce.ok) {
      throw new Error;
    }

    onSuccess();
  } catch(error) {
    onFail();
  }
};

export {getData, sendData};
