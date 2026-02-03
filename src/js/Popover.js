export class Popover {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      title: "Popover title",
      content: "And here's some amazing content.",
      ...options,
    };

    this.popover = null;
    this.isShown = false;
    this.clickHandler = null;
    this.documentClickHandler = null;

    this._init();
  }

  _init() {
    this._createPopover();

    // Сохраняем обработчики для последующего удаления
    this.clickHandler = (e) => {
      e.stopPropagation();
      this.toggle();
    };

    this.documentClickHandler = (e) => {
      if (
        this.isShown &&
        !this.popover.contains(e.target) &&
        !this.element.contains(e.target)
      ) {
        this.hide();
      }
    };

    this.element.addEventListener("click", this.clickHandler);
    document.addEventListener("click", this.documentClickHandler);
  }

  _createPopover() {
    if (this.popover) return;

    this.popover = document.createElement("div");
    this.popover.className = "popover";
    this.popover.style.display = "none";

    const arrow = document.createElement("div");
    arrow.className = "popover-arrow";
    this.popover.append(arrow);

    const header = document.createElement("h3");
    header.className = "popover-title";
    header.textContent = this.options.title;
    this.popover.append(header);

    const content = document.createElement("div");
    content.className = "popover-content";
    content.innerHTML = this.options.content;
    this.popover.append(content);

    const closeButton = document.createElement("button");
    closeButton.className = "popover-close";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hide();
    });
    this.popover.append(closeButton);

    document.body.append(this.popover);
  }

  _calculatePosition() {
    const buttonRect = this.element.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();

    const left = buttonRect.left + buttonRect.width / 2 - popoverRect.width / 2;
    const top = buttonRect.top - popoverRect.height - 10;

    return { top, left };
  }

  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.isShown) return;

    // Сначала показываем, чтобы получить реальные размеры
    this.popover.style.display = "block";

    const { top, left } = this._calculatePosition();
    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;

    this.isShown = true;
  }

  hide() {
    if (!this.isShown) return;

    this.popover.style.display = "none";
    this.isShown = false;
  }

  // ДОБАВЛЕН МЕТОД DESTROY
  destroy() {
    // Удаляем обработчики событий
    if (this.clickHandler) {
      this.element.removeEventListener("click", this.clickHandler);
    }

    if (this.documentClickHandler) {
      document.removeEventListener("click", this.documentClickHandler);
    }

    // Удаляем поповер из DOM
    if (this.popover && this.popover.parentNode) {
      this.popover.parentNode.removeChild(this.popover);
    }

    // Очищаем ссылки
    this.popover = null;
    this.element = null;
    this.clickHandler = null;
    this.documentClickHandler = null;
  }
}
