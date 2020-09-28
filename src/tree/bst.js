// bst binary search tree

class Node {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  add(element) {
    if (null === this.root) {
      this.root = new Node(element, null);
      this.size++;
      return;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.element > element) {
        if (!currentNode.left) {
          currentNode.left = new Node(element, currentNode);
          currentNode = null;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = new Node(element, currentNode);
          currentNode = null;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    this.size++;
  }
  preOrderTraversal(visitor) {
    const traversal = (node) => {
      if (!node) {
        return;
      }
      visitor.visit(node);
      traversal(node.left);
      traversal(node.right);
    };
    traversal(this.root);
  }
  midOrderTraversal(visitor) {
    const traversal = (node) => {
      if (!node) {
        return;
      }
      traversal(node.left);
      visitor.visit(node);
      traversal(node.right);
    };
    traversal(this.root);
  }
  postOrderTraversal(visitor) {
    const traversal = (node) => {
      if (!node) {
        return;
      }
      traversal(node.left);
      traversal(node.right);
      visitor.visit(node);
    };
    traversal(this.root);
  }
  levelOrderTraversal(visitor) {
    if (this.root == null) return;
    const array = [this.root];
    let index = 0;
    while (array[index]) {
      const current = array[index];
      visitor.visit(current);
      current.left && array.push(current.left);
      current.right && array.push(current.right);
      index++;
    }
  }
}

let bst = new BST();
let arr = [10, 8, 19, 6, 15, 22, 20];
arr.forEach((item) => {
  bst.add(item);
});

// bst.preOrderTraversal({
//   visit: (node) => {
//     if (node) {
//       console.log(node.element);
//     }
//   },
// });
bst.levelOrderTraversal({
  visit: (node) => {
    if (node) {
      console.log(node.element);
    }
  },
});
