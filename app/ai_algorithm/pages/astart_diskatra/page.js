import React, { useState } from "react";

const gridSize = 10;

// Generate a grid with random obstacles
const generateMazeGrid = () => {
  let grid = Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(0));

  for (let i = 0; i < 20; i++) {
    let x = Math.floor(Math.random() * gridSize);
    let y = Math.floor(Math.random() * gridSize);
    if ((x !== 0 || y !== 0) && (x !== gridSize - 1 || y !== gridSize - 1)) {
      grid[x][y] = 1; // Setting obstacles
    }
  }
  return grid;
};

// Heuristic function for A* (Manhattan distance)
const heuristic = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const MazeTraversal = () => {
  const [grid] = useState(generateMazeGrid());
  const [start] = useState([0, 0]);
  const [end] = useState([gridSize - 1, gridSize - 1]);
  const [aStarPath, setAStarPath] = useState([]);
  const [dijkstraPath, setDijkstraPath] = useState([]);
  const [visitedNodesA, setVisitedNodesA] = useState([]);
  const [visitedNodesD, setVisitedNodesD] = useState([]);
  const [currentNodeA, setCurrentNodeA] = useState(null);
  const [currentNodeD, setCurrentNodeD] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Get valid neighbors for a cell (avoid obstacles)
  const getNeighbors = (x, y, grid) => {
    return [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ].filter(
      ([nx, ny]) =>
        nx >= 0 &&
        ny >= 0 &&
        nx < gridSize &&
        ny < gridSize &&
        grid[nx][ny] === 0 // Only allow cells that are not obstacles
    );
  };

  // A* Algorithm
  const aStar = (grid, start, end) => {
    let openSet = [{ pos: start, path: [], cost: 0, heuristic: heuristic(start, end) }];
    let visited = new Set();
    let interval;

    interval = setInterval(() => {
      if (openSet.length === 0) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }

      // Sort by f(n) = cost + heuristic
      openSet.sort((a, b) => a.cost + a.heuristic - (b.cost + b.heuristic));
      let { pos, path, cost } = openSet.shift();
      let [x, y] = pos;

      if (x === end[0] && y === end[1]) {
        setAStarPath([...path, [x, y]]);
        clearInterval(interval);
        setIsRunning(false);
        return;
      }

      if (visited.has(`${x},${y}`)) return;

      visited.add(`${x},${y}`);
      setVisitedNodesA((prev) => [...prev, [x, y]]);
      setCurrentNodeA([x, y]);

      let neighbors = getNeighbors(x, y, grid);
      neighbors.forEach(([nx, ny]) => {
        const newCost = cost + 1;
        const newHeuristic = heuristic([nx, ny], end);
        openSet.push({ pos: [nx, ny], path: [...path, [x, y]], cost: newCost, heuristic: newHeuristic });
      });
    }, 100); // Adjust speed of visualization
  };

  // Dijkstra's Algorithm
  const dijkstra = (grid, start, end) => {
    let queue = [{ pos: start, path: [], cost: 0 }];
    let visited = new Set();
    let interval;

    interval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }

      // Sort by cost only
      queue.sort((a, b) => a.cost - b.cost);
      let { pos, path, cost } = queue.shift();
      let [x, y] = pos;

      if (x === end[0] && y === end[1]) {
        setDijkstraPath([...path, [x, y]]);
        clearInterval(interval);
        setIsRunning(false);
        return;
      }

      if (visited.has(`${x},${y}`)) return;

      visited.add(`${x},${y}`);
      setVisitedNodesD((prev) => [...prev, [x, y]]);
      setCurrentNodeD([x, y]);

      let neighbors = getNeighbors(x, y, grid);
      neighbors.forEach(([nx, ny]) => {
        const newCost = cost + 1;
        queue.push({ pos: [nx, ny], path: [...path, [x, y]], cost: newCost });
      });
    }, 100); // Adjust speed of visualization
  };

  // Run both algorithms
  const runAlgorithms = () => {
    setAStarPath([]);
    setDijkstraPath([]);
    setVisitedNodesA([]);
    setVisitedNodesD([]);
    setCurrentNodeA(null);
    setCurrentNodeD(null);
    setIsRunning(true);

    aStar(grid, start, end);
    dijkstra(grid, start, end);
  };

  // Reset the maze
  const resetMaze = () => {
    setAStarPath([]);
    setDijkstraPath([]);
    setVisitedNodesA([]);
    setVisitedNodesD([]);
    setCurrentNodeA(null);
    setCurrentNodeD(null);
    setIsRunning(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⭐ A* vs Dijkstra Maze Traversal ⭐</h2>
      <div style={styles.gridContainer}>
        {[
          ["A* Algorithm", aStarPath, visitedNodesA, currentNodeA, "#FF69B4"], // Neon pink for A*
          ["Dijkstra's Algorithm", dijkstraPath, visitedNodesD, currentNodeD, "#00FFFF"], // Neon cyan for Dijkstra
        ].map(([title, path, visitedNodes, currentNode, color], index) => (
          <div key={index} style={styles.gridWrapper}>
            <h3 style={styles.subtitle}>{title}</h3>
            <div style={styles.grid}>
              {grid.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      ...styles.cell,
                      backgroundColor:
                        i === start[0] && j === start[1]
                          ? "#7FFF00" // Start cell (Neon green)
                          : i === end[0] && j === end[1]
                          ? "#FF4500" // End cell (Orange red)
                          : cell === 1
                          ? "#000000" // Obstacle (Black)
                          : currentNode && currentNode[0] === i && currentNode[1] === j
                          ? "#FFD700" // Current node (Gold)
                          : path.some(([x, y]) => x === i && y === j)
                          ? color // Path (Algorithm-specific color)
                          : visitedNodes.some(([x, y]) => x === i && y === j)
                          ? `${color}50` // Visited nodes with transparency
                          : "#333333", // Empty cell (Dark gray)
                      transition: "background-color 0.3s ease-in-out",
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
        <button onClick={runAlgorithms} style={styles.button} disabled={isRunning}>
          🚀 Run A* & Dijkstra
        </button>
        <button onClick={resetMaze} style={styles.button}>
          🔄 Reset
        </button>
      </div>
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
  subtitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#FFD700", // Gold color for subtitle
    fontWeight: "500",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    width: "90%",
    height: "calc(100vh - 120px)", // Add margin to move the maze higher
  },
  gridWrapper: {
    textAlign: "center",
    backgroundColor: "#1C1C1C", // Darker gray for grid wrapper
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)",
    flex: 1,
  },
  grid: {
    display: "grid",
    gap: "5px",
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
    fontSize: "14px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    width: "100%",
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
    display: "flex",
    marginTop: '-60px',
    gap: "20px",
    marginTop: "20px",
  },
  buttonHover: {
    backgroundColor: "#FF1493", // Darker neon pink on hover
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9", // Gray when disabled
    cursor: "not-allowed",
  },
};

export default MazeTraversal;