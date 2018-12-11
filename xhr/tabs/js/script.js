
'use strict'

function toggleClass(btn) {
  const btns = document.querySelectorAll('nav > a');
  Array.from(btns).forEach(bnt => bnt.classList.remove('active'));
  btn.classList.add('active');
}

function getData(url) {
  if (!url) {
    return;
  }

  const indicator = document.getElementById('preloader');
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('loadstart', onLoadstart);
  xhr.open('GET', url, true);
  xhr.send();

  function onLoadstart() {
    indicator.classList.remove('hidden'); 
  }

  function onLoad() {
    indicator.classList.add('hidden');
    if (xhr.status === 200) {
      const htmlText = xhr.responseText;
      buildHtml(htmlText);
    }
  } 

  function buildHtml(htmlText) {
    const content = document.getElementById('content');
    content.innerHTML = htmlText;
  }
}

function tabClick() {
  event.preventDefault();
  toggleClass(this);
  getData(this.href);
}

function init() {
  const btns = document.querySelectorAll('nav > a');
  const firstBtn = document.querySelector('nav > a');
  Array.from(btns).forEach(bnt => bnt.addEventListener('click', tabClick));
  firstBtn.click();
}

document.addEventListener('DOMContentLoaded', init);