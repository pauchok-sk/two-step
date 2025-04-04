export default function coursesToggle() {
  const btn = document.querySelector("#courses-btn");

  if (btn) {
    const aside = document.querySelector("#aside-courses");
    const overlay = document.querySelector("#aside-overlay");
    const btnClose = document.querySelector("#courses-close");

    btn.addEventListener("click", () => {
      if (aside.classList.contains("_open")) {
        handleClose();
      } else {
        handleOpen();
      }
    });

    btnClose.addEventListener("click", handleClose);
    overlay.addEventListener("click", handleClose);

    function handleOpen() {
      aside.classList.add("_open");
      overlay.classList.add("_active");
      document.body.classList.add("body-hidden");
    }

    function handleClose() {
      aside.classList.remove("_open");
      overlay.classList.remove("_active");
      document.body.classList.remove("body-hidden");
    }
  }
}
