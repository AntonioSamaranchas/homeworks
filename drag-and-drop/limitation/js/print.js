'use strict';

function init(container) {
  const leftEye = container.querySelector('.left_eye');
  const rightEye = container.querySelector('.right_eye');
  const mess = container.querySelector('.message');
  const textarea = document.querySelector('.textarea');

  function focusBlur(event) {
    container.classList.toggle('active', event.type === 'focus');
    mess.classList.remove('view');
  }

  function onInput(event) {
    if(!container.classList.contains('active')) {
      container.classList.add('active');
    }
    if(mess.classList.contains('view')) {
      mess.classList.remove('view');
    }
  }

  const show = debounce(() => {
    container.classList.remove('active');
    mess.classList.add('view');
  }, 2000);

  function debounce(callback, delay) {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        callback();
      }, delay);
    };
  };

  textarea.addEventListener('focus', focusBlur);
  textarea.addEventListener('blur', focusBlur);
  textarea.addEventListener('input', onInput);
  textarea.addEventListener('input', show);
}

const blocks = document.querySelectorAll('.block');
Array.from(blocks).forEach(block => init(block));