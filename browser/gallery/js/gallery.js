const links = [
    './i/breuer-building.jpg',
    './i/guggenheim-museum.jpg',
    './i/headquarters.jpg',
    './i/IAC.jpg',
    './i/new-museum.jpg'
];
  
const currentPhoto = document.getElementById('currentPhoto');
const btnPrev = document.getElementById('prevPhoto');
const btnNext = document.getElementById('nextPhoto');
let counter = 0;
  
currentPhoto.src = links[counter];
function clicBtn(){
  let isPrevFoto = (this.id === 'prevPhoto');
  if (isPrevFoto) { 
    counter -= 1;
  }

  if (counter === links.length - 1) {
    counter = 0;
  } else if (counter < 0) {
    counter = links.length - 1;
  } else if (!isPrevFoto) {
    counter += 1;  
  }
  currentPhoto.src = links[counter];
};
btnPrev.onclick = clicBtn;
btnNext.onclick = clicBtn; 