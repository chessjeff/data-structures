import Node from "./tree-node.js";

function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }

  let middle = parseInt((start + end) / 2);
  let node = Node(arr[middle]);

  node.left = buildTree(arr, start, middle - 1);
  node.right = buildTree(arr, middle + 1, end);

  return node;
}

export default function Tree(arr) {
  arr = sortAndRemoveDuplicates(arr);
  let root = buildTree(arr, 0, arr.length - 1);

  // Unbalances the tree
  function insert(value, root = this.root) {
    // Base case
    if (root === null) return (root = new Node(value));

    // No duplicates
    if (root.node === value) return root;

    if (value < root.node) {
      root.left = this.insert(value, root.left);
    } else if (value > root.node) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  function deleteValue(value, root = this.root) {
    //Value not in tree
    if (root === null) return root;

    if (root.node > value) {
      root.left = this.deleteValue(value, root.left);
    } else if (root.node < value) {
      root.right = this.deleteValue(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        const findMin = function (root) {
          let min = root.node;
          let newRoot = root;
          while (newRoot.left !== null) {
            min = root.left.node;
            newRoot = root.left;
          }
          return min;
        };
        let min = findMin(root.right);
        root.node = min.node;
        root.right = this.deleteValue(root.node, root.right);
      }
    }
    return root;
  }

  function find(value, node = this.root) {
    if (node === null || node.node === value) return node;

    if (node.node > value) return find(value, node.left);
    return find(value, node.right);
  }

  function levelOrder(node = this.root) {
    let q = [node];
    let out = [];
    while (q[0]) {
      if (q[0].left !== null) {
        q = [...q, q[0].left];
      }
      if (q[0].right !== null) {
        q = [...q, q[0].right];
      }
      out.push(q[0].node);
      q.shift();
    }
    return out;
  }

  function inOrder(arr = [], node = this.root) {
    if (node === null) return;
    if (node.left) this.inOrder(arr, node.left);
    arr.push(node.node);
    if (node.right) this.inOrder(arr, node.right);
    return arr;
  }

  function preOrder(arr = [], node = this.root) {
    if (node === null) return;
    arr.push(node.node);
    if (node.left) this.preOrder(arr, node.left);
    if (node.right) this.preOrder(arr, node.right);
    return arr;
  }

  function postOrder(arr = [], node = this.root) {
    if (node === null) return;
    if (node.left) this.postOrder(arr, node.left);
    if (node.right) this.postOrder(arr, node.right);
    arr.push(node.node);
    return arr;
  }

  function height(node = this.root) {
    if (node === null) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  function depth(node, root = this.root, depth = 0) {
    if (root === null || node === null) return;

    if (node === root) return depth;
    if (node.node < root.node) {
      return this.depth(node, root.left, (depth += 1));
    } else {
      return this.depth(node, root.right, (depth += 1));
    }
  }

  function isBalanced(root = this.root) {
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    const diff = Math.abs(leftHeight - rightHeight);
    return diff < 2 ? true : false;
  }

  function rebalance() {
    let arr = this.levelOrder();
    arr = sortAndRemoveDuplicates(arr);
    return (this.root = buildTree(arr, 0, arr.length - 1));
  }

  function sortAndRemoveDuplicates(arr) {
    arr.sort();
    arr.sort(compareNumbers);
    arr = [...new Set(arr)];
    return arr;

    function compareNumbers(a, b) {
      return a - b;
    }
  }

  return {
    root,
    insert,
    deleteValue,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
