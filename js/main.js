import './gallery.js';
import './form.js';
import './api.js';
import { sendData } from './api.js';
import { setOnFormSubmit, onSendSuccess, onSendFail } from './form.js';

setOnFormSubmit (async (data) => {
  await sendData(onSendSuccess, onSendFail, data);
});


