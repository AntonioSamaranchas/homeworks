'use strict';

var url = 'https://neto-api.herokuapp.com/food/42';
const content = document.querySelector('.wrapper');

function loadData(url) {
  const functionName = 'parser' + Math.random().toString(36).substr(2);
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function loadDataRecipe(data) {
  content.querySelector('[data-title]').textContent = data.title;
  content.querySelector('[data-pic]').setAttribute('style', `background-image: url(${data.pic});`);
  content.querySelector('[data-ingredients]').textContent = data.ingredients.join();
}

function loadDataRating(data) {
  const rating = data.rating.toFixed(2);
  content.querySelector('[data-rating]').textContent = rating;
  content.querySelector('[data-star]').setAttribute('style', `width: ${rating*10}%`);
  content.querySelector('[data-votes]').textContent = `(${data.votes} оценок)`; 
}

function loadDataCooks(data) {
  const consumers = data.consumers;
  const total = data.total;
  let users = '';
  consumers.forEach(user => {
    users += `<img src="${user.pic}" title="${user.name}">`;
  });
  users += `<span>(+${total - consumers.length})</span>`;
  content.querySelector('[data-consumers]').innerHTML = users;
}

loadData(url).then((res) => {
  loadDataRecipe(res);
  url += '/rating';
  loadData(url).then((res) => {
    loadDataRating(res);
    url = url.replace('/rating', '/consumers');
    loadData(url).then(loadDataCooks);
  });
});