const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const langSwitch = document.getElementById("langSwitch");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

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

// Language switch
let currentLang = "fr";

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-fr][data-en]");

  elements.forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
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