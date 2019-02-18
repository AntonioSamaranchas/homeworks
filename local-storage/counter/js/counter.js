'use strict';
const btnInc = document.getElementById('increment');
const btnDec = document.getElementById('decrement');
const btnReset = document.getElementById('reset');
const counter = document.getElementById('counter');

function inc() {
  localStorage.count++;
  refresh();
}

function dec() {
  if (localStorage.count == 0) {
    return;
  }
  localStorage.count--;
  refresh();
}

function reset() {
  localStorage.clear();
  init();
}

function init() {
  if(!localStorage.count) {
    localStorage.count = 0;
  }
  refresh();
}

function refresh() {
  counter.innerText = localStorage.count;
}

btnInc.addEventListener('click', inc);
btnDec.addEventListener('click', dec);
btnReset.addEventListener('click', reset);
init();