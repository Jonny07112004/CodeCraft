'use client'
import React, { useState, useEffect } from 'react';

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
      style={{ backgroundColor: getBackgroundColor() }}
      onClick={onClick}
      className="node"
    />
  );
};

export default function BFSVisualizer() {
  const [grid, setGrid] = useState([]);
  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [path, setPath] = useState([]);
  const [runningBFS, setRunningBFS] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [goalNode, setGoalNode] = useState(null);
  const [steps, setSteps] = useState([]);
  const [pseudoCodeSteps, setPseudoCodeSteps] = useState([
    "1. Create a queue Q",
    "2. Mark startNode as visited and enqueue it into Q",
    "3. While Q is not empty:",
    "  a. Dequeue a node from Q",
    "  b. Process that node",
    "  c. For each unvisited neighbor:",
    "    i. Mark neighbor as visited",
    "    ii. Enqueue neighbor into Q"
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [traversedNodes, setTraversedNodes] = useState(0); // V: Nodes traversed
  const [maxQueueSize, setMaxQueueSize] = useState(0); // Space complexity V
  const [iterationCount, setIterationCount] = useState(0); // Number of iterations

  const rows = 10;
  const cols = 10;
  const totalEdges = (rows * (cols - 1)) + ((rows - 1) * cols); // E = 180 for 10x10

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
      [1, 0], [-1, 0], [0, 1], [0, -1],
    ];

    visitedSet.add(`${startNode[0]}-${startNode[1]}`);
    setVisited(new Set(visitedSet));
    setTraversedNodes(1);
    setMaxQueueSize(queue.length);
    setCurrentStepIndex(1);

    const newSteps = [
      {
        step: `Starting BFS from (${startNode[0]}, ${startNode[1]})`,
        queue: JSON.stringify(queue),
        visited: JSON.stringify(Array.from(visitedSet)),
      }
    ];
    setSteps(newSteps);

    const interval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(interval);
        setRunningBFS(false);
        setCurrentStepIndex(-1);
        return;
      }

      setCurrentStepIndex(3);
      const [x, y] = queue.shift();
      const nodeKey = `${x}-${y}`;
      setCurrent(nodeKey);
      setIterationCount((prev) => prev + 1); // Increment iteration count

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
        setCurrentStepIndex(-1);

        let current = `${goalNode[0]}-${goalNode[1]}`;
        const pathFound = [];
        while (current) {
          pathFound.push(current);
          current = parentMap[current];
        }
        setPath(pathFound.reverse());
        return;
      }

      setCurrentStepIndex(5);
      directions.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        const newKey = `${newX}-${newY}`;
        if (
          newX >= 0 && newY >= 0 && newX < rows && newY < cols &&
          !visitedSet.has(newKey)
        ) {
          queue.push([newX, newY]);
          visitedSet.add(newKey);
          parentMap[newKey] = nodeKey;
          setTraversedNodes((prev) => prev + 1);
          setMaxQueueSize((prev) => Math.max(prev, queue.length));
        }
      });

      setVisited(new Set(visitedSet));
      setCurrentStepIndex(3);
    }, 100);
  };

  const handleNodeClick = (x, y) => {
    if (!startNode) {
      setStartNode([x, y]);
      setGrid((prevGrid) =>
        prevGrid.map((row, rowIndex) =>
          row.map((node, colIndex) =>
            rowIndex === x && colIndex === y ? { ...node, isStart: true } : node
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
      setTraversedNodes(0);
      setMaxQueueSize(0);
      setIterationCount(0);
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
    setCurrentStepIndex(-1);
    setTraversedNodes(0);
    setMaxQueueSize(0);
    setIterationCount(0);
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #1a1a1a;
          font-family: Arial, sans-serif;
          color: #ffffff;
          overflow: hidden;
        }

        .container {
          display: flex;
          flex-direction: row;
          height: 100vh;
          width: 100vw;
          background-color: #1a1a1a;
          box-sizing: border-box;
        }

        .heading {
          text-align: center;
          width: 100%;
          font-size: 30px;
          margin: 2px 0;
          color: #f8e71c;
        }

        .sidebarLeft, .sidebarRight {
          width: 25%;
          padding: 20px;
          background-color: #333333;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          overflow-y: auto;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }

        .algorithmTitle, .stepsTitle, .graphTitle {
          font-size: 24px;
          margin-bottom: 10px;
          color: #f5a623;
          text-align: center;
        }

        .algorithmBox {
          background-color: #444444;
          padding: 10px;
          border-radius: 5px;
          overflow: auto;
          flex: 1;
        }

        .mainContent {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 1;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(10, 40px);
          grid-gap: 5px;
          margin-bottom: 10px;
        }

        .node {
          width: 40px;
          height: 40px;
          border: 1px solid #555555;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .buttonContainer {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 5px;
        }

        .startBtn, .resetBtn {
          padding: 10px 20px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .startBtn:hover, .resetBtn:hover {
          background-color: #357ab8;
        }

        .startBtn:disabled, .resetBtn:disabled {
          background-color: #888888;
          cursor: not-allowed;
        }

        .stepsContainer {
          height: calc(100vh - 100px);
          overflow-y: auto;
          flex: 1;
        }

        .stepsTable {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .stepsTable th, .stepsTable td {
          border: 1px solid #555555;
          padding: 10px;
          text-align: left;
        }

        .stepsTable th {
          background-color: #444444;
        }

        .stepsTable td {
          background-color: #333333;
        }

        .highlight {
          background-color: #f8e71c;
          color: #000000;
        }

        .iterationCount, .traversedCount, .spaceComplexity {
          text-align: center;
          margin-top: 10px;
          font-size: 18px;
          color: #f5a623;
        }
      `}</style>

      <div className="container">
        <div className="sidebarLeft">
          <h2 className="algorithmTitle">BFS Pseudo-Code</h2>
          <div className="algorithmBox">
            <pre>
              {pseudoCodeSteps.map((step, index) => (
                <div
                  key={index}
                  className={index === currentStepIndex ? 'highlight' : ''}
                >
                  {step}
                </div>
              ))}
            </pre>
            <div className="iterationCount">
              Iteration Count: {iterationCount}
            </div>
            <div className="traversedCount">
              Time Complexity: O({traversedNodes} + {totalEdges})
            </div>
            <div className="spaceComplexity">
              Space Complexity: O({maxQueueSize})
            </div>
          </div>
        </div>
        <div className="mainContent">
          <h1 className="heading">BFS Visualization</h1>
          <h2 className="graphTitle">Graph</h2>
          <div className="grid">
            {grid.map((row, rowIndex) =>
              row.map((node, colIndex) => (
                <Node
                  key={`${rowIndex}-${colIndex}`}
                  isVisited={visited.has(`${rowIndex}-${colIndex}`)}
                  isCurrent={current === `${rowIndex}-${colIndex}`}
                  isPath={path.includes(`${rowIndex}-${colIndex}`)}
                  isStart={
                    startNode && `${rowIndex}-${colIndex}` === `${startNode[0]}-${startNode[1]}`
                  }
                  isGoal={
                    goalNode && `${rowIndex}-${colIndex}` === `${goalNode[0]}-${goalNode[1]}`
                  }
                  onClick={() => handleNodeClick(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
          <div className="buttonContainer">
            <button
              className="startBtn"
              onClick={handleStartBFS}
              disabled={runningBFS}
            >
              {runningBFS ? 'Running BFS...' : 'Start BFS'}
            </button>
            <button
              className="resetBtn"
              onClick={handleReset}
              disabled={runningBFS}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="sidebarRight">
          <h2 className="stepsTitle">BFS Steps</h2>
          <div className="stepsContainer">
            <table className="stepsTable">
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
    </>
  );
}