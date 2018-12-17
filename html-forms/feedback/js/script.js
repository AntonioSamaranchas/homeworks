'use strict'

const btnSend = document.querySelector('.contentform .button-contact');
const btnChange = document.querySelector('#output .button-contact');
const form = document.querySelector('.contentform');
const output = document.getElementById('output');
const fields = document.querySelectorAll('.contentform .form-group input, .contentform .form-group textarea');
const [postcode] = document.getElementsByName('zip');

function send() {
  event.preventDefault();
  form.classList.add('hidden');
  output.classList.remove('hidden');
}

function change() {
  event.preventDefault();
  output.classList.add('hidden');
  form.classList.remove('hidden');
}

function numberСheck() {
  this.value = this.value.replace(/[^0-9]/g,'');
}

function full() {
  const enable = Array.from(fields).every(field => field.value.trim() !== '');
  if (enable) {
    btnSend.removeAttribute('disabled');
  }
}

btnSend.addEventListener('click', send);
btnChange.addEventListener('click', change);
postcode.addEventListener('input', numberСheck);
Array.from(fields).forEach(field => field.addEventListener('input', full));