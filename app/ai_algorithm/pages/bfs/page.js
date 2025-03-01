'use client'
import React, { useState, useEffect } from 'react';
import styles from './BFS.module.css';  

const Node = ({ isStart, isGoal, isVisited, isCurrent, isPath, onClick }) => {
  const getBackgroundColor = () => {
    if (isPath) return '#4a90e2';
    if (isGoal) return '#f5a623';
    if (isStart) return '#f8e71c';
    if (isCurrent) return '#d0021b';
    if (isVisited) return '#7ed321';
    return '#ffffff';
  };

  return (
    <div
      className={styles.node}
      style={{ backgroundColor: getBackgroundColor() }}
      onClick={onClick}
    />
  );
};

const BFSVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [path, setPath] = useState([]);
  const [runningBFS, setRunningBFS] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [goalNode, setGoalNode] = useState(null);
  const [steps, setSteps] = useState([]);
  const [pseudoCodeSteps, setPseudoCodeSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [iterationCount, setIterationCount] = useState(0); 

  const rows = 10;
  const cols = 10;

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          id: `${i}-${j}`,
          isStart: false,
          isGoal: false,
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, []);

  const bfs = () => {
    const queue = [startNode];
    const visitedSet = new Set();
    const parentMap = {};
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const newSteps = [];
    const newPseudoCodeSteps = [
      "1. Create a queue Q",
      "2. Mark startNode as visited and enqueue it into Q",
      "3. While Q is not empty:",
      "  a. Dequeue a node from Q",
      "  b. Process that node",
      "  c. For each unvisited neighbor of the node:",
      "    i. Mark the neighbor as visited",
      "    ii. Enqueue the neighbor into Q"
    ];

    let stepIndex = 0;

    const interval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(interval);
        setRunningBFS(false);
        return;
      }

      const [x, y] = queue.shift();
      const nodeKey = `${x}-${y}`;
      if (visitedSet.has(nodeKey)) return;

      visitedSet.add(nodeKey);
      setVisited(new Set(visitedSet));
      setCurrent(nodeKey);

      const step = {
        step: `Processing node (${x}, ${y})`,
        queue: JSON.stringify(queue),
        visited: JSON.stringify(Array.from(visitedSet)),
      };
      newSteps.push(step);
      setSteps([...newSteps]);

      if (x === goalNode[0] && y === goalNode[1]) {
        clearInterval(interval);
        setRunningBFS(false);

        let current = `${goalNode[0]}-${goalNode[1]}`;
        const pathFound = [];
        while (current) {
          pathFound.push(current);
          current = parentMap[current];
        }
        setPath(pathFound.reverse());
        return;
      }

      directions.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (
          newX >= 0 &&
          newY >= 0 &&
          newX < rows &&
          newY < cols &&
          !visitedSet.has(`${newX}-${newY}`)
        ) {
          queue.push([newX, newY]);
          parentMap[`${newX}-${newY}`] = nodeKey;
        }
      });

      setPseudoCodeSteps(newPseudoCodeSteps);
      setCurrentStepIndex(stepIndex % newPseudoCodeSteps.length);
      stepIndex++;
      setIterationCount((prevCount) => prevCount + 1); // Increment iteration count
    }, 100);
  };

  const handleNodeClick = (x, y) => {
    if (!startNode) {
      setStartNode([x, y]);
      setGrid((prevGrid) =>
        prevGrid.map((row, rowIndex) =>
          row.map((node, colIndex) =>
            rowIndex === x && colIndex === y
              ? { ...node, isStart: true }
              : node
          )
        )
      );
    } else if (!goalNode) {
      setGoalNode([x, y]);
      setGrid((prevGrid) =>
        prevGrid.map((row, rowIndex) =>
          row.map((node, colIndex) =>
            rowIndex === x && colIndex === y ? { ...node, isGoal: true } : node
          )
        )
      );
    }
  };

  const handleStartBFS = () => {
    if (startNode && goalNode) {
      setRunningBFS(true);
      setSteps([]);
      setPseudoCodeSteps([]);
      setIterationCount(0); // Reset iteration count
      bfs();
    } else {
      alert('Please select both start and goal nodes.');
    }
  };

  const handleReset = () => {
    setGrid(grid.map(row => row.map(node => ({
      ...node,
      isStart: false,
      isGoal: false,
    }))));

    setVisited(new Set());
    setCurrent(null);
    setPath([]);
    setRunningBFS(false);
    setStartNode(null);
    setGoalNode(null);
    setSteps([]);
    setPseudoCodeSteps([]);
    setCurrentStepIndex(-1);
    setIterationCount(0); // Reset iteration count
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarLeft}>
        <h2 className={styles.algorithmTitle}>BFS Pseudo-Code</h2>
        <div className={styles.algorithmBox}>
          <pre>
            {pseudoCodeSteps.map((step, index) => (
              <div
                key={index}
                className={index === currentStepIndex ? styles.highlight : ''}
              >
                {step}
              </div>
            ))}
          </pre>
          <div className={styles.iterationCount}>
            Iteration Count: {iterationCount}
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>BFS Visualization</h1>
        <h2 className={styles.graphTitle}>Graph</h2>
        <div className={styles.grid}>
          {grid.map((row, rowIndex) =>
            row.map((node, colIndex) => (
              <Node
                key={`${rowIndex}-${colIndex}`}
                isVisited={visited.has(`${rowIndex}-${colIndex}`)}
                isCurrent={current === `${rowIndex}-${colIndex}`}
                isPath={path.includes(`${rowIndex}-${colIndex}`)}
                isStart={
                  startNode &&
                  `${rowIndex}-${colIndex}` === `${startNode[0]}-${startNode[1]}`
                }
                isGoal={
                  goalNode &&
                  `${rowIndex}-${colIndex}` === `${goalNode[0]}-${goalNode[1]}`
                }
                onClick={() => handleNodeClick(rowIndex, colIndex)}
              />
            ))
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.startBtn}
            onClick={handleStartBFS}
            disabled={runningBFS}
          >
            {runningBFS ? 'Running BFS...' : 'Start BFS'}
          </button>  &nbsp;&nbsp;
          <button
            className={styles.resetBtn}
            onClick={handleReset}
            disabled={runningBFS}
          >
            Reset
          </button>
        </div>
      </div>
      <div className={styles.sidebarRight}>
        <h2 className={styles.stepsTitle}>BFS Steps</h2>
        <div className={styles.stepsContainer}>
          <table className={styles.stepsTable}>
            <thead>
              <tr>
                <th>Step</th>
                <th>Queue</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <tr key={index}>
                  <td>{step.step}</td>
                  <td>{step.queue}</td>
                  <td>{step.visited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BFSVisualizer;
