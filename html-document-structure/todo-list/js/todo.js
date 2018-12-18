'use strict'

function Todo(container) {
  const done = container.querySelector('.done');
  const undone = container.querySelector('.undone');
  const tasks = container.querySelectorAll('label input');

  Array.from(tasks).forEach(task => task.addEventListener('click', clickTask));

  function clickTask() {
    if (this.checked) {
      done.appendChild(this.parentElement);
    } else {
      undone.appendChild(this.parentElement);
    }
  }
}

const lists = document.querySelectorAll('.todo-list');
Array.from(lists).forEach(item => Todo(item));