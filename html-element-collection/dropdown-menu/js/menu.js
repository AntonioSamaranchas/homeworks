function toggleActiveClass() {
  this.classList.toggle('active');
}  

const topMenu = document.getElementsByClassName('wrapper-dropdown');
if (topMenu.length) {
  for (const elMenu of topMenu) {
    elMenu.onclick = toggleActiveClass;
  }
}