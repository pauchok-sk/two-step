import "../scss/style.scss";
import anchor from "./files/anchors.js";
import burger from "./files/burger.js";
import spoller from "./files/spoller.js";
import tab from "./files/tab.js";
import timer from "./files/timer.js";

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});
// Fancybox.show([{ src: "#modal-login", type: "inline" }]);

spoller();
burger();
tab();
timer();
anchor();