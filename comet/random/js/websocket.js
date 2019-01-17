'use strict';

const web = document.querySelector('.websocket');

function websocket() {
  const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
  ws.addEventListener('message', insert);

  function insert() {
    const num = JSON.parse(event.data);

    const flip = web.querySelector('.flip-it');
    const divs = web.querySelectorAll('div');

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

  function closeConnection() {
    if (ws) {
      ws.onclose = function() {};
      ws.close(1000, 'ок');
    }
  }

  window.addEventListener('beforeunload', closeConnection);
}

document.addEventListener('DOMContentLoaded', websocket);