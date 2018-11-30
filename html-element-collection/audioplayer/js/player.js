'use strict'
const mediaFiles = [
  {src: "./mp3/LA Chill Tour.mp3", title: "LA Chill Tour"},
  {src: './mp3/LA Fusion Jam.mp3', title: 'LA Fusion Jam'},
  {src: './mp3/This is it band.mp3', title: 'This is it band'}
];

const players = document.getElementsByTagName('audio');
const titles = document.getElementsByClassName('title');
const mediaplayers = document.getElementsByClassName('mediaplayer');

if (players.length) {

  let counter = 0;
  const player = players[0];
  const nameTrack = titles[0];
  player.src = mediaFiles[counter].src;
  nameTrack.title = mediaFiles[counter].title;

  const btns = Array.from(document.getElementsByTagName('button'));
  const mediaplayer = Array.from(mediaplayers).find((tag) => tag.className === "mediaplayer"); 
  const btnBack = btns.find((btn) => btn.className === "back");  
  const btnPlayPause = btns.find((btn) => btn.className === "playstate");
  const btnStop =  btns.find((btn) => btn.className === "stop");
  const btnNext =  btns.find((btn) => btn.className === "next");

  function playerPlay(pausedCancel = false) {
    if (!mediaplayer.classList.contains('play')) {
      mediaplayer.classList.add('play');
    }
    if (!pausedCancel) {
      player.src = mediaFiles[counter].src;
      nameTrack.title = mediaFiles[counter].title;
    }
    player.play(); 
  }

  function playerStop(isStop = false) {
    if (mediaplayer.classList.contains('play')) {
      mediaplayer.classList.remove('play');
    }
    player.pause();
    if (isStop) {
      player.currentTime = 0;
    }
  }

  if (btnBack) {
    btnBack.onclick = () => {
      counter -= 1;
      if (counter < 0) {
        counter = mediaFiles.length - 1;
      }
      playerPlay();
    }
  }

  if (btnStop) {
    btnStop.onclick = () => {
      playerStop(true);
    }
  }

  if (btnNext) {
    btnNext.onclick = () => {
      if (counter === mediaFiles.length - 1) {
        counter = 0;
      } else {
        counter += 1;  
      }
      playerPlay();  
    }
  }

  if (btnPlayPause) {
    btnPlayPause.onclick = () => {
      if (player.paused) {
        playerPlay(true);
      } else {
        playerStop();
      }
    }
  }

}
