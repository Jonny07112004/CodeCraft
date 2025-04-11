'use client';
import React, { useState } from "react";
import styles from "./a_star.module.css";

const nodes = [
  { id: "S", x: 50, y: 50 }, { id: "A", x: 150, y: 50 }, { id: "B", x: 250, y: 50 },
  { id: "C", x: 350, y: 150 }, { id: "D", x: 250, y: 250 }, { id: "E", x: 150, y: 250 },
  { id: "F", x: 50, y: 150 }, { id: "G", x: 450, y: 250 }, { id: "H", x: 350, y: 350 },
  { id: "I", x: 250, y: 450 }, { id: "J", x: 150, y: 450 }, { id: "K", x: 50, y: 350 },
  { id: "L", x: 350, y: 50 }, { id: "M", x: 450, y: 150 }, { id: "N", x: 550, y: 250 }
];

const edges = [
  { from: "S", to: "A", cost: 4 }, { from: "S", to: "F", cost: 7 }, { from: "A", to: "B", cost: 1 },
  { from: "A", to: "L", cost: 2 }, { from: "B", to: "C", cost: 3 }, { from: "B", to: "D", cost: 5 },
  { from: "C", to: "M", cost: 4 }, { from: "D", to: "E", cost: 2 }, { from: "D", to: "G", cost: 6 },
  { from: "E", to: "H", cost: 4 }, { from: "F", to: "I", cost: 3 }, { from: "G", to: "J", cost: 2 },
  { from: "H", to: "K", cost: 5 }, { from: "I", to: "G", cost: 1 }, { from: "J", to: "E", cost: 2 },
  { from: "K", to: "B", cost: 3 }, { from: "L", to: "M", cost: 3 }, { from: "M", to: "N", cost: 2 }
];

const pseudoCodeSteps = [
  "1. Initialize OPEN and CLOSED sets.",
  "2. Add start node to OPEN with 듯(n) = h(n).",
  "3. Pick node with lowest f(n) from OPEN.",
  "4. If goal reached, calculate total cost.",
  "5. Update neighbors: g(n) = sum + cost."
];

const AStarVisualizer = () => {
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [path, setPath] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [additionLog, setAdditionLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false); // New state to track if A* is running

  const handleNodeClick = (nodeId) => {
    if (isRunning) return; // Prevent node selection while running
    if (!startNode) {
      setStartNode(nodeId);
    } else if (!endNode && nodeId !== startNode) { // Prevent selecting same node as start and end
      setEndNode(nodeId);
    }
  };

  const heuristic = (a, b) => {
    const nodeA = nodes.find(n => n.id === a);
    const nodeB = nodes.find(n => n.id === b);
    return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
  };

  const startAStar = () => {
    if (!startNode || !endNode || isRunning) return;
    
    setIsRunning(true); // Disable buttons when starting
    const openSet = [startNode];
    const cameFrom = {};
    const gScore = { [startNode]: 0 };
    const fScore = { [startNode]: heuristic(startNode, endNode) };
    const visited = [];
    const log = [];
    
    const interval = setInterval(() => {
      if (openSet.length === 0) {
        clearInterval(interval);
        setCurrentStep(4);
        setIsRunning(false); // Re-enable buttons when done
        return;
      }

      setCurrentStep(2); // Step 3: Pick node with lowest f(n).
      openSet.sort((a, b) => fScore[a] - fScore[b]);
      const current = openSet.shift();
      visited.push(current);
      setVisitedNodes([...visited]);

      if (current === endNode) {
        clearInterval(interval);
        reconstructPath(cameFrom, endNode);
        setCurrentStep(3);
        setIsRunning(false); // Re-enable buttons when done
        return;
      }

      edges.filter(edge => edge.from === current).forEach(({ to, cost }) => {
        const tentativeGScore = gScore[current] + cost;
        if (tentativeGScore < (gScore[to] || Infinity)) {
          cameFrom[to] = current;
          gScore[to] = tentativeGScore;
          fScore[to] = gScore[to] + heuristic(to, endNode);
          if (!openSet.includes(to)) openSet.push(to);
          log.push(`g(${to}) = g(${current}) + ${cost} = ${tentativeGScore}`);
          setAdditionLog([...log]);
        }
      });

      setCurrentStep(4); // Step 5: Update neighbors.
    }, 1000);
  };

  const reconstructPath = (cameFrom, current) => {
    const totalPath = [];
    let totalCost = 0;
    while (current in cameFrom) {
      const from = cameFrom[current];
      const edge = edges.find(e => e.from === from && e.to === current);
      totalCost += edge.cost;
      totalPath.unshift(current);
      current = from;
    }
    totalPath.unshift(startNode);
    setPath(totalPath);
    setTotalCost(totalCost);

    const shortestPathLog = totalPath.join(" -> ");
    setAdditionLog((prevLog) => [
      ...prevLog,
      `Shortest Path: ${shortestPathLog}`,
      `Total Cost: ${totalCost}`,
    ]);
  };

  const reset = () => {
    if (isRunning) return; // Prevent reset while running
    setStartNode(null);
    setEndNode(null);
    setVisitedNodes([]);
    setPath([]);
    setTotalCost(0);
    setCurrentStep(0);
    setAdditionLog([]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>A* Algorithm Visualization</h1>
      <div className={styles.content}>
        <div className={styles.pseudoCode}>
          <h2>Pseudo Code</h2>
          <div className={styles.steps}>
            {pseudoCodeSteps.map((step, index) => (
              <div
                key={index}
                className={`${styles.step} ${index === currentStep ? styles.highlightedStep : ""}`}
              >
                {step}
              </div>
            ))}
          </div>
          {totalCost > 0 && (
            <div className={styles.totalCost}>
              Total Cost: <strong>{totalCost}</strong>
            </div>
          )}
        </div>
        <div className={styles.visualization}>
          <svg width="100%" height="100%" className={styles.graph}>
            {edges.map(({ from, to, cost }) => {
              const start = nodes.find(n => n.id === from);
              const end = nodes.find(n => n.id === to);
              return (
                <g key={`${from}-${to}`}>
                  <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#555" strokeWidth="2" />
                  <text x={(start.x + end.x) / 2} y={(start.y + end.y) / 2} fill="#fff" fontSize="12">{cost}</text>
                </g>
              );
            })}
            {nodes.map(({ id, x, y }) => (
              <g key={id} onClick={() => handleNodeClick(id)} style={{ cursor: isRunning ? "not-allowed" : "pointer" }}>
                <circle cx={x} cy={y} r="20" className={path.includes(id) ? styles.pathNode : visitedNodes.includes(id) ? styles.visitedNode : id === startNode ? styles.startNode : id === endNode ? styles.endNode : styles.circle} />
                <text x={x} y={y} textAnchor="middle" fill="#fff" dy="5" fontSize="14">{id}</text>
              </g>
            ))}
          </svg>
          <div className={styles.buttonContainer}>
            <button
              className={styles.startButton}
              onClick={startAStar}
              disabled={isRunning}
            >
              Start A*
            </button>
            <button
              className={styles.resetButton}
              onClick={reset}
              disabled={isRunning}
            >
              Reset
            </button>
          </div>
        </div>
        <div className={styles.additionLog}>
          <h3>Addition Log</h3>
          {additionLog.map((log, index) => (
            <div key={index} className={styles.logEntry}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AStarVisualizer;