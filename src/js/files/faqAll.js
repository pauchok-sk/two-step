export default function faqAll() {
  const btn = document.querySelector(".s-faq__more-btn");

  if (btn) {
    const spollers = document.querySelectorAll(".s-faq__spoller");

    spollers.forEach((s, index) => {
      if (index > 4) {
        s.style.display = "none";
      }
    });

    btn.addEventListener("click", () => {
      spollers.forEach((s) => (s.style.display = "block"));
      btn.remove();
    });
  }
}
