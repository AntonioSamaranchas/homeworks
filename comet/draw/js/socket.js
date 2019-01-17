'use strict';

function onLoad() {
  const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

  function paint() {
    const ctx = event.target.getContext('2d');
    const image = ctx.getImageData(0, 0, event.target.width, event.target.height);
    const binary = Uint8Array.from(image.data);
    ws.send(binary.buffer); 
  }

  function closeConnection() {
    if (ws) {
      ws.onclose = function() {};
      ws.close(1000, 'ок');
    }
  }

  window.editor.addEventListener('update', paint);
  window.addEventListener('beforeunload', closeConnection);
}

window.addEventListener('load', onLoad, false);