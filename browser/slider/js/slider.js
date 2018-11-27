const links = [
  './i/airmax.png',
  './i/airmax-on-foot.png',
  './i/airmax-playground.png',
  './i/airmax-top-view.png',
  './i/airmax-jump.png'
];

const slider = document.getElementById('slider');
let counter = 0;
slider.src = links[counter];/* чтобы гифка не выводилась */
setInterval(() => {
  if (counter === links.length - 1) {
    counter = 0;
  } else {
    counter += 1;
  }
  slider.src = links[counter]; /* т.о. при первом проходе массива здесь будет второе фото, а при последующих - первое*/
}, 5000);
