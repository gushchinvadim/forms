import { Popover } from "../Popover.js";

describe("Popover Widget", () => {
  let element, popoverInstance;

  beforeEach(() => {
    // Создаем тестовый элемент
    element = document.createElement("button");
    element.id = "test-popover";
    document.body.append(element);

    // Инициируем popover
    popoverInstance = new Popover(element, {
      title: "Test Title",
      content: "Test content",
      placement: "top",
    });
  });

  afterEach(() => {
    // Удаляем элементы и инстанс
    if (popoverInstance) {
      popoverInstance.destroy();
    }

    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });

  test("должен создать поповер с правильным содержимым", () => {
    expect(popoverInstance.popover).toBeInstanceOf(HTMLElement);
    expect(
      popoverInstance.popover.querySelector(".popover-title").textContent,
    ).toBe("Test Title");
    expect(
      popoverInstance.popover.querySelector(".popover-content").innerHTML,
    ).toBe("Test content");
  });

  test("должен показывать поповер при клике", () => {
    // Симулируем клик
    element.click();

    // Проверяем, что поповим
    expect(popoverInstance.popover.style.display).toBe("block");
    expect(popoverInstance.isShown).toBe(true);
  });

  test("должен скрывать поповер при клике на кнопку закрытия", () => {
    // Показываем поповер
    element.click();

    // Симулируем клик на кнопку закрытия
    const closeButton = popoverInstance.popover.querySelector(".popover-close");
    closeButton.click();

    // Проверяем, что поповер скрыт
    expect(popoverInstance.popover.style.display).toBe("none");
    expect(popoverInstance.isShown).toBe(false);
  });

  test("должен скрывать поповер при клике вне его области", () => {
    // Показываем поповер
    element.click();

    // Симулируем клик вне поповера
    document.body.click();

    // Проверяем, что поповер скрыт
    expect(popoverInstance.popover.style.display).toBe("none");
    expect(popoverInstance.isShown).toBe(false);
  });

  test("должен правильно позиционировать поповер сверху", () => {
    // Показываем поповер
    element.click();

    // Проверяем, что позиция корректна
    const popoverRect = popoverInstance.popover.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // Проверяем, что поповер над элементом
    expect(popoverRect.bottom).toBeLessThanOrEqual(elementRect.top);

    // Проверяем центрирование
    const elementCenter = elementRect.left + elementRect.width / 2;
    const popoverCenter = popoverRect.left + popoverRect.width / 2;

    // Допуск 5 пикселей для позиционирования
    expect(Math.abs(elementCenter - popoverCenter)).toBeLessThanOrEqual(5);
  });
});
