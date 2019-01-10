'use strict';

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  
  const element = document.createElement(node.name);
  if (node.props !== null) {
    Object.keys(node.props).forEach(i => element.setAttribute(i, node.props[i]));
  }
  if (typeof node.childs === 'string') {
    element.textContent = node.childs;
  } else if (node.childs instanceof Array) {
    node.childs.forEach(child => element.appendChild(createElement(child)));
  }
  return element;
}