'use strict';

const longPoll = document.querySelector('.long-pooling');

function longpooling() {
  setInterval(() => {
    fetch('https://neto-api.herokuapp.com/comet/long-pooling')
      .then(res => res.json())
        .then((res) => {
          insert(res);
        });

    function insert(num) {
      const flip = longPoll.querySelector('.flip-it');
      const divs = longPoll.querySelectorAll('div');

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
  }, 10000);
}

document.addEventListener('DOMContentLoaded', longpooling);