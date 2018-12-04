'use strict'

function selectLink() {
  if (this.classList.contains('gallery-current')) {
    return;
  }

  const currentLinks = document.getElementsByClassName('gallery-current');
  for (const currentLink of currentLinks) {
    currentLink.classList.remove('gallery-current');
  }
  
  this.classList.add('gallery-current');
}
  
function viewCurrentFoto() {
  event.preventDefault();
  const viewPanel = document.getElementById('view');
  viewPanel.src = this.href;
}

const links = document.getElementById('nav').getElementsByTagName('a');
for (const link of links) {
  if (link.addEventListener) {
    link.addEventListener('click', selectLink);
    link.addEventListener('click', viewCurrentFoto);
  } else if (link.attachEvent) {
    link.attachEvent('onclick', selectLink);
    link.addEventListener('onclick', viewCurrentFoto);
  }    
}