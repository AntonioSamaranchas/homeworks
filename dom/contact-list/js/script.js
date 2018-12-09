'use strict'

function getContacts() {
  return JSON.parse(loadContacts());
}

function buildList() {
  const tagList = document.querySelector('.contacts-list');
  const contacts = getContacts();
  let fullSting = '';

  for (const contact of contacts) {
    fullSting = fullSting + `<li data-email="${contact.email}" data-phone="${contact.phone}">\n\t<strong>${contact.name}</strong>\n</li>\n`;
  }

  tagList.innerHTML = fullSting;
}

buildList();