'use strict'

var secret = 'KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ';
var arrKeyCodes = [];

function showMenu() {
  if (!event.ctrlKey){
    return;
  }
  if (!event.altKey){
    return;
  }

  if (event.code === 'KeyT') {
    const navs = document.getElementsByTagName('nav');
    Array.from(navs).forEach((nav) => nav.classList.toggle('visible'));
  }  
}

function showSecret() {
  const secrets = document.getElementsByClassName('secret');
  Array.from(secrets).forEach((secret) => secret.classList.add('visible'));
}

function checkKeys() {
  arrKeyCodes.push(event.code);
  const secretStr = arrKeyCodes.join('');
  if (secret.indexOf(secretStr) === 0) { /* правильная последовательность нажатий */
    if (secretStr === secret){
      showSecret();
    }
  } else { /* что-то нажали не то или не в той последовательности */
    arrKeyCodes = []; // очищаем
  }
}

document.addEventListener('keydown', showMenu);
document.addEventListener('keydown', checkKeys);