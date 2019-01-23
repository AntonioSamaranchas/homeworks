'use strict';

let movedPiece = null;
let shiftX = 0;
let shiftY = 0;

const dragStart = event => {
  if (event.target.classList.contains('logo')) {
    movedPiece = event.target;
    shiftX = event.target.clientWidth / 2;
    shiftY = event.target.clientHeight / 2;
  }
};

const drag = throttle((x, y) => {
  if (movedPiece) {
    x = x - shiftX;
    y = y - shiftY;
    movedPiece.style.left = x + 'px';
    movedPiece.style.top = y + 'px';
    movedPiece.classList.add('moving');
  }
});
const drop = event => {
  if (movedPiece) {
    movedPiece.classList.remove('moving');
    movedPiece.style.visibility = 'hidden';
    const trash = document.elementFromPoint(event.clientX, event.clientY).closest('#trash_bin');
    movedPiece.style.visibility = 'visible';
    if (trash) {
      movedPiece.style.display = 'none';
    }
    movedPiece = null;
  }
};

document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', event => drag(event.pageX, event.pageY));
document.addEventListener('mouseup', drop);

document.addEventListener('touchstart', event => dragStart(event.touches[0]));
document.addEventListener('touchmove', event => drag(event.touches[0].pageX, event.touches[0].pageY));
document.addEventListener('touchend', event => drop(event.changedTouches[0]));



function throttle(callback) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  };
}