// Determine valid operators and their relative priorities
const operators = {
  "+": 0,
  "-": 1,
  "*": 2,
  "/": 3,
};

// Determine valid digits
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

/* Implement lexical components of an expression */
function lexicalComponent(content = null, type = null) {
  this.content = content;
  this.type = type;
}

/* Parse input string and return array containing lexical components post-oredered */
function parseString(str) {
  let components = [];

  if (str[0] === "-") str = "(0-" + str[1] + ")" + str.slice(2); // first number is negative

  for (let i = 0; i < str.length; ) {
    if (digits.includes(str[i])) {
      // push new number component
      let number = "";
      while (digits.includes(str[i])) {
        number += str[i++];
      }
      components.push(new lexicalComponent(Number(number), "num"));
    } else if (str[i] in operators) {
      // push new operator component
      let operator = str[i++];
      components.push(new lexicalComponent(operator, "op"));
    } else if (str[i] === "(") {
      // push new expression component
      let expression = "";
      while (str[++i] !== ")") {
        expression += str[i];
      }
      components.push(new lexicalComponent(expression, "exp"));
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
