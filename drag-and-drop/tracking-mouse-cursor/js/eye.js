'use strict';

const leftParent = document.querySelector('.cat_position_for_left_eye');
const rightParent = document.querySelector('.cat_position_for_right_eye');
const leftEye = document.querySelector('.cat_eye_left');
const rightEye = document.querySelector('.cat_eye_right');

function getPosition(el) {
  const pos = el.getBoundingClientRect();
  return {
    left: pos.left,
    top: pos.top,
  }
}

function trackingLeftEye(x, y) {
  if (leftParent && leftEye) {
    const pos = getPosition(leftParent);
    let left = x - pos.left;
    let top = y - pos.top;
    [left, top] = checkLimit(left, top, leftEye, leftParent);

    leftEye.style.left = `${left}px`;
    leftEye.style.top = `${top}px`;
  }
};

function trackingRightEye(x, y) {
  if (rightParent && rightEye) {
    const pos = getPosition(rightParent);
    let left = x - pos.left;
    let top = y - pos.top;
    [left, top] = checkLimit(left, top, rightEye, rightParent);

    rightEye.style.left = `${left}px`;
    rightEye.style.top = `${top}px`;
  }
};

function checkLimit(left, top, eye, parent) {
  const maxX = parent.offsetWidth;
  const maxY = parent.offsetHeight;

  if(left < 0) {
    left = 0;
  }

  if(top < 0) {
    top = 0;
  }
  
  if(left + eye.offsetWidth > maxX) {
    left = maxX - eye.offsetWidth;
  }

  if(top + eye.offsetHeight > maxY) {
    top = maxY - eye.offsetHeight;
  }
  return [left, top];
}

document.addEventListener('mousemove', event => trackingLeftEye(event.pageX, event.pageY));
document.addEventListener('mousemove', event => trackingRightEye(event.pageX, event.pageY));
document.addEventListener('touchmove', event => trackingLeftEye(event.touches[0].pageX, event.touches[0].pageY));
document.addEventListener('touchmove', event => trackingRightEye(event.touches[0].pageX, event.touches[0].pageY));

