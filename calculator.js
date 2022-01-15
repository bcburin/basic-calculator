"use strict";

import CalculatorKey from ".//models//components//calculator-key.js";

/* Component declarations */

const numbers = [
  new CalculatorKey(".c-btn--0"),
  new CalculatorKey(".c-btn--1"),
  new CalculatorKey(".c-btn--2"),
  new CalculatorKey(".c-btn--3"),
  new CalculatorKey(".c-btn--4"),
  new CalculatorKey(".c-btn--5"),
  new CalculatorKey(".c-btn--6"),
  new CalculatorKey(".c-btn--7"),
  new CalculatorKey(".c-btn--8"),
  new CalculatorKey(".c-btn--9"),
];

const dot = new CalculatorKey(".c-btn--dot");
const open = new CalculatorKey(".c-btn--openBracket");
const close = new CalculatorKey(".c-btn--closeBracket");
const sum = new CalculatorKey(".c-btn--sum");
const subtract = new CalculatorKey(".c-btn--subtraction");
const multiply = new CalculatorKey(".c-btn--multiplication");
const divide = new CalculatorKey(".c-btn--division");
const result = new CalculatorKey(".c-btn--result");
const clear = new CalculatorKey(".c-btn--clear");

document.addEventListener("keydown", function (event) {
  const key = event.key;

  switch (key) {
    case "+":
      sum.defaultAction();
      break;
    case "-":
      subtract.defaultAction();
      break;
    case "*":
      multiply.defaultAction();
      break;
    case "/":
      divide.defaultAction();
      break;
    case "(":
    case "o":
      open.defaultAction();
      break;
    case ")":
    case "p":
      close.defaultAction();
      break;
    case "=":
    case "Enter":
      result.defaultAction();
      break;
    case "x":
      clear.defaultAction();
      break;
    case ".":
    case ",":
      dot.defaultAction();
    default:
      for (const [i, number] of numbers.entries()) {
        if (Number(key) === i) {
          number.defaultAction();
        }
      }
  }
});
