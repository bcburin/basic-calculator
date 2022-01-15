"use strict";

/* Component declarations */

const number = [
  document.querySelector(".c-btn--0"),
  document.querySelector(".c-btn--1"),
  document.querySelector(".c-btn--2"),
  document.querySelector(".c-btn--3"),
  document.querySelector(".c-btn--4"),
  document.querySelector(".c-btn--5"),
  document.querySelector(".c-btn--6"),
  document.querySelector(".c-btn--7"),
  document.querySelector(".c-btn--8"),
  document.querySelector(".c-btn--9"),
];

const dot = document.querySelector(".c-btn--dot");
const open = document.querySelector(".c-btn--openBracket");
const close = document.querySelector(".c-btn--closeBracket");
const sum = document.querySelector(".c-btn--sum");
const subtract = document.querySelector(".c-btn--subtraction");
const multiply = document.querySelector(".c-btn--multiplication");
const divide = document.querySelector(".c-btn--division");
const result = document.querySelector(".c-btn--result");
const clear = document.querySelector(".c-btn--clear");
const display = document.querySelector(".c-displayBox__text");

/* Global variable declarations */

let displayText = "0";
let displayedResult = false;

const appendDisplay = function () {
  if (displayText === "0") displayText = "";
  if (displayedResult) {
    if (!(this.textContent in operators)) displayText = "";
    displayedResult = false;
  }
  displayText += this.textContent;
  display.textContent = displayText;
};

/* Adding event listeners */

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", appendDisplay);
}

dot.addEventListener("click", appendDisplay);
open.addEventListener("click", appendDisplay);
close.addEventListener("click", appendDisplay);
sum.addEventListener("click", appendDisplay);
subtract.addEventListener("click", appendDisplay);
multiply.addEventListener("click", appendDisplay);
divide.addEventListener("click", appendDisplay);

clear.addEventListener("click", function () {
  displayText = "0";
  display.textContent = displayText;
});

result.addEventListener("click", function () {
  displayText = calculateExpression(displayText);
  display.textContent = displayText;
  displayedResult = true;
});
