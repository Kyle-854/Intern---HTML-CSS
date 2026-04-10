const menu = document.querySelector('.menu');
const dropdown = document.querySelector('.dropdown');

menu.addEventListener('click', () => {
  dropdown.classList.toggle('show');
});