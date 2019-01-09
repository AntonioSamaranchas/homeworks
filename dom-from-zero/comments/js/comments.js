'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  /*const comments = list.map(createComment).join('');
  commentsContainer.innerHTML += comments;*/
  const comments = list.map(createComment);
  const fragmentDoc = comments.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());

  commentsContainer.appendChild(fragmentDoc);
}

function createComment(comment) {
  const photo = document.createElement("div");
  photo.className = "photo";
  photo.setAttribute("title", comment.author.name);
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.style.backgroundImage = `url('${comment.author.pic}')`;
  photo.appendChild(avatar);

  const text = document.createElement("p");
  text.className = "comment-text";
  text.innerText = comment.text;
  const date = document.createTextNode(new Date(comment.date).toLocaleString('ru-Ru'));
  date.className = "comment-date";
  const complain = document.createElement("li");
  complain.className = "complain";
  complain.textContent = "Пожаловаться";
  const reply = document.createElement("li");
  reply.className = "reply";
  reply.textContent = "Ответить";
  
  const actions = document.createElement("ul");
  actions.className = "comment-actions";
  actions.appendChild(complain);
  actions.appendChild(reply);

  const bottom = document.createElement("div");
  bottom.className = "bottom-comment";
  bottom.appendChild(date);
  bottom.appendChild(actions);

  const block = document.createElement("div");
  block.className = "comment-block";
  block.appendChild(text);
  block.appendChild(bottom);

  const commentWrap = document.createElement("div");
  commentWrap.className = "comment-wrap";
  commentWrap.appendChild(photo);
  commentWrap.appendChild(block);
  return commentWrap;
  /*return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`*/
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
