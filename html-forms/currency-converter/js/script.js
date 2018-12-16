'use strict'

const inputCourse = document.getElementById('source');
const outputCourse = document.getElementById('result');
const courseFrom = document.getElementById('from');
const courseTo = document.getElementById('to');

function getCourses() {
  const indicator = document.getElementById('loader');
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('loadstart', onLoadstart);
  xhr.open('GET', 'https://neto-api.herokuapp.com/currency', true);
  xhr.send();

  function onLoadstart() {
    indicator.classList.remove('hidden'); 
  }

  function onLoad() {
    indicator.classList.add('hidden');
    content.classList.remove('hidden');
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      buildHtml(response);
      change();  
    }
  } 

  function buildHtml(currencies) {
    const content = document.getElementById('content');
    let options ='';
    for (const currencу of currencies) {
      options += `<option${currencies.indexOf(currencу) === 0 ? ' selected ' : ' '}value="${currencу.value}">${currencу.code}</option>`
    }
    courseFrom.innerHTML = options;
    courseTo.innerHTML = options;
    content.classList.remove('hidden');
  }
}

function change() {
  outputCourse.value = Math.round(Number(inputCourse.value) * Number(courseFrom.value) / Number(courseTo.value) *100) / 100;
}

inputCourse.addEventListener('input', change);
courseFrom.addEventListener('input', change);
courseTo.addEventListener('input', change);

getCourses();
