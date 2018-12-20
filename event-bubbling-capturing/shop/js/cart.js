'use strict'

function addProduct(event) {
  const product = {
    'title': event.currentTarget.dataset.title,
    'price': event.currentTarget.dataset.price
  };
  event.preventDefault();
  addToCart(product);
  event.stopPropagation();
}

function initBtns(container) {
  const btns = container.querySelectorAll('.add-to-cart');
  Array.from(btns).forEach(btn => {
    if (btn.dataset.established) {
      return;
    }
    btn.addEventListener('click', addProduct);
    btn.dataset.established = true;
  });
}

function getLists() {
  const itemsList = document.querySelectorAll('.items-list');
  Array.from(itemsList).forEach(item => initBtns(item));
}  

showMore.addEventListener('click', getLists);
getLists();