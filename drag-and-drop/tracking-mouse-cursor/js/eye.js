'use strict';

function tracking(container) {
  const leftParent = container.querySelector('.cat_position_for_left_eye');
  const rightParent = container.querySelector('.cat_position_for_right_eye');
  const leftEye = container.querySelector('.cat_eye_left');
  const rightEye = container.querySelector('.cat_eye_right');
  const bodyWidth = document.documentElement.clientWidth;
  const bodyHeight = document.documentElement.clientHeight;

  const trackingLeftEye = throttle((x, y) => {
    if (leftParent && leftEye) {
      let [lft, tp] = calculatePercent(x, y);
      leftEye.style.left = 100 + '%';
      leftEye.style.top = 100 + '%';
    }
  });

  const trackingRightEye = throttle((x, y) => {
    if (rightParent && rightEye) {
      let [lft, tp] = calculatePercent(x, y);
      rightEye.style.left = lft + '%';
      rightEye.style.top = tp + '%';
    }
  });

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

  function calculatePercent(x, y) {
    return [
      Math.round(100 * x / bodyWidth),
      Math.round(100 * y / bodyHeight)
    ]
  }

  document.addEventListener('mousemove', event => trackingLeftEye(event.pageX, event.pageY));
  document.addEventListener('mousemove', event => trackingRightEye(event.pageX, event.pageY));
  document.addEventListener('touchmove', event => trackingLeftEye(event.touches[0].pageX, event.touches[0].pageY));
  document.addEventListener('touchmove', event => trackingRightEye(event.touches[0].pageX, event.touches[0].pageY));
  
}

const cats = document.querySelectorAll('.cat');
Array.from(cats).forEach(item => tracking(item));