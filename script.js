
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const langSwitch = document.getElementById('langSwitch');
const revealElements = document.querySelectorAll('.reveal');
const forms = document.querySelectorAll('.contact-form');
let currentLang = 'fr';

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });
  document.addEventListener('click', (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      navMenu.classList.remove('active');
    }
  });
}

if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.14 });
  revealElements.forEach((el) => revealObserver.observe(el));
}

function updateButtonLabel(lang) {
  if (!langSwitch) return;
  langSwitch.innerHTML = lang === 'fr' ? '<span>FR</span> | <span>EN</span>' : '<span>EN</span> | <span>FR</span>';
}

function setLanguage(lang) {
  document.querySelectorAll('[data-fr][data-en]').forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll('[data-fr-placeholder][data-en-placeholder]').forEach((el) => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  document.documentElement.lang = lang;
  currentLang = lang;
  localStorage.setItem('site-language', lang);
  updateButtonLabel(lang);
}

if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    const nextLang = currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(nextLang);
  });
}

const savedLang = localStorage.getItem('site-language');
setLanguage(savedLang === 'en' ? 'en' : 'fr');

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = currentLang === 'fr'
      ? 'Le formulaire est prêt visuellement. Pour un envoi réel, connecte un service comme Formspree, Basin ou Netlify Forms.'
      : 'The form is visually ready. For real submission, connect a service such as Formspree, Basin, or Netlify Forms.';
    alert(message);
  });
});
