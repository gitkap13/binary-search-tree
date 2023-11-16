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
    console.log(arr);
    let testTree = treeFactory(arr);
    prettyPrint(testTree.root);
    console.log(`Tree balanced: `, testTree.isBalanced());
    console.log(`Level Order Traversal:`, testTree.levelOrder());
    console.log(`InOrder Traversal:`, testTree.inOrder());
    console.log(`PreOrder Traversal:`, testTree.preOrder());
    console.log(`PostOrder Traversal:`, testTree.postOrder());
    prettyPrint(testTree.root);
    testTree.insertNode(101);
    testTree.insertNode(102);
    testTree.insertNode(103);
    console.log(`Tree balanced: `, testTree.isBalanced());
    prettyPrint(testTree.root);
    testTree.reBalance();
    console.log(`Tree rebalanced`);
    console.log(`Tree balanced: `, testTree.isBalanced());
    console.log(`Level Order Traversal:`, testTree.levelOrder());
    console.log(`InOrder Traversal:`, testTree.inOrder());
    console.log(`PreOrder Traversal:`, testTree.preOrder());
    console.log(`PostOrder Traversal:`, testTree.postOrder());
    prettyPrint(testTree.root);
  };

  module.exports = driver;