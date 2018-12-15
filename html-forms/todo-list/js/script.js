'use strict'

const tasks = document.querySelectorAll('.list-block ul li input');
const [output] = document.getElementsByTagName('output');
const [lstBlok] = document.getElementsByClassName('list-block');
output.dataset.totalTask = tasks.length;
output.dataset.done = Array.from(tasks).filter(task => task.checked === true).length;

function complete() {
  if (output.dataset.done === output.dataset.totalTask) {
    lstBlok.classList.add('complete');
  } else {
    lstBlok.classList.remove('complete');
  }
  output.value = `${output.dataset.done} из ${output.dataset.totalTask}`;
}

function clickTask() {
  if (this.checked) {
    output.dataset.done = Number(output.dataset.done) + 1;
  } else {
    output.dataset.done = Number(output.dataset.done) - 1;
  }
  complete();
}
  
Array.from(tasks).forEach(task => task.addEventListener('click', clickTask));
complete();