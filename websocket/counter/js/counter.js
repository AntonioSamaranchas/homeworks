'use strict';

function connection() {
  const counter = document.querySelector('.counter');
  const errorsСounter = document.querySelector('.errors');

  const ws = new WebSocket('wss://neto-api.herokuapp.com/counter');
  ws.addEventListener('message', messages);

  function messages() {
    try {
      const mess = JSON.parse(event.data);
      counter.innerHTML = mess.connections;
      errorsСounter.value = mess.errors;
    } catch (e) {
      errorsСounter.value = 'invalid format';
    }
  }

  function closeConnection() {
    ws.onclose = function() {};
    ws.close(1000, 'ок');
  }

  window.addEventListener('beforeunload', closeConnection);
}

connection();