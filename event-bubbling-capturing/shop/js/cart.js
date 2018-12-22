'use strict'

function addProduct(event) {
  if (!event.target.classList.contains('add-to-cart')) {
    return;
  }

  const product = {
    'title': event.target.dataset.title,
    'price': event.target.dataset.price
  };

  event.preventDefault();
  addToCart(product);
  event.stopPropagation();
}

const itemsList = document.querySelectorAll('.items-list');
Array.from(itemsList).forEach(item => item.addEventListener('click', addProduct));