'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/mouse');
const canvas = document.querySelector('canvas');
const coord =  {};

function sendClick() {
  coord.x = event.pageX;
  coord.y = event.pageY;
  ws.send(JSON.stringify(coord));
}

canvas.addEventListener('click', sendClick);
showBubbles(ws);