'use client'
import React, { useState, useEffect } from "react";

const gridSize = 10;

// Generate an empty grid (no walls)
const generateEmptyGrid = () => {
  return Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(0));
};

const MazeTraversal = () => {
  const [grid] = useState(generateEmptyGrid());
  const [start] = useState([0, 0]);
  const [end] = useState([gridSize - 1, gridSize - 1]);
  const [bfsPath, setBfsPath] = useState([]);
  const [dfsPath, setDfsPath] = useState([]);
  const [currentBfs, setCurrentBfs] = useState([]);
  const [currentDfs, setCurrentDfs] = useState([]);
  const [bfsComplete, setBfsComplete] = useState(false);
  const [dfsComplete, setDfsComplete] = useState(false);
  const [bfsIterations, setBfsIterations] = useState(0);
  const [dfsIterations, setDfsIterations] = useState(0);

  // Calculate dynamic complexity (for this grid, it’s O(V + E) or O(gridSize * gridSize))
  const calculateComplexity = () => {
    const vertices = gridSize * gridSize; // Number of cells (vertices)
    const edges = (gridSize * (gridSize - 1)) * 2; // Assuming 4-directional movement, edges between adjacent cells
    return `O(${vertices} + ${edges})`; 
  };

  // BFS Algorithm with Step-by-Step Traversal and Real-Time Iteration Updates
  const bfs = () => {
    let queue = [[[...start]]];
    let visited = new Set();
    visited.add(start.toString());
    let iterations = 0;

    const traverse = () => {
      if (queue.length === 0) {
        setBfsComplete(true);
        setBfsIterations(iterations);
        return;
      }
      iterations++;
      setBfsIterations(iterations); // Update iterations in real-time
      let path = queue.shift();
      let [x, y] = path[path.length - 1];

      if (x === end[0] && y === end[1]) {
        setBfsPath(path);
        setBfsComplete(true);
        setBfsIterations(iterations);
        return;
      }

      [[x, y + 1], [x + 1, y], [x, y - 1], [x - 1, y]].forEach(([nx, ny]) => {
        if (nx >= 0 && ny >= 0 && nx < gridSize && ny < gridSize && !visited.has([nx, ny].toString())) {
          queue.push([...path, [nx, ny]]);
          visited.add([nx, ny].toString());
        }
      });

      setCurrentBfs(path);
      setTimeout(traverse, 200);
    };
    traverse();
  };

  // DFS Algorithm with Step-by-Step Traversal and Real-Time Iteration Updates
  const dfs = () => {
    let stack = [[[...start]]];
    let visited = new Set();
    visited.add(start.toString());
    let iterations = 0;

    const traverse = () => {
      if (stack.length === 0) {
        setDfsComplete(true);
        setDfsIterations(iterations);
        return;
      }
      iterations++;
      setDfsIterations(iterations); // Update iterations in real-time
      let path = stack.pop();
      let [x, y] = path[path.length - 1];

      if (x === end[0] && y === end[1]) {
        setDfsPath(path);
        setDfsComplete(true);
        setDfsIterations(iterations);
        return;
      }

      [[x, y + 1], [x + 1, y], [x, y - 1], [x - 1, y]].forEach(([nx, ny]) => {
        if (nx >= 0 && ny >= 0 && nx < gridSize && ny < gridSize && !visited.has([nx, ny].toString())) {
          stack.push([...path, [nx, ny]]);
          visited.add([nx, ny].toString());
        }
      });

      setCurrentDfs(path);
      setTimeout(traverse, 200);
    };
    traverse();
  };

  const runBothAlgorithms = () => {
    setBfsPath([]);
    setDfsPath([]);
    setBfsComplete(false);
    setDfsComplete(false);
    setBfsIterations(0);
    setDfsIterations(0);
    bfs();
    dfs();
  };

  return (
    <div style={styles.container}>
      <div style={styles.headingContainer}>
        <h2 style={styles.title}>✨ DFS vs BFS Maze Traversal ✨</h2>
      </div>
      <div style={styles.gridContainer}>
        {[
          ["DFS", dfsPath, currentDfs, "#FFA500", dfsComplete, dfsIterations, calculateComplexity(), "left"],
          ["BFS", bfsPath, currentBfs, "#007BFF", bfsComplete, bfsIterations, calculateComplexity(), "right"],
        ].map(([title, path, currentPath, color, complete, iterations, complexity, infoPosition]) => (
          <div key={title} style={styles.gridWrapper}>
            <h3>{title} Traversal</h3>
            <div style={styles.gridAndInfoContainer}>
              {/* Info Box (Outside the grid, on the side) */}
              <div
                style={{
                  ...styles.infoBox,
                  [infoPosition]: "-150px", // Position further outside for larger box
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <p style={styles.infoText}>Complexity: {complexity}</p>
                <p style={styles.infoText}>Iterations: {iterations}</p>
              </div>
              {/* Grid */}
              <div style={styles.grid}>
                {grid.map((row, i) =>
                  row.map((_, j) => (
                    <div
                      key={`${i}-${j}`}
                      style={{
                        ...styles.cell,
                        backgroundColor:
                          i === start[0] && j === start[1] ? "#00ff00" :
                          i === end[0] && j === end[1] ? "#ff0000" :
                          path.some(([x, y]) => x === i && y === j) ? (complete ? "#FFD700" : color) :
                          currentPath.some(([x, y]) => x === i && y === j) ? color :
                          "#333333",
                        boxShadow: currentPath.some(([x, y]) => x === i && y === j) ? `0px 0px 10px ${color}` : "",
                        transition: "background-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
                      }}
                    >
                      {i === start[0] && j === start[1] ? "S" : i === end[0] && j === end[1] ? "E" : ""}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={runBothAlgorithms} style={styles.startButton}>
          🚀 Run BFS & DFS
        </button>
        <button onClick={() => window.location.reload()} style={styles.resetButton}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#000000",
    color: "white",
    padding: "20px",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headingContainer: {
    marginBottom: "150px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "70px",
    color: "#00ff00",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    width: "60%",
    height: "calc(100vh - 100px)",
    marginTop: "-190px",
  },
  gridWrapper: {
    textAlign: "center",
    flex: 2,
    position: "relative",
  },
  gridAndInfoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  grid: {
    display: "grid",
    gap: "3px",
    backgroundColor: "#333333",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.2)",
    gridTemplateColumns: `repeat(${gridSize}, 40px)`,
  },
  cell: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    transition: "background-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
    border: "1px solid rgba(0, 255, 255, 0.2)",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "-40px",
  },
  startButton: {
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#00ff00",
    color: "#000000",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 255, 0, 0.4)",
    transition: "background 0.3s, transform 0.2s",
  },
  resetButton: {
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#ff00ff",
    color: "#000000",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(255, 0, 255, 0.4)",
    transition: "background 0.3s, transform 0.2s",
  },
  infoBox: {
    position: "absolute",
    padding: "15px", // Increased padding for larger box
    backgroundColor: "#1a1a1a",
    borderRadius: "8px", // Slightly larger radius
    border: "1px solid rgba(0, 255, 255, 0.2)",
    boxShadow: "0px 0px 8px rgba(0, 255, 255, 0.1)", // Slightly larger shadow
    width: "140px", // Increased width for larger box
    textAlign: "left",
  },
  infoText: {
    margin: "4px 0", 
    fontSize: "16px", 
    color: "#00ffff",
  },
};

export default MazeTraversal;