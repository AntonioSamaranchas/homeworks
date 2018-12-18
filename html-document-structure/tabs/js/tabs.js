'use strict'

function tabs(container) {
  const nav = container.querySelector('.tabs-nav');
  const articles = Array.from(container.querySelectorAll('[data-tab-title], [data-tab-icon]'));

  const item = nav.firstElementChild;
  item.parentNode.removeChild(item);
  articles.forEach(article => {
    const tab = item.cloneNode(true);
    tab.firstElementChild.textContent = article.dataset.tabTitle;
    tab.firstElementChild.classList.add(article.dataset.tabIcon);
    nav.appendChild(tab);
    article.classList.add('hidden');
  });

  const links = nav.querySelectorAll('.fa');
  Array.from(links).forEach(link => link.addEventListener('click', onClick));

  function onClick() {
    event.preventDefault();
    
    const currentTab = nav.querySelector('.ui-tabs-active');
    if (currentTab) {
      currentTab.classList.remove('ui-tabs-active');
    }
    this.classList.add('ui-tabs-active');
    
    articles.forEach(article => {
      if (article.dataset.tabTitle === this.textContent) {
        article.classList.remove('hidden');
      } else {
        article.classList.add('hidden');
      }
    });
  }

  links[0].click();
}

const tab = document.getElementById('tabs');
tabs(tab);