import "../scss/style.scss";
import anchor from "./files/anchors.js";
import burger from "./files/burger.js";
import coursesToggle from "./files/coursesToggle.js";
import faqToggle from "./files/faqToggle.js";
import headerScroll from "./files/headerScroll.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tab from "./files/tab.js";
import timer from "./files/timer.js";

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});
// Fancybox.show([{ src: "#modal-mentor-1", type: "inline" }]);

spoller();
burger();
tab();
timer();
anchor();
sliders();
headerScroll();
faqToggle();
coursesToggle();

document.addEventListener("DOMContentLoaded", () => {
  const player = new Plyr("#player");
});
