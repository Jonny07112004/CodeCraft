"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const MinimaxTree = () => {
  const [useAlphaBeta, setUseAlphaBeta] = useState(false);
  const [treeData, setTreeData] = useState(null);
  const [prunedNodes, setPrunedNodes] = useState(new Set());
  const [processedNodes, setProcessedNodes] = useState(new Set());
  const [isRunning, setIsRunning] = useState(false);

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
    setProcessedNodes(new Set());
    drawTree(data, new Set(), new Set());
  };

  const minimaxStepByStep = (tree, callback) => {
    const newTreeData = JSON.parse(JSON.stringify(tree));
    const queue = [];
    const root = { node: newTreeData, depth: 0, isMaximizing: true, alpha: -Infinity, beta: Infinity, parent: null, childIndex: 0 };
    queue.push(root);

    const processNextStep = () => {
      if (queue.length === 0) {
        setIsRunning(false);
        callback(newTreeData);
        return;
      }

      const current = queue.shift();
      const { node, depth, isMaximizing, alpha, beta, parent, childIndex } = current;

      if (!node.children) {
        node.name = parseInt(node.name);
        setProcessedNodes((prev) => new Set([...prev, `${depth}-${node.name}`]));
        setTreeData({ ...newTreeData });
        drawTree(newTreeData, prunedNodes, processedNodes);
        setTimeout(processNextStep, 1000);
        return;
      }

      if (childIndex < node.children.length) {
        const child = node.children[childIndex];
        if (child.children && child.name === "?") {
          queue.unshift({ ...current, childIndex: childIndex + 1 });
          queue.unshift({ node: child, depth: depth + 1, isMaximizing: !isMaximizing, alpha, beta, parent: node, childIndex: 0 });
        } else {
          const childValue = parseInt(child.name);
          let newAlpha = alpha;
          let newBeta = beta;

          if (isMaximizing) {
            node.name = node.name === "?" ? childValue : Math.max(parseInt(node.name), childValue);
            if (useAlphaBeta) newAlpha = Math.max(alpha, parseInt(node.name));
          } else {
            node.name = node.name === "?" ? childValue : Math.min(parseInt(node.name), childValue);
            if (useAlphaBeta) newBeta = Math.min(beta, parseInt(node.name));
          }

          setProcessedNodes((prev) => new Set([...prev, `${depth}-${node.name}`]));

          if (useAlphaBeta && newBeta <= newAlpha) {
            for (let i = childIndex + 1; i < node.children.length; i++) {
              setPrunedNodes((prev) => new Set([...prev, node.children[i].name]));
            }
            setTreeData({ ...newTreeData });
            drawTree(newTreeData, prunedNodes, processedNodes);
            setTimeout(processNextStep, 1000);
            return;
          }

          queue.unshift({ ...current, childIndex: childIndex + 1, alpha: newAlpha, beta: newBeta });
        }
        setTreeData({ ...newTreeData });
        drawTree(newTreeData, prunedNodes, processedNodes);
        setTimeout(processNextStep, 1000);
        return;
      }

      if (parent) {
        if (isMaximizing) {
          parent.name = parent.name === "?" ? node.name : Math.max(parseInt(parent.name), node.name);
        } else {
          parent.name = parent.name === "?" ? node.name : Math.min(parseInt(parent.name), node.name);
        }
        setProcessedNodes((prev) => new Set([...prev, `${depth - 1}-${parent.name}`]));
      }
      setTreeData({ ...newTreeData });
      drawTree(newTreeData, prunedNodes, processedNodes);
      setTimeout(processNextStep, 1000);
    };

    setTimeout(processNextStep, 1000);
  };

  const startTraversal = () => {
    if (!treeData || isRunning) return;
    setIsRunning(true);
    setPrunedNodes(new Set());
    setProcessedNodes(new Set());
    minimaxStepByStep(treeData, (finalTree) => {
      setTreeData(finalTree);
      drawTree(finalTree, prunedNodes, processedNodes);
    });
  };

  const drawTree = (data, prunedNodes, processedNodes) => {
    const width = 1150, height = 500;
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    d3.select("#tree-container").select("svg").remove();
    const svg = d3.select("#tree-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50, 50)");

    // Gradient for links
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient").attr("id", "linkGradient");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#FF69B4");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#FFD700");

    const linkGenerator = d3.linkVertical().x(d => d.x).y(d => d.y);
    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .attr("fill", "none")
      .attr("stroke", "url(#linkGradient)")
      .attr("stroke-width", 2);

    const nodes = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", 15)
      .attr("fill", d => {
        const key = `${d.depth}-${d.data.name}`;
        if (prunedNodes.has(d.data.name)) return "#FF4500"; // Pruned: OrangeRed
        if (processedNodes.has(key)) return "#00CED1"; // Processed (Obeyed): DarkTurquoise
        if (d.data.name !== "?") return "#32CD32"; // Leaf nodes: LimeGreen
        return "#FF69B4"; // Unprocessed (Capable): HotPink
      })
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 1)
      .each(function (d) {
        const key = `${d.depth}-${d.data.name}`;
        if (processedNodes.has(key)) {
          d3.select(this)
            .transition()
            .duration(500)
            .attr("r", 20)
            .transition()
            .duration(500)
            .attr("r", 15);
        }
      });

    nodes.append("text")
      .attr("dy", "0.35em")
      .attr("x", d => (d.children ? -20 : 20))
      .attr("text-anchor", d => (d.children ? "end" : "start"))
      .text(d => d.data.name)
      .style("font-size", "12px")
      .style("fill", "#FFFFFF");
  };

  const resetTree = () => {
    if (isRunning) return;
    generateTree();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Minimax Algorithm with Alpha-Beta Pruning</h1>
      <div style={styles.buttonContainer}>
        <button
          onClick={startTraversal}
          style={{ ...styles.button, ...(isRunning ? styles.buttonDisabled : {}) }}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          onClick={resetTree}
          style={{ ...styles.button, ...(isRunning ? styles.buttonDisabled : {}) }}
          disabled={isRunning}
        >
          Reset
        </button>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={useAlphaBeta}
            onChange={() => setUseAlphaBeta(!useAlphaBeta)}
            disabled={isRunning}
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
    backgroundColor: "#000000",
    color: "#FFFFFF",
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#FFD700",
    textShadow: "0px 0px 10px rgba(255, 215, 0, 0.7)",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    width: "100%",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#FF69B4",
    color: "#000000",
    border: "none",
    borderRadius: "8px",
    transition: "background-color 0.3s",
    boxShadow: "0px 0px 10px rgba(255, 105, 180, 0.5)",
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "18px",
  },
  treeContainer: {
    width: "100%",
    maxWidth: "1200px",
    height: "500px",
    overflow: "hidden",
  },
};

export default MinimaxTree; 