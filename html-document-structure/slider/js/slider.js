'use strict'

function Slider(container) {
  const slides = Array.from(container.querySelectorAll('.slides .slide'));
  const btns = Array.from(container.querySelectorAll('.slider-nav > a'));
  const next = btns.find(btn => {return btn.dataset.action === 'next'});
  const prev = btns.find(btn => {return btn.dataset.action === 'prev'});
  const first = btns.find(btn => {return btn.dataset.action === 'first'});
  const last = btns.find(btn => {return btn.dataset.action === 'last'});
  let currentSlide = container.querySelector('.slides .slide'); 
  
  currentSlide.classList.add('slide-current');
  prev.classList.add('disabled');
  first.classList.add('disabled');

  next.addEventListener('click', event => moveSlide(true));
  prev.addEventListener('click', event => moveSlide(false));
  first.addEventListener('click', event => moveSlideEnd(false));
  last.addEventListener('click', event => moveSlideEnd(true));

  function moveSlide(isForward) {
    if ((isForward && next.classList.contains('disabled')) || (!isForward && prev.classList.contains('disabled'))) {
      return;
    }

    currentSlide = container.querySelector('.slide-current');
    const activatedSlide = isForward ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
    currentSlide.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');

	  if (!activatedSlide.nextElementSibling) {
      next.classList.add('disabled');
      last.classList.add('disabled');
    } else {
      next.classList.remove('disabled');
      last.classList.remove('disabled');
    }

    if (!activatedSlide.previousElementSibling) {
      prev.classList.add('disabled');
      first.classList.add('disabled');
    } else {
      prev.classList.remove('disabled');
      first.classList.remove('disabled');
    }
  }

  function moveSlideEnd(isForward) {
    if ((isForward && last.classList.contains('disabled')) || (!isForward && first.classList.contains('disabled'))) {
      return;
    }

    currentSlide = container.querySelector('.slide-current');
    const activatedSlide = isForward ? slides.find(slide => {return slide.nextElementSibling === null}) : slides.find(slide => {return slide.previousElementSibling === null});
    currentSlide.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');

    if (isForward) {
      last.classList.add('disabled');
      next.classList.add('disabled');
      first.classList.remove('disabled');
      prev.classList.remove('disabled');
    } else {
      first.classList.add('disabled');
      prev.classList.add('disabled');
      last.classList.remove('disabled');
      next.classList.remove('disabled');
    }
  }
}

const sliders = document.querySelectorAll('.slider');
Array.from(sliders).forEach(item => Slider(item));