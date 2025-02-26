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

  // BFS Algorithm with Step-by-Step Traversal
  const bfs = () => {
    let queue = [[[...start]]];
    let visited = new Set();
    visited.add(start.toString());

    const traverse = () => {
      if (queue.length === 0) {
        setBfsComplete(true);
        return;
      }
      let path = queue.shift();
      let [x, y] = path[path.length - 1];

      if (x === end[0] && y === end[1]) {
        setBfsPath(path);
        setBfsComplete(true);
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

  // DFS Algorithm with Step-by-Step Traversal
  const dfs = () => {
    let stack = [[[...start]]];
    let visited = new Set();
    visited.add(start.toString());

    const traverse = () => {
      if (stack.length === 0) {
        setDfsComplete(true);
        return;
      }
      let path = stack.pop();
      let [x, y] = path[path.length - 1];

      if (x === end[0] && y === end[1]) {
        setDfsPath(path);
        setDfsComplete(true);
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
    bfs();
    dfs();
  };

  return (
    <div style={styles.container}>
      <div style={styles.headingContainer}>
        <h2 style={styles.title}>✨ DFS vs BFS Maze Traversal ✨</h2>
      </div>
      <div style={styles.gridContainer}>
        {[["DFS", dfsPath, currentDfs, "#FFA500", dfsComplete], ["BFS", bfsPath, currentBfs, "#007BFF", bfsComplete]].map(([title, path, currentPath, color, complete]) => (
          <div key={title} style={styles.gridWrapper}>
            <h3>{title} Traversal</h3>
            <div style={styles.grid}>
              {grid.map((row, i) =>
                row.map((_, j) => (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      ...styles.cell,
                      backgroundColor:
                        i === start[0] && j === start[1] ? "#00ff00" : // Start point
                        i === end[0] && j === end[1] ? "#ff0000" : // End point
                        path.some(([x, y]) => x === i && y === j) ? (complete ? "#FFD700" : color) : // Visited path
                        currentPath.some(([x, y]) => x === i && y === j) ? color : // Current step
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
    backgroundColor: "#000000", // Black background
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
    marginBottom: "150px", // Reduced margin to move mazes closer to the heading
  },
  title: {
    fontSize: "24px",
    marginBottom: "70px",
    color: "#00ff00", // Neon green
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    width: "60%",
    height: "calc(100vh - 100px)", // Adjust height to fit within the container
    marginTop: "-190px", // Removed margin to move mazes closer to the heading
  },
  gridWrapper: {
    textAlign: "center",
    flex: 2,
  },
  grid: {
    display: "grid",
    gap: "3px",
    backgroundColor: "#333333", // Dark gray background
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.2)", // Neon cyan shadow
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
    border: "1px solid rgba(0, 255, 255, 0.2)", // Neon cyan border
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "-40px", // Reduced margin to move buttons higher
  },
  startButton: {
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#00ff00", // Neon green
    color: "#000000", // Black text
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 255, 0, 0.4)", // Neon green shadow
    transition: "background 0.3s, transform 0.2s",
  },
  startButtonHover: {
    backgroundColor: "#00cc00", // Darker neon green
    transform: "scale(1.05)",
  },
  resetButton: {
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#ff00ff", // Neon magenta
    color: "#000000", // Black text
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(255, 0, 255, 0.4)", // Neon magenta shadow
    transition: "background 0.3s, transform 0.2s",
  },
  resetButtonHover: {
    backgroundColor: "#cc00cc", // Darker neon magenta
    transform: "scale(1.05)",
  },
};

export default MazeTraversal;
