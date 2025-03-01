import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TreeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  children?: TreeNode[];
}

// Binary Tree Data Structure with Positions
const treeData: TreeNode = {
  id: "R",
  label: "R",
  x: 250,
  y: 50,
  children: [
    {
      id: "A",
      label: "A",
      x: 150,
      y: 150,
      children: [
        { id: "C", label: "C", x: 100, y: 250 },
        { id: "D", label: "D", x: 200, y: 250 },
      ],
    },
    {
      id: "B",
      label: "B",
      x: 350,
      y: 150,
      children: [
        { id: "E", label: "E", x: 300, y: 250 },
        {
          id: "F",
          label: "F",
          x: 400,
          y: 250,
          children: [{ id: "G", label: "G", x: 400, y: 350 }],
        },
      ],
    },
  ],
};

const options = [
  { id: "tree", label: "The Binary Tree" },
  { id: "root", label: "Root node" },
  { id: "aLeft", label: "A's left child" },
  { id: "aRight", label: "A's right child" },
  { id: "bSubtree", label: "B's subtree" },
  { id: "size", label: "Tree size (n=8)" },
  { id: "height", label: "Tree height (h=3)" },
  { id: "children", label: "Child nodes" },
  { id: "parents", label: "Parent/internal nodes" },
];

const BinaryTreeVisualizer = () => {
  const [selectedOption, setSelectedOption] = useState("tree");
  const [svgWidth, setSvgWidth] = useState(500);
  const [svgHeight, setSvgHeight] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      setSvgWidth(window.innerWidth * 0.8); // Adjust width based on viewport
      setSvgHeight(window.innerHeight * 0.6); // Adjust height based on viewport
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the sizes

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getHighlightedNodes = (): string[] => {
    switch (selectedOption) {
      case "tree":
      case "size":
        return ["R", "A", "B", "C", "D", "E", "F", "G"];
      case "root":
        return ["R"];
      case "aLeft":
        return ["C"];
      case "aRight":
        return ["D"];
      case "bSubtree":
        return ["B", "E", "F", "G"];
      case "height":
        return ["R", "B", "F", "G"];
      case "children":
        return ["C", "D", "E", "G"];
      case "parents":
        return ["R", "A", "B", "F"];
      default:
        return [];
    }
  };

  const highlightedNodes = getHighlightedNodes();

  // Render tree nodes recursively
  const renderTree = (node: TreeNode) => {
    return (
      <g key={node.id}>
        {node.children &&
          node.children.map((child) => (
            <motion.path
              key={`edge-${node.id}-${child.id}`}
              d={`M${node.x},${node.y} C${node.x},${(node.y + child.y) / 2} ${
                child.x
              },${(node.y + child.y) / 2} ${child.x},${child.y}`}
              stroke={highlightedNodes.includes(node.id) && highlightedNodes.includes(child.id) ? "blue" : "gray"}
              strokeWidth="2"
              fill="none"
            />
          ))}

        {/* Node */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r="20"
          fill={highlightedNodes.includes(node.id) ? "blue" : "gray"}
          stroke={highlightedNodes.includes(node.id) ? "darkblue" : "black"}
          strokeWidth="2"
        />
        <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fill="white">
          {node.label}
        </text>

        {node.children && node.children.map((child) => renderTree(child))}
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Binary Tree Visualizer</h1>

      <p className="text-center mb-4 text-2xl">
        A binary tree is a hierarchical data structure where each node has at most two children, referred to as the left child and the right child. This visualizer highlights different parts of the tree based on your selection.
      </p>

      {/* Tree Visualization and Selection Controls */}
      <div className="border-2 border-gray-600 rounded-lg p-4 bg-gray-900 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex flex-col bg-gray-800 p-4 rounded-lg mb-4 md:mb-0">
            {options.map((option) => (
              <label key={option.id} className="flex items-center space-x-2 text-sm mb-2">
                <input
                  type="radio"
                  name="treeOption"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="form-radio"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <div className="flex-1">
            <svg width={svgWidth} height={svgHeight}>
              {renderTree(treeData)}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;