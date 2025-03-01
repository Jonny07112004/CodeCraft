"use client";
import { useEffect, useState } from 'react';

const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const isSolvable = (startState) => {
  let inversions = 0;
  for (let i = 0; i < startState.length - 1; i++) {
    for (let j = i + 1; j < startState.length; j++) {
      if (startState[i] !== 0 && startState[j] !== 0 && startState[i] > startState[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
};

const getEmptyTilePosition = (state) => {
  return state.indexOf(0);
};

const getMoves = (state) => {
  const emptyTile = getEmptyTilePosition(state);
  const row = Math.floor(emptyTile / 3);
  const col = emptyTile % 3;
  const moves = [];

  if (row > 0) moves.push({ index: emptyTile - 3, direction: 'up' }); // Up
  if (row < 2) moves.push({ index: emptyTile + 3, direction: 'down' }); // Down
  if (col > 0) moves.push({ index: emptyTile - 1, direction: 'left' }); // Left
  if (col < 2) moves.push({ index: emptyTile + 1, direction: 'right' }); // Right

  return moves.map((move) => {
    const newState = [...state];
    const movedNumber = newState[move.index];
    [newState[emptyTile], newState[move.index]] = [newState[move.index], newState[emptyTile]];
    return { state: newState, move: { number: movedNumber, direction: move.direction } };
  });
};

const isGoalState = (state) => {
  return JSON.stringify(state) === JSON.stringify(goalState);
};

const heuristic = (state) => {
  let distance = 0;
  for (let i = 0; i < state.length; i++) {
    if (state[i] !== 0) {
      const goalIndex = goalState.indexOf(state[i]);
      const rowDiff = Math.abs(Math.floor(i / 3) - Math.floor(goalIndex / 3));
      const colDiff = Math.abs(i % 3 - goalIndex % 3);
      distance += rowDiff + colDiff;
    }
  }
  return distance;
};

const solvePuzzle = (startState) => {
  const openSet = [{ state: startState, g: 0, f: heuristic(startState), path: [] }];
  const visited = new Set([JSON.stringify(startState)]);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const { state, g, path } = openSet.shift();

    if (isGoalState(state)) {
      return path;
    }

    const possibleMoves = getMoves(state);
    for (const move of possibleMoves) {
      const moveStr = JSON.stringify(move.state);
      if (!visited.has(moveStr)) {
        visited.add(moveStr);
        openSet.push({
          state: move.state,
          g: g + 1,
          f: g + 1 + heuristic(move.state),
          path: [...path, move],
        });
      }
    }
  }

  return null;
};

const PuzzleGrid = ({ state }) => {
  return (
    <div style={styles.gridContainer}>
      {state.map((value, index) => (
        <div key={index} style={styles.cell}>
          {value || ''}
        </div>
      ))}
    </div>
  );
};

const InputGrid = ({ setState }) => {
  const [grid, setGrid] = useState(Array(9).fill(''));

  const handleChange = (index, value) => {
    const newGrid = [...grid];
    newGrid[index] = value;
    setGrid(newGrid);
    setState(newGrid);
  };

  return (
    <div style={styles.gridContainer}>
      {grid.map((value, index) => (
        <input
          key={index}
          type="number"
          min="0"
          max="8"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          style={styles.input}
        />
      ))}
    </div>
  );
};

const IndexPage = () => {
  const [startState, setStartState] = useState(Array(9).fill(''));
  const [solutionPath, setSolutionPath] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  const handleSubmit = () => {
    const numericStartState = startState.map(Number);
    if (isSolvable(numericStartState)) {
      const path = solvePuzzle(numericStartState);
      if (path) {
        setSolutionPath(path);
        setShowSolution(true);
      } else {
        alert('No solution found.');
      }
    } else {
      alert('The puzzle is not solvable.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>8 Puzzle Problem using A* Algorithm</h1>
      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Initial State</h2>
          <InputGrid setState={setStartState} />
          <button onClick={handleSubmit} style={styles.button}>
            Solve Puzzle
          </button>
          <h2 style={styles.subtitle}>Goal State</h2>
          <PuzzleGrid state={goalState} />
        </div>
        <div style={styles.solutionSection}>
          {showSolution && (
            <div>
              <h2 style={styles.subtitle}>Solution Path</h2>
              {solutionPath.map((step, index) => (
                <div key={index} style={styles.step}>
                  <PuzzleGrid state={step.state} />
                  <p style={styles.moveText}>
                    Move {step.move.number} {step.move.direction}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

// Styles
const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#fff',
    padding: '40px',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#ffd700',
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#ffd700',
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  section: {
    width: '40%',
  },
  solutionSection: {
    width: '40%',
    overflowY: 'auto',
    maxHeight: '600px',
    borderLeft: '2px solid #444',
    paddingLeft: '20px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 50px)',
    gap: '0px', // Ensure no gap between cells
  },
  cell: {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    border: '1px solid #444',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ffd700',
    backgroundColor: '#222',
  },
  input: {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    color: '#ffd700',
    backgroundColor: '#222',
    border: '1px solid #444',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#ff5722',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  step: {
    marginBottom: '20px',
  },
  moveText: {
    color: '#ffd700',
    fontSize: '1rem',
  },
};
