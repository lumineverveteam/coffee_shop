// Selectors

const swiperWrapper = document.querySelector('.swiper-wrapper');
const mainSections = [...document.querySelectorAll('.section[data-topic]')];

const offset = 70; // In px

// Funtions

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  speed: 400,

  spaceBetween: -80,
  slidesPerView: 'auto',
  centeredSlides: true,
  slideToClickedSlide: true,

  breakpoints: {
    410: {
      spaceBetween: -60,
    },
    450: {
      spaceBetween: -40,
    },
    500: {
      spaceBetween: -20,
    },
    768: {
      spaceBetween: 0,
    },
  },
});

swiper.on('slideChange', function (e) {
  const activeSlideIndex = e.activeIndex;
  const activeSlide = swiperWrapper.querySelector(
    `[data-index= "${activeSlideIndex}"]`
  );

  const activeSlideTopic = activeSlide.dataset.topic;
  const relevantSection = mainSections.find(
    section => section.dataset.topic === activeSlideTopic
  ).previousElementSibling;

  const sectionDistanceToTop = relevantSection.getBoundingClientRect().top;
  const scrollTo = sectionDistanceToTop + window.pageYOffset - offset;

  window.scrollTo({
    top: scrollTo,
    behavior: 'smooth',
  });
});

///////////////////////////////////
// NavBar change on section chenge

let lastTimeout,
  count = 0;

const goToSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  const section = entry.target;
  const relevantSlide = [...swiperWrapper.children].find(
    slide => slide.dataset.topic === section.dataset.topic
  );

  const relevantSlideIndex = relevantSlide.dataset.index;

  if (lastTimeout) clearTimeout(lastTimeout);
  lastTimeout = setTimeout(function () {
    count++;
    swiper.slideTo(relevantSlideIndex, 400, false);
  }, 300);
};

const sectionObserver = new IntersectionObserver(goToSection, {
  root: null,
  threshold: 0.4,
});

mainSections.forEach(section => {
  sectionObserver.observe(section);
});
