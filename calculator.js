/* Object constructors */

function ButtonElement(selector, symbol) {
  this.btn = document.querySelector(selector);
  this.symbol = symbol;
}

/* Component declarations */

const number = [
  new ButtonElement(".c-btn--0", "0"),
  new ButtonElement(".c-btn--1", "1"),
  new ButtonElement(".c-btn--2", "2"),
  new ButtonElement(".c-btn--3", "3"),
  new ButtonElement(".c-btn--4", "4"),
  new ButtonElement(".c-btn--5", "5"),
  new ButtonElement(".c-btn--6", "6"),
  new ButtonElement(".c-btn--7", "7"),
  new ButtonElement(".c-btn--8", "8"),
  new ButtonElement(".c-btn--9", "9"),
];

const dot = new ButtonElement(".c-btn--dot", ".");
const open = new ButtonElement(".c-btn--openBracket", "(");
const close = new ButtonElement(".c-btn--closeBracket", ")");
const sum = new ButtonElement(".c-btn--sum", "+");
const subtract = new ButtonElement(".c-btn--subtraction", "-");
const multiply = new ButtonElement(".c-btn--multiplication", "*");
const divide = new ButtonElement(".c-btn--division", "/");
const result = new ButtonElement(".c-btn--result", "=");
const clear = new ButtonElement(".c-btn--clear", "ac");
const display = document.querySelector(".c-displayBox__text");

/* Global variable declarations */

let displayText = "0";
let displayedResult = false;

const appendDisplay = function (input) {
  if (displayText === "0") displayText = "";
  if (displayedResult) {
    displayText = "";
    displayedResult = false;
    calcStack = [];
  }
  displayText += input.symbol;
  display.textContent = displayText;
};

/* Adding event listeners */

for (let i = 0; i < number.length; i++) {
  number[i].btn.addEventListener("click", () => appendDisplay(number[i]));
}

dot.btn.addEventListener("click", () => appendDisplay(dot));
open.btn.addEventListener("click", () => appendDisplay(open));
close.btn.addEventListener("click", () => appendDisplay(close));
sum.btn.addEventListener("click", () => appendDisplay(sum));
subtract.btn.addEventListener("click", () => appendDisplay(subtract));
multiply.btn.addEventListener("click", () => appendDisplay(multiply));
divide.btn.addEventListener("click", () => appendDisplay(divide));

clear.btn.addEventListener("click", function () {
  displayText = "0";
  display.textContent = displayText;
});

result.btn.addEventListener("click", function () {
  const calcTree = stringToBinaryTree(displayText);
  postOrderCalculation(calcTree.head);
  display.textContent = calcStack[0];
  displayedResult = true;
  printPostOrder(calcTree.head);
});

/* Calculate result from calculation tree */

let calcStack = [];

function postOrderCalculation(head) {
  if (head === null) return;

  postOrderCalculation(head.left);
  postOrderCalculation(head.right);

  if (head.content in operators) {
    switch (head.content) {
      case "+":
        calcStack.push(calcStack.pop() + calcStack.pop());
        break;
      case "-":
        calcStack.push(-calcStack.pop() + calcStack.pop());
        break;
      case "*":
        calcStack.push(calcStack.pop() * calcStack.pop());
        break;
      case "/":
        calcStack.push((1 / calcStack.pop()) * calcStack.pop());
        break;
      default:
        break;
    }
  } else {
    calcStack.push(Number(head.content));
  }
}
