'use strict';

function handleTableClick(event) {
  if (!event.target.classList.contains('prop__name')) {
    return;
  }

  if (event.target.dataset.propName !== event.currentTarget.dataset.sortBy) {
    event.target.dataset.dir = '';
  }

  event.currentTarget.dataset.sortBy = event.target.dataset.propName;
  event.target.dataset.dir = event.target.dataset.dir ? -event.target.dataset.dir : 1;
  sortTable(event.target.dataset.propName, event.target.dataset.dir);
}
