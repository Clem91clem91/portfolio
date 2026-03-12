const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const langSwitch = document.getElementById("langSwitch");
const revealElements = document.querySelectorAll(".reveal");
const forms = document.querySelectorAll(".contact-form");

let currentLang = "fr";

/* =========================
   MOBILE MENU
========================= */

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navMenu.classList.remove("active");
    }
  });
}

/* =========================
   REVEAL ON SCROLL
========================= */

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

/* =========================
   LANGUAGE SWITCH
========================= */

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-fr][data-en]");

  elements.forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  const placeholderElements = document.querySelectorAll("[data-fr-placeholder][data-en-placeholder]");

  placeholderElements.forEach((el) => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  document.documentElement.lang = lang;
  currentLang = lang;
  localStorage.setItem("site-language", lang);
}

if (langSwitch) {
  langSwitch.addEventListener("click", () => {
    const newLang = currentLang === "fr" ? "en" : "fr";
    setLanguage(newLang);
  });
}

const savedLang = localStorage.getItem("site-language");
if (savedLang === "fr" || savedLang === "en") {
  setLanguage(savedLang);
} else {
  setLanguage("fr");
}

/* =========================
   CONTACT FORM - VISUAL ONLY
========================= */

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message =
      currentLang === "fr"
        ? "Le formulaire est prêt visuellement. Pour l’envoi réel depuis GitHub Pages, il faudra connecter un service comme Formspree."
        : "The form is visually ready. For real submission from GitHub Pages, a service such as Formspree will need to be connected.";

    alert(message);
  });
});