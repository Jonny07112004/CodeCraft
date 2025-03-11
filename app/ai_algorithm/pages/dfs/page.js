"use client";
import { useState, useEffect } from "react";

const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
  [-1, 1], [1, -1] // Hexagonal movement
];

export default function HexMaze({ rows = 10, cols = 10 }) {
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("Select start and end points");
  const [highlightedLine, setHighlightedLine] = useState(null);
  const [iterationCount, setIterationCount] = useState(0); // Track iterations
  const [traversedNodes, setTraversedNodes] = useState(0); // V: Nodes traversed
  const [maxStackSize, setMaxStackSize] = useState(0); // Space complexity V

  // Calculate total edges (E) for a 10x10 hexagonal grid
  const totalEdges = (rows * cols * 6) / 2; // Each node has up to 6 edges, divided by 2 as edges are shared

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    let newGrid = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => ({ 
        visited: false, 
        blocked: Math.random() < 0.2, 
        parent: null,
        type: null
      }))
    );
    setGrid(newGrid);
  };

  const handleCellClick = (r, c) => {
    if (!start) {
      setStart({ row: r, col: c });
      updateGrid(r, c, "start");
      setStatus("Start selected, now select end point");
    } else if (!end) {
      setEnd({ row: r, col: c });
      updateGrid(r, c, "end");
      setStatus("End selected, click 'Start DFS'");
    }
  };

  const updateGrid = (row, col, type) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map((rowArr, r) => 
        rowArr.map((cell, c) => 
          r === row && c === col ? { ...cell, type } : cell
        )
      );
      return newGrid;
    });
  };

  const startDFS = () => {
    if (!start || !end) {
      alert("Please select both start and end points.");
      return;
    }
    setIsRunning(true);
    setStatus("Traversing using DFS...");
    setIterationCount(0);
    setTraversedNodes(0);
    setMaxStackSize(0);
    dfsTraversal();
  };

  const dfsTraversal = async () => {
    setHighlightedLine(1); // "DFS(start, end)"
    await delay(250);

    let stack = [{ ...start, parent: null }];
    let visitedGrid = [...grid];
    setMaxStackSize(stack.length); // Initial stack size
    setTraversedNodes(1); // Start node traversed
    setHighlightedLine(2); // "stack = [start]"
    await delay(500);

    while (stack.length > 0) {
      setHighlightedLine(3); // "while stack not empty"
      await delay(500);
      
      let { row, col, parent } = stack.pop();
      setIterationCount((prev) => prev + 1); // Increment iteration count
      
      if (visitedGrid[row][col].visited) {
        setHighlightedLine(4); // "if visited continue"
        await delay(200);
        continue;
      }
      
      visitedGrid[row][col].visited = true;
      visitedGrid[row][col].parent = parent;
      updateGrid(row, col, "visited");
      setStatus(`Visiting: (${row}, ${col})`);
      setHighlightedLine(5); // "visit node"
      await delay(200);

      if (row === end.row && col === end.col) {
        setHighlightedLine(6); // "if node == end return path"
        updateGrid(row, col, "end");
        highlightPath(visitedGrid, row, col);
        setStatus("Path found and highlighted");
        setIsRunning(false);
        setHighlightedLine(null);
        return;
      }
      
      setHighlightedLine(7); // "for each neighbor"
      directions.forEach(([dr, dc]) => {
        let newRow = row + dr, newCol = col + dc;
        if (isValid(newRow, newCol, visitedGrid)) {
          stack.push({ row: newRow, col: newCol, parent: { row, col } });
          setMaxStackSize((prev) => Math.max(prev, stack.length)); // Update max stack size
        }
      });
      await delay(200);
    }
    
    setHighlightedLine(null);
    setStatus("No path found");
    setIsRunning(false);
  };

  const highlightPath = (grid, row, col) => {
    let path = [];
    while (grid[row][col].parent) {
      path.push({ row, col });
      let { row: prevRow, col: prevCol } = grid[row][col].parent;
      row = prevRow;
      col = prevCol;
    }
    path.push({ row, col }); // Include the start node
    path.forEach(({ row, col }) => updateGrid(row, col, "path"));
  };

  const isValid = (row, col, grid) => {
    return (
      row >= 0 && col >= 0 && row < rows && col < cols &&
      !grid[row][col].blocked && !grid[row][col].visited
    );
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetGrid = () => {
    setGrid(grid.map(row => row.map(cell => ({
      ...cell,
      visited: false,
      type: null,
      parent: null
    }))));
    setStart(null);
    setEnd(null);
    setIsRunning(false);
    setStatus("Select start and end points");
    setHighlightedLine(null);
    setIterationCount(0);
    setTraversedNodes(0);
    setMaxStackSize(0);
  };

  return (
    <>
      <style jsx global>{`
        .container {
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          overflow: auto;
          box-sizing: border-box;
          border: solid #5B6DCD 10px;
          padding: 5px;
          overflow: none;
        }

        .mainContainer {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: none;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 20px;
          padding: 20px;
          background-color: #121212;
          min-height: 100vh;
          color: #ffffff;
        }

        .heading {
          text-align: center;
          width: 100%;
          font-size: 50px;
          margin-top: 0px;
          color: #f8e71c;
        }

        .contentContainer {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          gap: 20px;
          width: 80%;
          height: 80vh;
        }

        .leftPanel {
          background: #1e1e1e;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 18vw;
          height: 100%;
          overflow-y: none;
        }

        .pseudoCode {
          font-family: "Courier New", monospace;
          background: #2e2e2e;
          color: #f8f8f2;
          padding: 12px;
          border-radius: 8px;
          width: 80%;
          white-space: pre-line;
          font-size: 13px;
          overflow-x: auto;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
        }

        .pseudoCode code {
          display: block;
          padding: 2px 5px;
          transition: all 0.3s ease;
        }

        .highlight {
          background: #ffdd57;
          color: #222;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .status {
          margin-top: 10px;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
        }

        .mazeContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #1e1e1e;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          flex-grow: 1;
          height: 100%;
          width: 40vw;
          overflow-y: none;
        }

        .hexRow {
          display: flex;
          justify-content: center;
        }

        .hexCell {
          width: 40px;
          height: 40px;
          background-color: #333;
          margin: 2px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transition: background-color 0.3s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
        }

        .hexCell.blocked {
          background-color: #e78282;
        }

        .hexCell.start {
          background-color: #4caf50;
          transform: scale(1.1);
        }

        .hexCell.end {
          background-color: #f44336;
          transform: scale(1.1);
        }

        .hexCell.visited {
          background-color: #2196f3;
          opacity: 0.8;
        }

        .hexCell.path {
          background-color: #ffd700;
          transform: scale(1.1);
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        }

        .buttonContainer {
          display: flex;
          gap: 10px;
          margin-top: 0px;
        }

        .startButton, .resetButton {
          background-color: #ff9800;
          color: white;
          padding: 12px 24px;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .startButton:hover, .resetButton:hover {
          background-color: #e68900;
          transform: scale(1.05);
        }

        .startButton:disabled, .resetButton:disabled {
          background-color: #bbb;
          cursor: not-allowed;
        }

        .metrics {
          margin-top: 10px;
          font-size: 14px;
          color: #f5a623;
          text-align: center;
        }
      `}</style>

      <div className="mainContainer">
        <h1 className="heading">DFS Visualization</h1>
        <div className="contentContainer">
          <div className="leftPanel">
            <h2>DFS Algorithm</h2>
            <pre className="pseudoCode">
              <code className={highlightedLine === 1 ? "highlight" : ""}>DFS(start, end) {`{`}</code>
              <code className={highlightedLine === 2 ? "highlight" : ""}>  stack = [start]</code>
              <code className={highlightedLine === 3 ? "highlight" : ""}>  while stack not empty {`{`}</code>
              <code className={highlightedLine === 4 ? "highlight" : ""}>    node = stack.pop()</code>
              <code className={highlightedLine === 5 ? "highlight" : ""}>    if not visited mark & visit</code>
              <code className={highlightedLine === 6 ? "highlight" : ""}>    if node == end return path</code>
              <code className={highlightedLine === 7 ? "highlight" : ""}>    for each neighbor push to stack</code>
              <code className={highlightedLine === 8 ? "highlight" : ""}>{`  }`}</code>
              <code className={highlightedLine === 9 ? "highlight" : ""}>  return no path</code>
              <code className={highlightedLine === 10 ? "highlight" : ""}>{`}`}</code>
            </pre>
            <p className="status">{status}</p>
            <div className="metrics">
              <div>Iteration Count: {iterationCount}</div>
              <div>Time Complexity: O({traversedNodes} + {totalEdges})</div>
              <div>Space Complexity: O({maxStackSize})</div>
            </div>
          </div>
          <div className="mazeContainer">
            {grid.map((row, r) => (
              <div key={r} className="hexRow">
                {row.map((cell, c) => (
                  <div 
                    key={c} 
                    className={`hexCell ${cell.blocked ? "blocked" : ""} ${cell.type ? cell.type : ""}`}
                    onClick={() => handleCellClick(r, c)}
                  />
                ))}
              </div>
            ))}
            <div className="buttonContainer">
              <button className="startButton" onClick={startDFS} disabled={isRunning}>
                {isRunning ? "Running..." : "Start DFS"}
              </button>
              <button className="resetButton" onClick={resetGrid} disabled={isRunning}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};