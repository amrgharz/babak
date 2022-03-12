//Sticky Menu
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //in viewPort
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// The Slider Functionality
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const rightBtn = document.querySelector(".slider__btn--right");
  const leftBtn = document.querySelector(".slider__btn--left");
  const dotsContainer = document.querySelector(".dots");
  let currentSlide = 0;
  let maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<botton class="dots__dot" data-slide="${i}"></botton>`
      );
    });
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };

  // Initial state
  function init() {
    createDots();
    goToSlide(0);
    activeDots(0);
  }
  init();

  //Event handlers
  rightBtn.addEventListener("click", nextSlide);
  leftBtn.addEventListener("click", previousSlide);

  // Handeling keyboard events
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      previousSlide();
    }
    e.key === "ArrowRight" && nextSlide();
  });

  //Navigating using the dots
  dotsContainer.addEventListener("click", function (e) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDots(slide);
  });

  //set interval
  setInterval(() => {
    nextSlide();
  }, 3000);
};
slider();

//Animate team text

var text = document.querySelectorAll(".our-team-info");
function scrolListener(e) {
  var screenTop = document.scrollingElement.scrollTop;
  var screenBottom = screenTop + innerHeight;
  console.log(text);
  for (let i = 0; i < text.length; i++) {
    var textTop = text[i].getBoundingClientRect().top;
    console.log(textTop);
  }
  if (textTop < screenBottom && textTop < screenTop) {
    text.forEach((text) => {
      text.classList.add("showtext");
      text.classList.remove("hidetext");
    });
  }
}
document.onscroll = scrolListener;
