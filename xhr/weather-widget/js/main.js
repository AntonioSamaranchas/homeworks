const request = new XMLHttpRequest();
/*request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', false);
request.send();
if (request.status === 200) {
  const response = JSON.parse(request.responseText);
  setData(response);
}*/
request.addEventListener('load', onLoad);
request.addEventListener('error', onError);
request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.send();

function onLoad() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  } else {
    alert(`Ответ ${request.status}: ${request.statusText}`);
  }
}

function onError() {
  alert('Сервис недоступен');
}