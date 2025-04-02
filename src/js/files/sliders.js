export default function sliders() {
  const reviewsSlider = document.querySelector(".s-reviews__slider");

  if (reviewsSlider) {
    const slider = new Swiper(reviewsSlider, {
      speed: 800,
      spaceBetween: 16,
      slidesPerView: 1,
      autoplay: {
        delay: 3500,
      },
      navigation: {
        prevEl: ".s-reviews .slider-btn._prev",
        nextEl: ".s-reviews .slider-btn._next",
      },
      pagination: {
        el: ".s-reviews .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          spaceBetween: 32,
          slidesPerView: 2,
        }
      }
    });
  }
}
