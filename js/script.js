"use strict";

// POPUP

const popupBtn = document.querySelectorAll(".act__popup");
const popup = document.querySelector(".popup");

popupBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    popup.classList.toggle("popup--show");
  });
});

// Reveal sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.05,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;
  console.log(maxSlide);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
  };

  goToSlide(0);
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
};

slider();

// Navigation

const navBtn = document.querySelector(".navigation__icon");
const line = document.querySelector(".line");
const overlay = document.querySelector(".navigation__overlay");
const list = document.querySelector(".navigation__list");
const navLink = document.querySelectorAll(".navigation__link");

const navToggle = () => {
  line.classList.toggle("line--open");
  navBtn.classList.toggle("navigation__icon--open");
  overlay.classList.toggle("navigation__overlay--open");
  list.classList.toggle("item--open");
};

navBtn.addEventListener("click", navToggle);
list.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("navigation__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
    navToggle();
  }
});
