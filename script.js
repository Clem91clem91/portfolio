const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const langSwitch = document.getElementById('langSwitch');
const revealElements = document.querySelectorAll('.reveal');

let currentLang = localStorage.getItem('siteLang') || 'fr';

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });
}

const updateLanguage = (lang) => {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-fr][data-en]').forEach((node) => {
    node.textContent = node.dataset[lang];
  });

  document.querySelectorAll('[data-fr-placeholder][data-en-placeholder]').forEach((node) => {
    node.setAttribute('placeholder', node.dataset[`${lang}Placeholder`]);
  });

  if (langSwitch) {
    langSwitch.innerHTML = lang === 'fr' ? '<span>FR</span> | <span>EN</span>' : '<span>EN</span> | <span>FR</span>';
  }

  currentLang = lang;
  localStorage.setItem('siteLang', lang);
};

if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    updateLanguage(currentLang === 'fr' ? 'en' : 'fr');
  });
}

updateLanguage(currentLang);

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
}
