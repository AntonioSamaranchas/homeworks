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

function btnUnlock() {
  btnSetFull.removeAttribute('disabled');
  btnSetEmpty.removeAttribute('disabled');
}

function allBooking() {
  event.preventDefault();
  Array.from(seatMapDiv.querySelectorAll('div.seat')).forEach(seat => {
    seat.classList.remove('half');
    seat.classList.add('adult');
  });
  updateTotal();
}

function cancelAllBooking() {
  event.preventDefault();
  Array.from(seatMapDiv.querySelectorAll('div.seat')).forEach(seat => seat.classList.remove('adult', 'half'));
  updateTotal();
}

function updateTotal() {
  const adult = seatMapDiv.querySelectorAll('div.seat.adult').length;
  const half = seatMapDiv.querySelectorAll('div.seat.half').length;
  totalAdult.textContent = adult;
  totalHalf.textContent = half;
  totalPax.textContent = adult + half;
}

function OnClickSeat() {
  if (event.currentTarget.classList.contains('adult') || event.currentTarget.classList.contains('half')) {
    event.currentTarget.classList.remove('adult', 'half');
  } else {
    event.currentTarget.classList.toggle('adult', !event.altKey);
    event.currentTarget.classList.toggle('half', event.altKey);
  }
  updateTotal();
}

function ininOnClickSeat() {
  Array.from(seatMapDiv.querySelectorAll('div.seat')).forEach(seat => seat.addEventListener('click', OnClickSeat));  
}

function loadSheme() {
  event.preventDefault();

  fetch('https://neto-api.herokuapp.com/plane/' + acSelect.value)
    .then(res => res.json())
    .then((res) => {
      showSheme(res);
      btnUnlock();
      updateTotal();
      ininOnClickSeat();
    });

  function showSheme(data) {
    const rows = data.scheme.map(function (seats, i) {
      return createRow(i + 1, seats, data.letters4, data.letters6);
    });
    const fragment = rows.reduce((fragment, row) => {
      fragment.appendChild(row);
      return fragment;
    }, document.createDocumentFragment());

    clean();
    seatMapDiv.appendChild(fragment);
  }

  function createRow(numRow, seats, letters4, letters6) {
    if(seats === 0) {
      return getFragmentNull();
    } else if (seats === 4) {
      return getFragmentFourSeat();
    } else {
      return getFragmentSeat();
    }

    function createCommon() {
      const h2 = document.createElement('h2');
      h2.textContent = numRow;
      const xs1 = document.createElement('div');
      xs1.className = "col-xs-1 row-number";
      xs1.appendChild(h2);
      const row = document.createElement('div');
      row.className = "row seating-row text-center";
      row.appendChild(xs1);
      return row;
    }

    function getFragmentNull() {
      const row = createCommon();
      
      for (let i = 0; i < 2; i++) {
        const xs5 = document.createElement('div');
        xs5.className = "col-xs-5";
        for (let j = 0; j < 3; j++) {
          const noSeat = document.createElement('div');
          noSeat.className = "col-xs-4 no-seat";
          xs5.appendChild(noSeat);
        }
        row.appendChild(xs5);
      }
      return row;
    }

    function getFragmentFourSeat() {
      const row = createCommon();
      
      let k = 0;
      for (let i = 0; i < 2; i++) {
        const xs5 = document.createElement('div');
        xs5.className = "col-xs-5";
        for (let j = 0; j < 3; j++) {
          if ((i === 0 && j === 0) || (i === 1 && j === 2)) {
            const noSeat = document.createElement('div');
            noSeat.className = "col-xs-4 no-seat";
            xs5.appendChild(noSeat);
            continue;  
          }
          const xs4 = document.createElement('div');
          xs4.className = "col-xs-4 seat";
          const label = document.createElement('span');
          label.className = "seat-label";
          label.textContent = letters4[k];
          xs4.appendChild(label);
          xs5.appendChild(xs4);
          k++;
        }
        row.appendChild(xs5);
      }
      return row;  
    }

    function getFragmentSeat() {
      const row = createCommon();
      
      let k = 0;
      for (let i = 0; i < 2; i++) {
        const xs5 = document.createElement('div');
        xs5.className = "col-xs-5";
        for (let j = 0; j < 3; j++) {
          const xs4 = document.createElement('div');
          xs4.className = "col-xs-4 seat";
          const label = document.createElement('span');
          label.className = "seat-label";
          label.textContent = letters6[k];
          xs4.appendChild(label);
          xs5.appendChild(xs4);
          k++;
        }
        row.appendChild(xs5);
      }
      return row;
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', changeFly);
acSelect.addEventListener('input', clean);
acSelect.addEventListener('input', addDef);
acSelect.addEventListener('input', init);
acSelect.addEventListener('input', changeFly);
btnSeatMap.addEventListener('click', loadSheme);
btnSetFull.addEventListener('click', allBooking);
btnSetEmpty.addEventListener('click', cancelAllBooking);