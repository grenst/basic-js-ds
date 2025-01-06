const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
      return;
    }

    let current = this._root;
    while (current) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this._root;

    while (current) {
      if (data === current.data) {
        return true;
      }
      current = data < current.data ? current.left : current.right;
    }

    return false;
  }

  find(data) {
    let current = this._root;

    while (current) {
      if (data === current.data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }

    return null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // Узел без детей
        if (!node.left && !node.right) {
          return null;
        }
        // Узел с одним ребенком
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        // Узел с двумя детьми
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) {
      return null;
    }

    let current = this._root;
    while (current.left) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let current = this._root;
    while (current.right) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};