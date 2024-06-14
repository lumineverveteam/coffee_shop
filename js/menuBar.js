// Selectors

const swiperWrapper = document.querySelector('.swiper-wrapper');
const menuSections = [...document.querySelectorAll('.section[data-topic]')];

const offset = 70; // In px

// Funtions

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,

  spaceBetween: 20,
  slidesPerView: 'auto',
  centeredSlides: true,
  slideToClickedSlide: true,

  breakpoints: {
    768: {
      spaceBetween: 100,
    },
  },
});

swiper.on('slideChange', function (e) {
  const activeSlideIndex = e.activeIndex;
  const activeSlide = swiperWrapper.querySelector(
    `[data-index= "${activeSlideIndex}"]`
  );

  const activeSlideTopic = activeSlide.dataset.topic;
  const relevantSection = menuSections.find(
    section => section.dataset.topic === activeSlideTopic
  ).previousElementSibling;

  const sectionDistanceToTop = relevantSection.getBoundingClientRect().top;
  const scrollTo = sectionDistanceToTop + window.pageYOffset - offset;

  window.scrollTo({
    top: scrollTo,
    behavior: 'smooth',
  });
});
