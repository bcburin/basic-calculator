import calculateExpression from "./parser.js";

// Determine valid operators and their relative priorities
export const operators = {
  "+": 0,
  "-": 1,
  "*": 2,
  "/": 3,
};

// Determine valid digits
export const digits = new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
]);

// Find the display element over which the calculator key will act
const display = document.querySelector(".c-displayBox__text");

// Store the information of whether the result has already been displayed
let displayedResult = false;

class CalculatorKey {
  constructor(selector) {
    const self = this;

    // Find element
    self.element = document.querySelector(selector);

    // Get the key type based on its content
    const content = self.element.textContent;
    if (digits.has(content)) {
      self.type = "digit";
    } else if (content in operators) {
      self.type = "operator";
    } else if (content === "(" || content === ")") {
      self.type = "bracket";
    } else if (content === "AC") {
      self.type = "clear";
    } else if (content === "=") {
      self.type = "result";
    } else if (content === "⬅") {
      self.type = "delete";
    }
    // Add event listener
    switch (self.type) {
      case "digit":
      case "bracket":
      case "operator":
        self.defaultAction = self.appendDisplay.bind(self);
        break;
      case "clear":
        self.defaultAction = self.clearDisplay.bind(self);
        break;
      case "result":
        self.defaultAction = self.resultDisplay.bind(self);
        break;
      case "delete":
        self.defaultAction = self.deleteDisplay.bind(self);
    }
    self.element.addEventListener("click", self.defaultAction);
  }

  appendDisplay() {
    if (display.textContent === "0") display.textContent = "";
    if (displayedResult) {
      if (this.type !== "operator") display.textContent = "";
      displayedResult = false;
    }
    display.textContent += this.element.textContent;
  }

  clearDisplay() {
    display.textContent = "0";
  }

  resultDisplay() {
    display.textContent = calculateExpression(display.textContent);
    displayedResult = true;
  }

  deleteDisplay() {
    if (display.textContent === "0") return;
    if (display.textContent.length === 1) {
      display.textContent = "0";
      return;
    }
    display.textContent = display.textContent.slice(0, -1);
  }
}

export default CalculatorKey;
