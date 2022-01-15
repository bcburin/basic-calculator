"use strict";

import LexicalComponent from "./lexical-component.js";
import { digits } from "./calculator-key.js";
import { operators } from "./calculator-key.js";

/* Parse input string and return array containing lexical components post-oredered */
function parseString(str) {
  let components = [];

  if (str[0] === "-") str = "(0-" + str[1] + ")" + str.slice(2); // first number is negative

  for (let i = 0; i < str.length; ) {
    if (digits.has(str[i])) {
      // push new number component
      let number = "";
      while (digits.has(str[i])) {
        number += str[i++];
      }
      components.push(new LexicalComponent(Number(number), "num"));
    } else if (str[i] in operators) {
      // push new operator component
      let operator = str[i++];
      components.push(new LexicalComponent(operator, "op"));
    } else if (str[i] === "(") {
      // push new expression component
      let expression = "";
      let braCount = 0;
      do {
        if (str[i] === "(") braCount++;
        if (str[i] === ")") braCount--;
        expression += str[i];

        i++;
      } while (braCount !== 0);
      expression = expression.slice(1, -1);
      components.push(new LexicalComponent(expression, "exp"));
      i++;
    }
  }
  // reorder array in post-order and return
  return toPostOrder(components);
}

/* Implement post-ordering for raw component array */

function toPostOrder(components) {
  for (let i = 0; i < components.length; i++) {
    if (components[i].type === "op") {
      for (
        let j = i;
        j < components.length - 1 &&
        (components[j + 1].type !== "op" ||
          operators[components[j].content] <
            operators[components[j + 1].content]);
        j++
      ) {
        //shift operator to the right
        let temp = components[j];
        components[j] = components[j + 1];
        components[j + 1] = temp;
      }
    }
  }
  return components;
}

/* Given a string containing a expression, return its calculated value */
function calculateExpression(str) {
  let components = parseString(str);
  let stack = [];

  for (let i = 0; i < components.length; i++) {
    let component = components[i];
    switch (component.type) {
      case "num":
        stack.push(component.content);
        break;
      case "exp":
        stack.push(calculateExpression(component.content));
        break;
      case "op":
        // retrieve last two items from stack
        let n2 = stack.pop();
        let n1 = stack.pop();
        let result;

        // make correspondent calculation
        switch (component.content) {
          case "+":
            result = n1 + n2;
            break;
          case "-":
            result = n1 - n2;
            break;
          case "*":
            result = n1 * n2;
            break;
          case "/":
            result = n1 / n2;
            break;
          default:
            console.log("unsupported operator");
            return null;
        }

        // allocate result on stack
        stack.push(result);

        break;
    }
  }
  return stack[0];
}

export default calculateExpression;
