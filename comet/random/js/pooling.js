'use strict';

const pool = document.querySelector('.pooling');

function pooling() {
  function get() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);
    xhr.send();

    function onLoad() {
      if (xhr.status === 200) {
        try {
          const response = Number(xhr.responseText); // иначе пришло не число
          insert(response);  
        } catch (error) { 
        }
      } else {
        alert(`Ответ ${xhr.status}: ${xhr.statusText}`);
      }
    }

    function insert(num) {
      const flip = pool.querySelector('.flip-it');
      const divs = pool.querySelectorAll('div');

      if (flip) {
        flip.classList.remove('flip-it');
      }

      Array.from(divs)
        .forEach((div) => {
          if (div.textContent === String(num)) {
            div.classList.add('flip-it');
          }  
        });
    }

    function onError() {
      alert('Сервис недоступен');
    }
  }

  setInterval(get, 5000);
}

document.addEventListener('DOMContentLoaded', pooling);