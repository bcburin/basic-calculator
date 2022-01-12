/* Implementing lexical components */

function lexicalComponent(content = null, type = null) {
  this.content = content;
  this.type = type;
}

/* Conversion Functions */

function stringToLexicalComponents(str) {
  let components = [];
  i = 0;
  while (i < str.length) {
    if (str[i] in digits) {
      // push new number component
      let number = "";
      while (str[i] in digits) {
        number += str[i++];
      }
      components.push(new lexicalComponent(number, "num"));
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
  return components;
}

function componentToNode(component) {
  switch (component.type) {
    case "num":
    case "op":
      return new Node(component.content);
    case "exp":
      console.log("exp");
      return stringToBinaryTree(component.content).head;
    default:
      return null;
  }
}

/* Implementing syntax parser */

// Contains valid operators and their respective priorities
const operators = {
  "+": 0,
  "-": 1,
  "*": 2,
  "/": 3,
};

// Contains valid digits
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

function stringToBinaryTree(str) {
  const component = stringToLexicalComponents(str);

  let btree = new BinaryTree();
  let leftNode = null;
  let rightNode = null;
  let opNode = null;

  function adoptLeftInsert() {
    attachNodes(opNode, leftNode, rightNode);
    btree.head = opNode;
    leftNode = opNode;
  }

  function stealRightInsert() {
    attachNodes(opNode, leftNode.right, rightNode); // steal right node of former operator
    opNode.parent = leftNode;
    leftNode.right = opNode;
    leftNode = opNode;
  }

  leftNode = componentToNode(component[0]);

  for (let i = 1; i < component.length; i += 2) {
    opNode = componentToNode(component[i]);
    rightNode = componentToNode(component[i + 1]);

    if (!(leftNode.content in operators)) {
      adoptLeftInsert();
    } else if (operators[opNode.content] >= operators[leftNode.content]) {
      stealRightInsert();
    } else {
      while (
        operators[opNode.content] < operators[leftNode.content] &&
        leftNode.parent !== null
      ) {
        leftNode = leftNode.parent;
      }
      if (operators[opNode.content] >= operators[leftNode.content]) {
        stealRightInsert();
      } else {
        adoptLeftInsert();
      }
    }
  }
  return btree;
}

// btree = stringToBinaryTree("(3+4)*2+1");
// // console.log("head:" + btree.head.content);
// printPostOrder(btree.head);
