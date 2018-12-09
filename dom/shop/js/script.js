'use strict'

function addToCart() {
  const viewCount = document.getElementById('cart-count');
  const viewTotalPrice = document.getElementById('cart-total-price');
  let count = Number(viewCount.dataset.count);
  let totalPrice = Number(viewTotalPrice.dataset.totalPrice);
  
  if (isNaN(count)) {
    count = 0;
  }

  if (isNaN(totalPrice)) {
    totalPrice = 0;
  }
  
  viewCount.dataset.count = count += 1;  
  viewTotalPrice.dataset.totalPrice = totalPrice += Number(this.dataset.price);
  viewCount.innerHTML = viewCount.dataset.count;
  viewTotalPrice.innerHTML = getPriceFormatted(viewTotalPrice.dataset.totalPrice);
}

function initButtons() {
  const bnts = document.getElementsByClassName('add');
  for (const btn of bnts) {
    btn.addEventListener('click', addToCart);
  }
}

document.addEventListener('DOMContentLoaded', initButtons);