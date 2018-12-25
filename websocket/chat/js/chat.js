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

  function getMsg(typeMsg = '') {  
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
        node = messages.querySelector('.loading').nextElementSibling.cloneNode(true);/* не придумал как иначе */
    }
    return node;
  }

  function currentTime() {
    const currentDate = new Date();
    return `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }

  function addMessage(msg) {
    content.appendChild(msg);  
  }

  function send() {
    if ((event instanceof KeyboardEvent && event.keyCode !== 'keyEnter') || input.value.length === 0) {
      return;
    }
    
    event.preventDefault();
    const time = currentTime();
    const msg = getMsg('personal');
    msg.querySelector('.message-text').textContent = input.value;
    msg.querySelector('.timestamp').textContent = time;
    
    addMessage(msg);
    ws.send(input.value);
    input.value = '';
  }

  function connectionOk() {
    const msg = getMsg('status');
    msg.querySelector('.message-text').textContent = 'Пользователь появился в сети';
    
    status.textContent = status.dataset.online;
    bntSend.removeAttribute('disabled');
    addMessage(msg);
  }

  function message() {
    let msg;
    const time = currentTime();

    if (event.data === '...') {
      msg = getMsg('loading');
      msg.dataset.prints = true;
      msg.querySelector('span').textContent = '...';
    } else {
      msg = getMsg();
      msg.querySelector('.message-text').textContent = event.data;
      msg.querySelector('.timestamp').textContent = time;
      Array.from(content.querySelectorAll('[data-prints]'))
        .forEach(print => content.removeChild(print));
    }
    addMessage(msg);
  }

  function connectionFail() {
    status.textContent = status.dataset.offline;
  }

  function closed() {
    const msg = getMsg('status');

    status.textContent = status.dataset.offline;
    bntSend.setAttribute('disabled', '');
    addMessage(msg);
  }

  function closeConnection() {
    ws.onclose = function() {};
    ws.close(1000, 'ок');
  }

  bntSend.addEventListener('click', send);
  document.addEventListener('keydown', send);
  window.addEventListener('beforeunload', closeConnection);
}
online();