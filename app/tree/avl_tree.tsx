import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

class AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  root: AVLNode | null;

  constructor() {
    this.root = null;
  }

  getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  getBalanceFactor(node: AVLNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rotateRight(y: AVLNode): AVLNode {
    let x = y.left!;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  rotateLeft(x: AVLNode): AVLNode {
    let y = x.right!;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    return y;
  }

  insert(node: AVLNode | null, value: number): AVLNode {
    if (!node) return new AVLNode(value);
    if (value < node.value) node.left = this.insert(node.left, value);
    else if (value > node.value) node.right = this.insert(node.right, value);
    else return node;
    
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    let balance = this.getBalanceFactor(node);
    
    if (balance > 1 && value < node.left!.value) return this.rotateRight(node);
    if (balance < -1 && value > node.right!.value) return this.rotateLeft(node);
    if (balance > 1 && value > node.left!.value) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }
    if (balance < -1 && value < node.right!.value) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }
    return node;
  }

  insertValue(value: number) {
    this.root = this.insert(this.root, value);
  }
}

const AVLTreeVisualizer: React.FC = () => {
  const [avlTree, setAVLTree] = useState(new AVLTree());
  const [inputValue, setInputValue] = useState<string>("");
  const [treeNodes, setTreeNodes] = useState<{ value: number; x: number; y: number; parentX?: number; parentY?: number }[]>([]);

  useEffect(() => {
    const nodes: { value: number; x: number; y: number; parentX?: number; parentY?: number }[] = [];
    const calculatePositions = (node: AVLNode | null, x: number, y: number, level: number, parentX?: number, parentY?: number) => {
      if (!node) return;
      nodes.push({ value: node.value, x, y, parentX, parentY });
      calculatePositions(node.left, x - 50 / level, y + 60, level + 1, x, y);
      calculatePositions(node.right, x + 50 / level, y + 60, level + 1, x, y);
    };
    calculatePositions(avlTree.root, 300, 50, 1);
    setTreeNodes(nodes);
  }, [avlTree]);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      const newTree = new AVLTree();
      newTree.root = avlTree.root;
      newTree.insertValue(value);
      setAVLTree(newTree);
      setInputValue("");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <Card className="p-4 w-full max-w-md text-center">
        <input
          className="border p-2 rounded w-2/3"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter number"
        />
        <Button className="ml-2" onClick={handleInsert}>
          Insert
        </Button>
      </Card>
      <svg width={600} height={400} className="mt-6">
        {treeNodes.map((node) => (
          <React.Fragment key={node.value}>
            {node.parentX !== undefined && node.parentY !== undefined && (
              <motion.line
                x1={node.parentX}
                y1={node.parentY}
                x2={node.x}
                y2={node.y}
                stroke="black"
                strokeWidth={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <circle cx={node.x} cy={node.y} r={20} fill="teal" />
              <text x={node.x} y={node.y} textAnchor="middle" fill="white" dy={5}>
                {node.value}
              </text>
            </motion.g>
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default AVLTreeVisualizer;
