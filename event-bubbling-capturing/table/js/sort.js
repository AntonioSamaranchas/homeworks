'use strict';

function handleTableClick(event) {
  if (!event.target.classList.contains('prop__name')) {
    return;
  }

  if (event.target.dataset.propName !== event.currentTarget.dataset.sortBy) {
    window.dir = undefined;
  }

  event.currentTarget.dataset.sortBy = event.target.dataset.propName;
  event.currentTarget.firstElementChild.dataset.dir = window.dir ? -window.dir : 1;
  window.dir = Number(event.currentTarget.firstElementChild.dataset.dir);
  sortTable(event.target.dataset.propName, window.dir);
}
