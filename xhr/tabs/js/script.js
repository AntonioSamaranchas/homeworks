
'use strict'

function toggleClass(btn) {
  const btns = document.querySelectorAll('nav > a');
  Array.from(btns).forEach(bnt => bnt.classList.remove('active'));
  btn.classList.add('active');
}

function getData() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
  xhr.send();

  function onLoad() {
    if (xhr.status === 200) {
      const resultParse = JSON.parse(xhr.responseText);
      buildHtml(resultParse);
    } else {
      alert(`Ответ ${xhr.status}: ${xhr.statusText}`);
    }
  } 
}

function tabClick() {
  event.preventDefault();
  toggleClass(this);
}

function init() {
  const btns = document.querySelectorAll('nav > a');
  Array.from(btns).forEach(bnt => bnt.addEventListener('click', tabClick));
}

document.addEventListener('DOMContentLoaded', init);