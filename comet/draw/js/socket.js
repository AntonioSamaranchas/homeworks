'use strict';

function onLoad() {
  const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

  function paint(event) {
    if (event instanceof MouseEvent) {
      canvas.toBlob((blob) =>  ws.send(blob)); // из скрипта draw var canvas
    } else {
      event.canvas.toBlob((blob) =>  ws.send(blob)); 
    }
  }

  function closeConnection() {
    if (ws) {
      ws.onclose = function() {};
      ws.close(1000, 'ок');
    }
  }

  window.editor.addEventListener('update', paint);
  clearCanvas.addEventListener('click', paint);
  window.addEventListener('beforeunload', closeConnection);
}

window.addEventListener('load', onLoad, false);