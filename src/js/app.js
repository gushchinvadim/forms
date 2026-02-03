import { Popover } from "./Popover.js";

document.addEventListener("DOMContentLoaded", () => {
  // Инициализируем popover
  const triggerElement = document.getElementById("popover-trigger");

  if (triggerElement) {
    new Popover(triggerElement, {
      title: "Popover title",
      content:
        "Popover должен появляться сверху и быть центрирован по горизонтали",
      placement: "top",
    });
  }
});
