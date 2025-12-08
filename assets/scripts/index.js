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