/* Данный JS код */
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', onLoad);
xhr.addEventListener('error', onError);
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

function onLoad() {
  if (xhr.status === 200) {
    const resultParse = JSON.parse(xhr.responseText);
    buildHtml(resultParse);
  } else {
    alert(`Ответ ${xhr.status}: ${xhr.statusText}`);
  }
}

function onError() {
  alert('Сервис недоступен');
}

function buildHtml(books) {
  const tagList = document.getElementById('content');
  let fullHtml = '';

  for (const book of books) {
    fullHtml += `<li\n\tdata-title="${book.title}"\n\tdata-author="${book.author.name}"\n\tdata-info="${book.info}"\n\tdata-price="${book.price}">\n\t<img src="${book.cover.small}">\n</li>\n`;
  }

  tagList.innerHTML = fullHtml;
}

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});
