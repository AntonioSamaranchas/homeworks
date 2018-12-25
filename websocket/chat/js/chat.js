'use strict';

const chat = document.querySelector('.chat');

function online() {
  const form = chat.querySelector('.message-box');
  const bntSend = chat.querySelector('.message-box .message-submit');
  const input = chat.querySelector('.message-box .message-input');
  const status = chat.querySelector('.chat-status');
  const content = chat.querySelector('.messages-content');
  const messages = chat.querySelector('.messages-templates');
  
  const ws = new WebSocket('wss://neto-api.herokuapp.com/chat');
  ws.addEventListener('open', connectionOk);
  ws.addEventListener('message', message);
  ws.addEventListener('error', connectionFail);
  ws.addEventListener('close', closed);

  function getMsg(typeMsg) {  
    let node;
    
    switch (typeMsg) {
      case 'loading' :
        node = messages.querySelector('.loading').cloneNode(true);
        break;
      case 'status' :
        node = messages.querySelector('.message-status').cloneNode(true);
        break;
      case 'personal' :
        node = messages.querySelector('.message-personal').cloneNode(true);
        break;  
      default :
        node = messages.querySelector('.loading').nextElementSibling.cloneNode(true);;
    }
    return node;
  }

  function connectionOk() {
    const msg = getMsg('status');
    msg.querySelector('.message-text').textContent = 'Пользователь появился в сети';
    
    status.textContent = status.dataset.online;
    bntSend.removeAttribute('disabled');
    content.appendChild(msg);
  }

  function message() {

  }

  function connectionFail() {
    status.textContent = status.dataset.offline;
  }

  function closed() {
    const msg = getMsg('status');

    status.textContent = status.dataset.offline;
    bntSend.setAttribute('disabled', '');
    content.appendChild(msg);
  }

  function closeConnection() {
    ws.onclose = function() {};
    ws.close(1000, 'ок');
  }

  window.addEventListener('beforeunload', closeConnection);
}
online();