export default function faqToggle() {
  const btn = document.querySelector(".s-faq__more-btn");

  if (btn) {
    const spollersDom = document.querySelectorAll(".s-faq__spoller");
    const spollers = Array.from(spollersDom).splice(4, spollersDom.length);

    spollers.forEach((s) => (s.style.display = "none"));

    btn.addEventListener("click", () => {
      if (btn.classList.contains("_active")) {
        spollers.forEach((s) => (s.style.display = "none"));
        btn.classList.remove("_active");
        btn.textContent = "Чи є протипоказання?";
      } else {
        spollers.forEach((s) => (s.style.display = "block"));
        btn.classList.add("_active");
        btn.textContent = "Сховавши";
      }
    });
  }
}
