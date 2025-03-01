"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const MinimaxTree = () => {
  const [useAlphaBeta, setUseAlphaBeta] = useState(false);
  const [treeData, setTreeData] = useState(null);
  const [prunedNodes, setPrunedNodes] = useState(new Set());

  useEffect(() => {
    generateTree();
  }, []);

  const generateTree = () => {
    const randomLeafValues = () => Math.floor(Math.random() * 100);
    const data = {
      name: "?",
      children: [
        {
          name: "?",
          children: [
            { name: "?", children: [{ name: randomLeafValues() }, { name: randomLeafValues() }] },
            { name: "?", children: [{ name: randomLeafValues() }, { name: randomLeafValues() }] },
          ],
        },
        {
          name: "?",
          children: [
            { name: "?", children: [{ name: randomLeafValues() }, { name: randomLeafValues() }] },
            { name: "?", children: [{ name: randomLeafValues() }, { name: randomLeafValues() }] },
          ],
        },
      ],
    };
    setTreeData(data);
    setPrunedNodes(new Set());
    drawTree(data, new Set());
  };

  const minimax = (node, depth, isMaximizing, alpha, beta) => {
    if (!node.children) return parseInt(node.name);

    let bestValue = isMaximizing ? -Infinity : Infinity;
    let localPrunedNodes = new Set();

    for (let child of node.children) {
      const childValue = minimax(child, depth + 1, !isMaximizing, alpha, beta);
      if (isMaximizing) {
        if (childValue > bestValue) {
          bestValue = childValue;
        }
        if (useAlphaBeta) alpha = Math.max(alpha, bestValue);
      } else {
        if (childValue < bestValue) {
          bestValue = childValue;
        }
        if (useAlphaBeta) beta = Math.min(beta, bestValue);
      }

      if (useAlphaBeta && beta <= alpha) {
        localPrunedNodes.add(child.name);
        break;
      }
    }
    node.name = bestValue;
    setPrunedNodes((prev) => new Set([...prev, ...localPrunedNodes]));
    return bestValue;
  };

  const startTraversal = () => {
    if (!treeData) return;
    const newTreeData = JSON.parse(JSON.stringify(treeData));
    setPrunedNodes(new Set());
    minimax(newTreeData, 0, true, -Infinity, Infinity);
    drawTree(newTreeData, prunedNodes);
    setTreeData(newTreeData);
  };

  const drawTree = (data, prunedNodes) => {
    const width = 1150, height = 500;
    const treeLayout = d3.tree().size([width, height - 100]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    d3.select("#tree-container").select("svg").remove();
    const svg = d3.select("#tree-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50, 50)");

    const linkGenerator = d3.linkVertical().x(d => d.x).y(d => d.y);
    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .attr("fill", "none")
      .attr("stroke", "#FFD700"); // Gold color for links

    const nodes = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", 15)
      .attr("fill", d =>
        prunedNodes.has(d.data.name) ? "#FF4500" : d.children ? "#1E90FF" : "#32CD32"
      ); // Red for pruned, Blue for internal nodes, Lime Green for leaf nodes

    nodes.append("text")
      .attr("dy", "0.35em")
      .attr("x", d => (d.children ? -20 : 20))
      .attr("text-anchor", d => (d.children ? "end" : "start"))
      .text(d => d.data.name)
      .style("font-size", "12px")
      .style("fill", d => (prunedNodes.has(d.data.name) ? "white" : "#FFFFFF")); // White text
  };

  const resetTree = () => {
    generateTree();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Minimax Algorithm with Alpha-Beta Pruning</h1>
      <div style={styles.buttonContainer}>
        <button onClick={startTraversal} style={styles.button}>Start</button>&nbsp;&nbsp;
        <button onClick={resetTree} style={styles.button}>Reset</button>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={useAlphaBeta}
            onChange={() => setUseAlphaBeta(!useAlphaBeta)}
          /> Alpha-Beta Pruning
        </label>
      </div>
      <div id="tree-container" style={styles.treeContainer}></div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#000000", // Black background
    color: "#FFFFFF", // White text
    padding: "20px",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#FFD700", // Gold color for title
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    width: "100%",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#FF69B4", // Neon pink for button
    color: "#000000", // Black text
    border: "none",
    borderRadius: "8px",
    transition: "0.3s",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "18px",
  },
  treeContainer: {
    width: "100%",
    height: "500px",
  },
};

export default MinimaxTree;
