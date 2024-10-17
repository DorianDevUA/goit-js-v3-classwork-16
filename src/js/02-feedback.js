import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/feedback-form.css';

const refs = {
  feedbackForm: document.querySelector('.js-feedback-form'),
  userName: document.querySelector('.js-feedback-form input[name="name"]'),
  userMsg: document.querySelector('.js-feedback-form textarea[name="message"]'),
  hbsContainer: document.querySelector('.js-hbs'),
};

const STORAGE_KEY = 'feedback';
const formData = getDataFromLocalStorage(STORAGE_KEY) || { name: '', message: '' };

refs.feedbackForm.addEventListener('submit', handleFormSubmit);
refs.feedbackForm.addEventListener('input', throttle(handleInputChange, 300));

populateFormFields();

function handleFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const { name, message } = form.elements;
  console.log(`Name: ${name.value}\nMessage: ${message.value}`);

  form.reset();
  resetFormData();
  localStorage.removeItem(STORAGE_KEY);
}

function handleInputChange(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormFields() {
  refs.userName.value = formData.name || '';
  refs.userMsg.value = formData.message || '';
}

function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);

  if (!data) {
    return;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

function resetFormData() {
  formData.name = '';
  formData.message = '';
}
