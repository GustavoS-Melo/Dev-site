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