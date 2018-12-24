'use strict';

const signIn = document.getElementById('tab-1');
const btns = document.querySelectorAll('.login-form .button');

function url() {
  return signIn.checked ? 'https://neto-api.herokuapp.com/signin' : 'https://neto-api.herokuapp.com/signup';
}

function getForm() {
  if (signIn.checked) {
    return document.querySelector('.sign-in-htm');
  } else {
    return document.querySelector('.sign-up-htm');
  }
}

function getData() {
  const formData = new FormData(getForm());
  const obj = {};
  for (const [k, v] of formData) {
    obj[k] = v;
  }
  return obj;
}

function message(request, err = false) {
  const signinMessage = document.querySelector('.sign-in-htm .error-message');
  const signUpMessage = document.querySelector('.sign-up-htm .error-message');
  let msg = '';

  if (err) {
    msg = request.message;
  } else {
    msg = signIn.checked ? `Пользователь ${request.name} успешно авторизован` : `Пользователь ${request.name} успешно зарегистрирован`;
  }

  if (signIn.checked) {
    signinMessage.value = msg;
  } else {
    signUpMessage.value = msg;
  }
}

function send() {
  const json = JSON.stringify(getData());
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.open('POST', url());
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(json);

  function onLoad() {
    if (xhr.status === 200) {
      try {
        const response = JSON.parse(xhr.responseText);
        message(response, true);
      } catch (e) {
        message(xhr.responseText);
      }
      
    } else {
      alert(`Ответ ${xhr.status}: ${xhr.statusText}`);
    } 
  }
}

Array.from(btns).forEach(btn => btn.addEventListener('click', send));