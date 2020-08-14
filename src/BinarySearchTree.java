public class BinarySearchTree {
    public static class Node {
        int value;
        Node left;
        Node right;

        public Node(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

    Node root;

    public BinarySearchTree() {
        this.root = null;
    }

    private int findMinValue(Node root) {
        int minValue = root.value;

        while (root.left != null) {
            minValue = root.left.value;
            root = root.left;
        }

        return minValue;
    }

    private Node insertNodeRecursively(Node root, int value) {
        if (root == null) {
            return new Node(value);
        }

        if (value < root.value) {
            root.left = insertNodeRecursively(root.left, value);
        } else if (value > root.value) {
            root.right = insertNodeRecursively(root.right, value);
        }

        return root;
    }

    private Node deleteNodeRecursively(Node root, int key) {
        if (root == null) {
            return null;
        }

        if (key < root.value) {
            root.left = deleteNodeRecursively(root.left, key);
        } else if (key > root.value) {
            root.right = deleteNodeRecursively(root.right, key);
        } else {
            if (root.left == null && root.right == null) {
                return null;
            } else if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }

            // find inorder successor (min value in right sub-tree)
            // replace node's value with inorder successor
            // delete/remove the inorder successor from right-subtree
            root.value = findMinValue(root.right);
            root.right = deleteNodeRecursively(root.right, root.value);
        }

        return root;
    }

    private boolean containsNodeRecursively(Node root, int key) {
        if (root == null) {
            return false;
        }

        if (key == root.value) {
            return true;
        }

        return key < root.value ?
                containsNodeRecursively(root.left, key):
                containsNodeRecursively(root.right, key);
    }

    private void inOrderTraversalRecursive(Node root) {
        if (root != null) {
            inOrderTraversalRecursive(root.left);
            System.out.println(root.value + " ");
            inOrderTraversalRecursive(root.right);
        }
    }

    private void preOrderTraversalRecursive(Node root) {
        if (root != null) {
            System.out.println(root.value + " ");
            preOrderTraversalRecursive(root.left);
            preOrderTraversalRecursive(root.right);
        }
    }

    private void postOrderTraversalRecursive(Node root) {
        if (root != null) {
            postOrderTraversalRecursive(root.left);
            postOrderTraversalRecursive(root.right);
            System.out.println(root.value + " ");
        }
    }

    private int calculateHeightRecursive(Node root) {
        if (root == null) {
            return 0;
        }

        /**
         * Height of a Binary Tree is the number of nodes
         * on longest path from the root Node to the farthest leaf node.
         * Steps: (Recursively)
         * Calculate Height of Left Sub-Tree and
         * Calculate Height of Right Sub-Tree.
         * Find the Maximum between the Two Heights and Add 1
         * to account for the current Node.
         *
         * Height of Tree = Max(leftHeight, rightHeight) + 1
         */
        int leftSubtreeHeight = calculateHeightRecursive(root.left);
        int rightSubtreeHeight = calculateHeightRecursive(root.right);
        return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
    }

    public void insert(int value) {
        this.root = this.insertNodeRecursively(this.root, value);
    }

    public void delete(int key) {
        this.root = deleteNodeRecursively(this.root, key);
    }

    public boolean contains(int key) {
        return this.containsNodeRecursively(this.root, key);
    }

    public void traverseInOrder() {
        this.inOrderTraversalRecursive(this.root);
    }

    public void traversePreOrder() {
        this.preOrderTraversalRecursive(this.root);
    }

    public void traversePostOrder() {
        this.postOrderTraversalRecursive(this.root);
    }

    public int calculateHeight() {
        return this.calculateHeightRecursive(this.root);
    }
}
