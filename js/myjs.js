let button = document.querySelector('.menu-button');
let menu = document.querySelector('.menu');
button.onclick = function() {
  menu.classList.toggle('menu-active');
};
