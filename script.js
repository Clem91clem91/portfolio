const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
if (menu && header) {
  menu.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
