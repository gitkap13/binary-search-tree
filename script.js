function treeFactory(arr = []) {
  function nodeFactory(data = null, left = null, right = null) {
    return { data, left, right };
  }
  arr.sort((a, b) => a - b);
  this.root = buildTree(arr);
  function buildTree(array, start = 0, end = array.length - 1) {
    array = [...new Set(array)];

    if (start > end || array.length == 0) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let left = array.slice(start, mid);
    let right = array.slice(mid + 1, array.length);
    let node = nodeFactory(array[mid]);
    node.left = buildTree(left, 0, left.length - 1);
    node.right = buildTree(right, 0, right.length - 1);
    return node;
  }
  function insertNode(data, root = this.root) {
    function insert(data) {
      if (newNode.data < root.data) {
        if (root.left == null) {
          root.left = newNode;
        } else {
          insertNode(data, root.left);
        }
      }
      if (newNode.data > root.data) {
        if (root.right == null) {
          root.right = newNode;
        } else {
          insertNode(data, root.right);
        }
      }
    }

    let newNode = nodeFactory(data);

    if (root == null) {
      root = newNode;
    } else {
      insert(data);
    }
  }
  function deleteNode(node, root = this.root) {
    if (root === null) {
      console.log("Node could not be found.");
      return root;
    }

    if (root.data < node) {
      root.right = deleteNode(node, root.right);
      return root;
    } else if (root.data > node) {
      root.left = deleteNode(node, root.left);
      return root;
    }
    if (root.left === null) {
      let tmp = root.right;
      delete root;
      return tmp;
    } else if (root.right === null) {
      let tmp = root.left;
      delete root;
      return tmp;
    } else {
      let parent = root;
      let successor = root.right;

      while (successor.left !== null) {
        parent = successor;
        successor = successor.left;
      }
      if (parent !== root) {
        parent.left = successor.right;
      } else parent.right = successor.right;

      root.data = successor.data;

      delete successor;
      return root;
    }
  }
  function findNode(root, data) {
    if (data > root.data) {
      if (root.right == null) {
        return null;
      } else {
        let node = findNode(root.right, data);
        return node;
      }
    } else if (data < root.data) {
      if (root.left == null) {
        return null;
      } else {
        let node = findNode(root.left, data);
        return node;
      }
    }
    if (root.data == data) {
      return root;
    }
  }
  function levelOrder(cb) {
    let arr = [];
    let queue = [this.root];
    while (queue.length != 0) {
      let level = [];
      let queueLength = queue.length;
      for (let i = 0; i < queueLength; i++) {
        let node = queue.shift();
        level.push(node.data);
        if (node.left != null) {
          queue.push(node.left);
        }
        if (node.right != null) {
          queue.push(node.right);
        }
        if (cb) {
          cb(node);
        }
      }
      arr = arr.concat(level);
    }
    if (!cb) {
      return arr;
    }
  }
  function inOrder(cb) {
    if (root === null) {
      return null;
    }
    let log = [];
    let stack = [];
    let node = this.root;
    while (node !== null || stack.length > 0) {
      while (node !== null) {
        if (cb) {
          cb(node);
        }
        stack.push(node);
        node = node.left;
      }
      node = stack.pop();
      log.push(node.data);
      node = node.right;
    }
    return log;
  }
  function preOrder(cb) {
    if (root === null) {
      return [];
    }
    let stack = [this.root];
    let log = [];
    while (stack.length) {
      let node = stack.pop();
      log.push(node.data);
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
      if (cb) {
        cb(node);
      }
    }
    return log;
  }
  function postOrder(cb) {
    if (root === null) {
      return [];
    }
    let stack = [this.root];
    let log = [];
    while (stack.length) {
      let node = stack.pop();
      log.push(node.data);
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
      if (cb) {
        cb(node);
      }
    }
    return log;
  }

  function height(node = this.root) {
    if (node === null) {
      return -1;
    }
    let left = height(node.left);
    let right = height(node.right);
    return Math.max(left, right) + 1;
  }
  function depth(node, root, level = 0) {
    if (!node) {
      return null;
    }
    if (root == null) {
      return 0;
    }
    if (root.data === node) {
      return level;
    }
    let count = depth(node, root.left, level + 1);
    if (count !== 0) {
      return count;
    }
    return depth(node, root.right, level + 1);
  }
  function isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    let variance = Math.abs(height(node.left) - height(node.right));
    return variance < 2 && isBalanced(node.left) && isBalanced(node.right);
  }
  function reBalance() {
    let arr = inOrder();
    let newTree = buildTree(arr);
    this.root = newTree;
    return newTree;
  }
  return {
    root,
    buildTree,
    insertNode,
    deleteNode,
    findNode,
    nodeFactory,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
}

// driver to test bst
function driver() {
  function createArray() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
  }
  let arr = createArray();
  arr = [...new Set(arr)];
  console.log('Random array of 10 numbers created', arr);
  let testTree = treeFactory(arr);
  prettyPrint(testTree.root);
  console.log(`Tree balanced: `, testTree.isBalanced());
  console.log(`Level Order Traversal:`, testTree.levelOrder());
  console.log(`InOrder Traversal:`, testTree.inOrder());
  console.log(`PreOrder Traversal:`, testTree.preOrder());
  console.log(`PostOrder Traversal:`, testTree.postOrder());
  testTree.insertNode(101);
  testTree.insertNode(102);
  testTree.insertNode(103);
  console.log('Added values 101, 102, 103 to unbalance tree')
  prettyPrint(testTree.root);
  console.log(`Tree balanced: `, testTree.isBalanced());
  testTree.reBalance();
  console.log(`Tree rebalanced with reBalance function`);
  prettyPrint(testTree.root);
  console.log(`Tree balanced: `, testTree.isBalanced());
  console.log(`Level Order Traversal:`, testTree.levelOrder());
  console.log(`InOrder Traversal:`, testTree.inOrder());
  console.log(`PreOrder Traversal:`, testTree.preOrder());
  console.log(`PostOrder Traversal:`, testTree.postOrder());
}; 

// prettyPrint function supplied by The Odin Project
// logs visual tree display in console
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

driver();
