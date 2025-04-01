export default function burger() {
  const burgerOpenBtn = document.querySelector("#burger-open");
  const burgerCloseBtn = document.querySelector("#burger-close");
  const burger = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");

  if (burger) {
    burgerOverlay.addEventListener("click", burgerClose);

    burgerOpenBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      burgerOpen();
    });
    burgerCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      burgerClose();
    });

    function burgerOpen() {
      burger.classList.add("_open");
      burgerOverlay.classList.add("_active");
      document.body.classList.add("body-hidden");
    }

    function updateHeightBurger() {
      burger.style.maxHeight = `${window.visualViewport.height}px`;
    }

    window.visualViewport.addEventListener("resize", updateHeightBurger);
    window.visualViewport.addEventListener("scroll", updateHeightBurger);

    updateHeightBurger();
  }
}

export function burgerClose() {
  const burger = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");

  burger.classList.remove("_open");
  burgerOverlay.classList.remove("_active");
  document.body.classList.remove("body-hidden");
}
