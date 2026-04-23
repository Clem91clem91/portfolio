
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const langSwitch = document.getElementById('langSwitch');
const revealElements = document.querySelectorAll('.reveal');
let currentLang = 'fr';

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      navMenu.classList.remove('active');
    }
  });
}

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setLanguage(lang) {
  document.querySelectorAll('[data-fr][data-en]').forEach((element) => {
    element.textContent = element.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll('[data-fr-html][data-en-html]').forEach((element) => {
    element.innerHTML = element.getAttribute(`data-${lang}-html`);
  });

  document.documentElement.lang = lang;
  currentLang = lang;
  localStorage.setItem('site-language', lang);
}

if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    const next = currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(next);
  });
}

const savedLang = localStorage.getItem('site-language');
setLanguage(savedLang === 'en' ? 'en' : 'fr');
