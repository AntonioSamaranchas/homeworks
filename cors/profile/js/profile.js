'use strict';

var url = 'https://neto-api.herokuapp.com/profile/me';
const content = document.querySelector('.content');
const selectors = [
  '[data-name]', 
  '[data-description]',
  '[data-pic]',
  '[data-position]',
  '[data-technologies]'
];

function loadData(url) {
  const functionName = 'parser' + Math.random().toString(36).substr(2);
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function loadCart(result) {
  const items = Array.from(content.querySelectorAll(selectors.join()));
  const name = content.querySelector('[data-name]');
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
  name.dataset.id = result['id']; 
}

  function loadTechnologies(result) {
    let html = '';
    result.forEach(el => html += `<span class="devicons devicons-${el}"></span>`);
    content.querySelector('[data-technologies]').innerHTML = html;
    content.setAttribute('style', 'display: initial;');
  }

  loadData(url).then((res) => {
    loadCart(res);
    url = url.replace('/me', `/${content.querySelector('[data-id]').dataset.id}/technologies`);
    loadData(url).then(loadTechnologies);
  });