// CAROUSEL SCRIPT 

// Main selectors

const track = document.querySelector(".carousel-track");
const items = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;
const totalSlides = items.length;

// Update carousel position
function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  indicators.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// "next" button
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

// "prev" button
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

// Indicators
indicators.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Auto-play
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 5000);

//Fade-in

document.addEventListener("DOMContentLoaded", () => {
  const debug = false;
  const nodeList = new Set();
  document.querySelectorAll('section').forEach(el => nodeList.add(el));
  document.querySelectorAll('.section').forEach(el => nodeList.add(el));

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up').forEach(el => nodeList.add(el));

  const revealElements = Array.from(nodeList).filter(Boolean);

  if (revealElements.length === 0) {
    if (debug) console.log('Reveal: nenhum elemento encontrado para observar.');
    return;
  }

  revealElements.forEach(el => {
    // don't touch elements inside modals, hidden etc.
    // add reveal class (only if not present)
    if (!el.classList.contains('reveal')) el.classList.add('reveal');

    // remove classes that cause immediate animation so we control when animation starts
    el.classList.remove('fade-in', 'fade-in-left', 'fade-in-right', 'fade-in-up');

    // optional debug outline so you see what's being observed
    if (debug) {
      el.style.outline = '1px dashed rgba(255,255,255,0.08)';
      el.dataset._reveal = 'observed';
    }
  });

  // 3) IntersectionObserver
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        // add visible class
        el.classList.add('visible');

        obs.unobserve(el);

        if (debug) console.log('Reveal: revealed', el);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12 // 12% visible
  });

  revealElements.forEach(el => {
    // if element is already visible on load, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // element is already on screen; reveal immediately
      el.classList.add('visible');
      if (debug) console.log('Reveal: already visible', el);
    } else {
      observer.observe(el);
    }
  });

  if (debug) console.log(`Reveal: observing ${revealElements.length} elements`);
});

// Switch Language

// Selectors

const langBtn = document.querySelector("#lang-btn");
const langImg = document.querySelector("#lang-btn img");

let currentLang = localStorage.getItem("site-lang") || "pt";

// Load the initial language
loadLanguage(currentLang);

// Switch language on click
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  localStorage.setItem("site-lang", currentLang);
  loadLanguage(currentLang);
});

// Function to load JSON file and apply translations.
function loadLanguage(lang) {
  fetch(`./assets/language/json/${lang}.json`)
    .then(response => response.json())
    .then(data => applyTranslations(data));
}

function applyTranslations(data) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");

    // Support for placeholder text
    if (el.placeholder !== undefined && data[key]) {
      el.placeholder = data[key];
    }

    // Suport for aria-label
    if (el.hasAttribute("aria-label") && data[key]) {
      el.setAttribute("aria-label", data[key]);
    }

    // Suport for data-i18n-placeholder
    if (el.hasAttribute("data-i18n-placeholder")) {
      const placeholderKey = el.getAttribute("data-i18n-placeholder");
      if (data[placeholderKey]) {
        el.placeholder = data[placeholderKey];
      }
    }

    // Intern Text
    if (data[key]) {
      el.innerHTML = data[key];
    }
  });

  // Update the button image and alt text
  if (currentLang === "pt") {
    langImg.src = "./assets/imgs/flag language/united-kingdom.jpg";
    langImg.alt = data["lang.current"] || "English";  // Usa tradução do JSON ou fallback
  } else {
    langImg.src = "./assets/imgs/flag language/brasil.jpg";
    langImg.alt = data["lang.current"] || "Português";
  }
}

// Switch theme

// Selectors
const themeToggle = document.querySelector("#theme-toggle");
const html = document.documentElement;

// Check saved theme or apply 'light'
let currentTheme = localStorage.getItem("site-theme") || "light";
html.setAttribute("data-theme", currentTheme);

// Applies correct icons at startup.
updateThemeIcons(currentTheme);

// Button click event
themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  html.setAttribute("data-theme", currentTheme);
  localStorage.setItem("site-theme", currentTheme);

  updateThemeIcons(currentTheme);
});

// Function to display the correct icon
function updateThemeIcons(theme) {
  const sun = document.querySelector(".sun-icon");
  const moon = document.querySelector(".moon-icon");

  if (theme === "light") {
    // Light mode shows moon first (clicking activates dark mode)
    moon.style.opacity = "1";
    moon.style.transform = "scale(1)";
    sun.style.opacity = "0";
    sun.style.transform = "scale(0)";
  } else {
    // Dark mode to show the sun
    sun.style.opacity = "1";
    sun.style.transform = "scale(1)";
    moon.style.opacity = "0";
    moon.style.transform = "scale(0)";
  }
}

// Menu Mobile
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Open and close the mobile menu
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  navMenu.classList.toggle("open");
});

// Close the menu when you click a link
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

// FORM EMAIL JS
emailjs.init("W44hxtTVSp4ItfpCr");

const successScreen = document.querySelector('#success-screen');

document.querySelector('#form-contato').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value,
        subject: document.querySelector('#subject').value,
        message: document.querySelector('#message').value
    };

    const serviceId = 'service_ts2bkfk';
    const templateId = 'template_42pavol';

    emailjs.send(serviceId, templateId, formData).then(() => {
        successScreen.style.display = 'flex';

        setTimeout(() => {}, 4000)
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao enviar o formulário, por favor atualize a página e tente novamente. Caso o erro persista por favor nos procure através de nossos outros canais de comunicação');
    });
});