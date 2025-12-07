// CAROUSEL SCRIPT 

// Main selectors
const track = document.querySelector('.carousel-track');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const indicators = Array.from(document.querySelectorAll('.indicator'));

let currentIndex = 0;
let interval;

// Set slide size dynamically.
const itemWidth = items[0].getBoundingClientRect().width;

// Position the items side by side.
function setSlidePositions() {
  items.forEach((item, index) => {
    item.style.left = `${itemWidth * index}px`;
  });
}

setSlidePositions();


// moves the carousel to a specific index.
function moveToSlide(index) {
  track.style.transform = `translateX(-${itemWidth * index}px)`;

  // update indicator
  indicators.forEach(dot => dot.classList.remove('active'));
  indicators[index].classList.add('active');

  currentIndex = index;
}


// next button
nextBtn.addEventListener('click', () => {
  let newIndex = currentIndex + 1;
  if (newIndex >= items.length) newIndex = 0; // looping
  moveToSlide(newIndex);
  restartAutoPlay();
});


// Back button 
prevBtn.addEventListener('click', () => {
  let newIndex = currentIndex - 1;
  if (newIndex < 0) newIndex = items.length - 1; // looping
  moveToSlide(newIndex);
  restartAutoPlay();
});


// indicators
indicators.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    moveToSlide(index);
    restartAutoPlay();
  });
});


// Autoplay 
function startAutoPlay() {
  interval = setInterval(() => {
    let newIndex = (currentIndex + 1) % items.length;
    moveToSlide(newIndex);
  }, 5000);
}

function stopAutoPlay() {
  clearInterval(interval);
}

function restartAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

startAutoPlay();


// Pause autoplay when mouse hovers over carousel.
const carouselWrapper = document.querySelector('.carousel-container');

carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
carouselWrapper.addEventListener('mouseleave', startAutoPlay);


// Adjust positions when resizing the screen.
window.addEventListener('resize', () => {
  const newWidth = items[0].getBoundingClientRect().width;

  items.forEach((item, i) => {
    item.style.left = `${newWidth * i}px`;
  });

  // reposition to the current slide
  track.style.transform = `translateX(-${newWidth * currentIndex}px)`;
});