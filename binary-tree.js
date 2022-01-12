/* Implenting binary tree */

function BinaryTree(head = new Node()) {
  this.head = head;
}

function Node(content = "", parent = null, left = null, right = null) {
  this.content = content;
  this.parent = parent;
  this.left = left;
  this.right = right;
}

function attachNodes(parent, leftChild, rightChild) {
  parent.left = leftChild;
  parent.right = rightChild;

  leftChild.parent = parent;
  rightChild.parent = parent;
}

function printPostOrder(head) {
  if (head === null) return;

  printPostOrder(head.left);
  printPostOrder(head.right);
  console.log(head.content);
}
