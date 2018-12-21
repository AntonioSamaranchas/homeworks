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

  btns.forEach(btn => btn.addEventListener('click', event => moveSlide()));

  function moveSlide() {
    const action = event.target.dataset.action;
    if ((action === 'next' && next.classList.contains('disabled')) 
        || (action === 'prev' && prev.classList.contains('disabled')) 
        || (action === 'last' && last.classList.contains('disabled'))
        || (action === 'first' && first.classList.contains('disabled'))) {
      return;
    }

    let activatedSlide;
    currentSlide = container.querySelector('.slide-current');
    if (action === 'next' || action === 'prev') {
      activatedSlide = action === 'next' ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
    } else {
      activatedSlide = action === 'last' ? slides.find(slide => {return slide.nextElementSibling === null}) : slides.find(slide => {return slide.previousElementSibling === null});
    }  
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
}

const sliders = document.querySelectorAll('.slider');
Array.from(sliders).forEach(item => Slider(item));