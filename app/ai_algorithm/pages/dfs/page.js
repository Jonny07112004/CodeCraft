"use client";
import { useState, useEffect } from "react";
import styles from "./DFS.module.css";

const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, 1], [1, -1] // Hexagonal movement
];

const HexMaze = ({ rows = 10, cols = 10 }) => {
    const [grid, setGrid] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState("Select start and end points");
    const [highlightedLine, setHighlightedLine] = useState(null);

    useEffect(() => {
        generateGrid();
    }, []);

    const generateGrid = () => {
        let newGrid = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => ({ 
                visited: false, 
                blocked: Math.random() < 0.2, 
                parent: null
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
        dfsTraversal();
    };

    const dfsTraversal = async () => {
        setHighlightedLine(1);
        await delay(250);

        let stack = [{ ...start, parent: null }];
        let visitedGrid = [...grid];

        setHighlightedLine(2);
        await delay(500);

        while (stack.length > 0) {
            setHighlightedLine(3);
            await delay(500);
            
            let { row, col, parent } = stack.pop();
            
            if (visitedGrid[row][col].visited) continue;
            visitedGrid[row][col].visited = true;
            visitedGrid[row][col].parent = parent;
            updateGrid(row, col, "visited");
            setStatus(`Visiting: (${row}, ${col})`);
            await delay(200);

            setHighlightedLine(4);
            if (row === end.row && col === end.col) {
                updateGrid(row, col, "end");
                highlightPath(visitedGrid, row, col);
                setStatus("Path found and highlighted");
                setIsRunning(false);
                return;
            }
            
            setHighlightedLine(5);
            directions.forEach(([dr, dc]) => {
                let newRow = row + dr, newCol = col + dc;
                if (isValid(newRow, newCol, visitedGrid)) {
                    stack.push({ row: newRow, col: newCol, parent: { row, col } });
                }
            });
        }
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
    };

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.heading}>DFS Visualization</h1>
            <div className={styles.contentContainer}>
                <div className={styles.leftPanel}>
                    <h2>DFS Algorithm</h2>
                    <pre className={styles.pseudoCode}>
                        <code className={highlightedLine === 1 ? styles.highlight : ""}>DFS(start, end) {`{`}</code>
                        <code className={highlightedLine === 2 ? styles.highlight : ""}>  stack = [start]</code>
                        <code className={highlightedLine === 3 ? styles.highlight : ""}>  while stack not empty {`{`}</code>
                        <code className={highlightedLine === 4 ? styles.highlight : ""}>    node = stack.pop()</code>
                        <code className={highlightedLine === 5 ? styles.highlight : ""}>    if node == end return path</code>
                        <code className={highlightedLine === 6 ? styles.highlight : ""}>    for each neighbor of node {`{`}</code>
                        <code className={highlightedLine === 7 ? styles.highlight : ""}>      if not visited push to stack</code>
                        <code className={highlightedLine === 8 ? styles.highlight : ""}>{`    }`}</code>
                        <code className={highlightedLine === 9 ? styles.highlight : ""}>{`  }`}</code>
                        <code className={highlightedLine === 10 ? styles.highlight : ""}>{`}`}</code>
                    </pre>
                    <p className={styles.status}>{status}</p>
                </div>
                <div className={styles.mazeContainer}>
                    {grid.map((row, r) => (
                        <div key={r} className={styles.hexRow}>
                            {row.map((cell, c) => (
                                <div 
                                    key={c} 
                                    className={`${styles.hexCell} ${cell.blocked ? styles.blocked : ""} ${cell.type ? styles[cell.type] : ""}`}
                                    onClick={() => handleCellClick(r, c)}
                                />
                            ))}
                        </div>
                    ))}
                    <div className={styles.buttonContainer}>
                        <button className={styles.startButton} onClick={startDFS} disabled={isRunning}>
                            {isRunning ? "Running..." : "Start DFS"}
                        </button>
                        <button className={styles.resetButton} onClick={resetGrid} disabled={isRunning}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HexMaze;