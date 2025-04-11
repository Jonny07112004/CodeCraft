"use client";
import React, { useState, useEffect } from "react";

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
  const [aStarIterations, setAStarIterations] = useState(0);
  const [dijkstraIterations, setDijkstraIterations] = useState(0);

  const calculateComplexity = () => {
    const vertices = gridSize * gridSize;
    const edges = (gridSize * (gridSize - 1)) * 2;
    return `O(${vertices} + ${edges})`;
  };

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
        grid[nx][ny] === 0
    );
  };

  const aStar = (grid, start, end) => {
    let openSet = [{ pos: start, path: [], cost: 0, heuristic: heuristic(start, end) }];
    let visited = new Set();
    let iterations = 0;
    let interval;

    interval = setInterval(() => {
      if (openSet.length === 0) {
        clearInterval(interval);
        setIsRunning(false); // Reset isRunning when both algorithms finish
        setAStarIterations(iterations);
        return;
      }

      iterations++;
      setAStarIterations(iterations);
      openSet.sort((a, b) => a.cost + a.heuristic - (b.cost + b.heuristic));
      let { pos, path, cost } = openSet.shift();
      let [x, y] = pos;

      if (x === end[0] && y === end[1]) {
        setAStarPath([...path, [x, y]]);
        clearInterval(interval);
        // Only set isRunning to false if Dijkstra is also done
        if (!dijkstraPath.length) setIsRunning(false);
        setAStarIterations(iterations);
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
    }, 100);
  };

  const dijkstra = (grid, start, end) => {
    let queue = [{ pos: start, path: [], cost: 0 }];
    let visited = new Set();
    let iterations = 0;
    let interval;

    interval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(interval);
        setIsRunning(false); // Reset isRunning when both algorithms finish
        setDijkstraIterations(iterations);
        return;
      }

      iterations++;
      setDijkstraIterations(iterations);
      queue.sort((a, b) => a.cost - b.cost);
      let { pos, path, cost } = queue.shift();
      let [x, y] = pos;

      if (x === end[0] && y === end[1]) {
        setDijkstraPath([...path, [x, y]]);
        clearInterval(interval);
        // Only set isRunning to false if A* is also done
        if (!aStarPath.length) setIsRunning(false);
        setDijkstraIterations(iterations);
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
    }, 100);
  };

  const runAlgorithms = () => {
    if (isRunning) return; // Prevent running if already in progress
    setIsRunning(true);
    setAStarPath([]);
    setDijkstraPath([]);
    setVisitedNodesA([]);
    setVisitedNodesD([]);
    setCurrentNodeA(null);
    setCurrentNodeD(null);
    setAStarIterations(0);
    setDijkstraIterations(0);

    aStar(grid, start, end);
    dijkstra(grid, start, end);
  };

  const resetMaze = () => {
    if (isRunning) return; // Prevent reset while running
    setAStarPath([]);
    setDijkstraPath([]);
    setVisitedNodesA([]);
    setVisitedNodesD([]);
    setCurrentNodeA(null);
    setCurrentNodeD(null);
    setIsRunning(false);
    setAStarIterations(0);
    setDijkstraIterations(0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⭐ A* vs Dijkstra Maze Traversal ⭐</h2>
      <div style={styles.gridContainer}>
        {[
          ["A* Algorithm", aStarPath, visitedNodesA, currentNodeA, "#FF69B4", aStarIterations, calculateComplexity()],
          ["Dijkstra's Algorithm", dijkstraPath, visitedNodesD, currentNodeD, "#00FFFF", dijkstraIterations, calculateComplexity()],
        ].map(([title, path, visitedNodes, currentNode, color, iterations, complexity], index) => (
          <div key={index} style={styles.gridWrapper}>
            <h3 style={styles.subtitle}>{title}</h3>
            <div style={styles.gridAndInfoWrapper}>
              <div style={styles.grid}>
                {grid.map((row, i) =>
                  row.map((cell, j) => (
                    <div
                      key={`${i}-${j}`}
                      style={{
                        ...styles.cell,
                        backgroundColor:
                          i === start[0] && j === start[1]
                            ? "#7FFF00"
                            : i === end[0] && j === end[1]
                            ? "#FF4500"
                            : cell === 1
                            ? "#000000"
                            : currentNode && currentNode[0] === i && currentNode[1] === j
                            ? "#FFD700"
                            : path.some(([x, y]) => x === i && y === j)
                            ? color
                            : visitedNodes.some(([x, y]) => x === i && y === j)
                            ? `${color}50`
                            : "#333333",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                    >
                      {i === start[0] && j === start[1] ? "S" : i === end[0] && j === end[1] ? "E" : ""}
                    </div>
                  ))
                )}
              </div>
              <div style={styles.infoBox}>
                <p style={styles.infoText}>Complexity: {complexity}</p>
                <p style={styles.infoText}>Iterations: {iterations}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={runAlgorithms}
          style={{
            ...styles.button,
            ...(isRunning ? styles.buttonDisabled : {}),
          }}
          disabled={isRunning}
          onMouseOver={(e) => !isRunning && (e.currentTarget.style.backgroundColor = "#FF1493")}
          onMouseOut={(e) => !isRunning && (e.currentTarget.style.backgroundColor = "#FF69B4")}
        >
          🚀 Run A* & Dijkstra
        </button>
        <button
          onClick={resetMaze}
          style={{
            ...styles.button,
            ...(isRunning ? styles.buttonDisabled : {}),
          }}
          disabled={isRunning}
          onMouseOver={(e) => !isRunning && (e.currentTarget.style.backgroundColor = "#FF1493")}
          onMouseOut={(e) => !isRunning && (e.currentTarget.style.backgroundColor = "#FF69B4")}
        >
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
    backgroundColor: "#000000",
    color: "#FFFFFF",
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#FFD700",
    textShadow: "0px 0px 10px rgba(255, 215, 0, 0.7)",
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#FFD700",
    fontWeight: "500",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    width: "100%",
    maxWidth: "1200px",
    flexGrow: 1,
    alignItems: "center",
  },
  gridWrapper: {
    textAlign: "center",
    backgroundColor: "#1C1C1C",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)",
    width: "100%",
    maxWidth: "500px",
  },
  gridAndInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  grid: {
    display: "grid",
    gap: "4px",
    gridTemplateColumns: `repeat(${gridSize}, 30px)`,
    justifyContent: "center",
  },
  cell: {
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "12px",
    boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.1)",
  },
  infoBox: {
    padding: "10px",
    backgroundColor: "#1A1A1A",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)",
    width: "160px",
    textAlign: "left",
  },
  infoText: {
    margin: "5px 0",
    fontSize: "14px",
    color: "#00FFFF",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    padding: "20px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
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
};

export default MazeTraversal;