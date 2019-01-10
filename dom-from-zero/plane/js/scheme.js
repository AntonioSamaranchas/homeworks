'use strict';

const acSelect = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');

function changeFly() {
  const fly = acSelect.querySelector(`[value=${acSelect.value}]`);
  seatMapTitle.textContent = fly.textContent;
}

function init() {
  btnSetFull.setAttribute('disabled', '');
  btnSetEmpty.setAttribute('disabled', '');
  totalPax.textContent = "XXX";
  totalAdult.textContent = "XXX";
  totalHalf.textContent = "XXX";
}

function clean() {
  Array.from(seatMapDiv.children).forEach(child => seatMapDiv.removeChild(child));
}

function addDef() {
  const noFly = document.createElement('h3');
  noFly.className = "text-center";
  noFly.textContent = "Самолёт не выбран";
  seatMapDiv.appendChild(noFly);
}

function loadSheme() {
  event.preventDefault();

  fetch('https://neto-api.herokuapp.com/plane/' + acSelect.value)
    .then(res => res.json())
    .then(showSheme);

  function showSheme(data) {
    const rows = data.scheme.map(seats => createRow(seats, data.letters4, data.letters6));
    const fragment = rows.reduce((fragment, row) => {
      fragment.appendChild(row);
      return fragment;
    }, document.createDocumentFragment());

    clean();
    seatMapDiv.appendChild(fragment);
  }

  function createRow(seats, letters4, letters6) {
    return seats;
  }
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', changeFly);
acSelect.addEventListener('input', clean);
acSelect.addEventListener('input', addDef);
acSelect.addEventListener('input', init);
acSelect.addEventListener('input', changeFly);
btnSeatMap.addEventListener('click', loadSheme);