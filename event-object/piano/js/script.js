'use strict'

const sounds = {
  'higher' : [
    './sounds/higher/first.mp3',
    './sounds/higher/second.mp3',
    './sounds/higher/third.mp3',
    './sounds/higher/fourth.mp3',
    './sounds/higher/fifth.mp3'
  ],
  
  'middle' : [
    './sounds/middle/first.mp3',
    './sounds/middle/second.mp3',
    './sounds/middle/third.mp3',
    './sounds/middle/fourth.mp3',
    './sounds/middle/fifth.mp3'
  ],
  
  'lower' : [
    './sounds/lower/first.mp3',
    './sounds/lower/second.mp3',
    './sounds/lower/third.mp3',
    './sounds/lower/fourth.mp3',
    './sounds/lower/fifth.mp3'
  ]
}

const items = document.getElementsByTagName('li');
Array.from(items).forEach((item) => item.addEventListener('click', playSound));

function playSound() {
  const players = this.getElementsByTagName('audio');
  for (const player of players) {
    player.currentTime = 0;
    player.play();
  }
}

function replaceClass(tag, className) {
  tag.classList.remove('higher');
  tag.classList.remove('middle');
  tag.classList.remove('lower');
  tag.classList.add(className);
}

function setSounds(className = 'middle', repeat) {
  if (!repeat) {
    const lists = document.getElementsByClassName('set');
    Array.from(lists).forEach((list) => replaceClass(list, className));

    const players = document.getElementsByTagName('audio');
    for (let i = 0; i < players.length; i++) {
      players[i].src = sounds[className][i];
    } 
  }
}

function checkTone() {
  if (event.type === 'keydown') {
    if (event.shiftKey) {
      setSounds('lower', event.repeat);
    } else if (event.altKey) {
      setSounds('higher', event.repeat);
    }
  } else if (event.type === 'keyup') {
    setSounds('middle', event.repeat);
  }
}

document.addEventListener('keydown', checkTone);
document.addEventListener('keyup', checkTone);

setSounds('middle', false);