'use strict';

const url = 'https://neto-api.herokuapp.com/twitter/jsonp';
const container = document.querySelector('.container');
const selectors = [
  '[data-wallpaper]', 
  '[data-username]', 
  '[data-description]',
  '[data-pic]',
  '[data-tweets]',
  '[data-followers]',
  '[data-following]'
];

function loadData() {
  const functionName = 'parser';
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function showData(result) {
  const items = Array.from(container.querySelectorAll(selectors.join()));
  for (const key in result) {
    const field = items.find(item => {return item.dataset[key] ===''});
    if (field) {
      if (field.tagName === 'IMG') {
        field.src = result[key];
      } else {
        field.textContent = result[key];
      }
    }
  }
}


loadData().then(showData).catch(() => console.log('Не удалось получить данные!'));