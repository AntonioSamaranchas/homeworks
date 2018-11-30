function playSound() {
  const players = this.getElementsByTagName('audio');
  if (players.length) {
    for (const player of players) {
      player.currentTime = 0;
      player.play();
    }
  }
} 

const btns = document.getElementsByTagName('li');
if (btns.length) {
  for (const bth of btns) {
    bth.onclick = playSound;
  }
}