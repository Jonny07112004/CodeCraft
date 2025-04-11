'use client';
import { useState, useEffect } from "react";

const NQueens = () => {
  const [n, setN] = useState(4);
  const [board, setBoard] = useState([]);
  const [algorithm, setAlgorithm] = useState("backtracking");
  const [speed, setSpeed] = useState(500);
  const [solving, setSolving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (n > 16) {
      setError("Please enter a value between 4 and 16.");
    } else {
      setError("");
      setBoard(Array.from({ length: n }, () => Array(n).fill(0)));
    }
  }, [n]);

  const solveNQueens = async () => {
    if (n > 16 || solving) return; // Prevent starting if already solving
    setSolving(true); // Set solving to true to disable all controls
    let newBoard = Array.from({ length: n }, () => Array(n).fill(0));
    if (algorithm === "backtracking") {
      await backtrackingSolve(newBoard, 0);
    } else {
      await geneticSolve();
    }
    setSolving(false); // Re-enable controls when done
  };

  const backtrackingSolve = async (board, col) => {
    if (col >= n) return true;
    for (let i = 0; i < n; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = 1;
        setBoard(board.map(row => [...row]));
        await new Promise((res) => setTimeout(res, speed));
        if (await backtrackingSolve(board, col + 1)) return true;
        board[i][col] = 0;
        setBoard(board.map(row => [...row]));
        await new Promise((res) => setTimeout(res, speed));
      }
    }
    return false;
  };

  const isSafe = (board, row, col) => {
    for (let i = 0; i < col; i++) if (board[row][i]) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    for (let i = row, j = col; i < n && j >= 0; i++, j--) if (board[i][j]) return false;
    return true;
  };

  const geneticSolve = async () => {
    const populationSize = 100;
    const generations = 1000;
    const mutationRate = 0.05;

    const initializePopulation = () => {
      return Array.from({ length: populationSize }, () =>
        Array.from({ length: n }, () => Math.floor(Math.random() * n))
      );
    };

    const fitness = (individual) => {
      let attacks = 0;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (individual[i] === individual[j] ||
              Math.abs(individual[i] - individual[j]) === Math.abs(i - j)) {
            attacks++;
          }
        }
      }
      return 1 / (attacks + 1);
    };

    const select = (population) => {
      const fitnessScores = population.map(fitness);
      const totalFitness = fitnessScores.reduce((a, b) => a + b, 0);
      const random = Math.random() * totalFitness;
      let cumulative = 0;
      for (let i = 0; i < population.length; i++) {
        cumulative += fitnessScores[i];
        if (cumulative > random) return population[i];
      }
      return population[population.length - 1];
    };

    const crossover = (parent1, parent2) => {
      const point = Math.floor(Math.random() * n);
      const child = parent1.slice(0, point).concat(parent2.slice(point));
      return child;
    };

    const mutate = (individual) => {
      for (let i = 0; i < n; i++) {
        if (Math.random() < mutationRate) {
          individual[i] = Math.floor(Math.random() * n);
        }
      }
      return individual;
    };

    let population = initializePopulation();
    for (let gen = 0; gen < generations; gen++) {
      const newPopulation = [];
      for (let i = 0; i < populationSize; i++) {
        const parent1 = select(population);
        const parent2 = select(population);
        let child = crossover(parent1, parent2);
        child = mutate(child);
        newPopulation.push(child);
      }
      population = newPopulation;

      const bestIndividual = population.reduce((best, individual) =>
        fitness(individual) > fitness(best) ? individual : best
      );

      if (fitness(bestIndividual) === 1) {
        const solutionBoard = Array.from({ length: n }, () => Array(n).fill(0));
        bestIndividual.forEach((queen, col) => {
          solutionBoard[queen][col] = 1;
        });
        setBoard(solutionBoard);
        return;
      }

      const currentBoard = Array.from({ length: n }, () => Array(n).fill(0));
      bestIndividual.forEach((queen, col) => {
        currentBoard[queen][col] = 1;
      });
      setBoard(currentBoard);

      await new Promise((res) => setTimeout(res, speed));
    }
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "40px", backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: 10, width: "60%", background: "black", padding: "5px", zIndex: 800, left: "20%", border: "2px solid #00FF9D" }}>
        <h1 style={{ marginBottom: "20px", fontSize: "3em", color: "#00FF9D", fontWeight: "bold" }}>
          N-Queens Visualization
        </h1>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <label style={{ marginRight: "10px" }}>
            Number of Queens:
            <input
              type="number"
              min="4"
              max="16"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              disabled={solving} // Disable input when solving
              style={{
                width: "50px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #00FF9D",
                backgroundColor: solving ? "#333333" : "#1a1a1a", // Gray out when disabled
                color: "#00FF9D",
                fontWeight: "bold",
              }}
            />
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setAlgorithm("backtracking")}
              disabled={solving} // Disable when solving
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "1px solid #00FF9D",
                backgroundColor: algorithm === "backtracking" ? "#00FF9D" : solving ? "#555555" : "#1a1a1a", // Gray out when disabled
                color: algorithm === "backtracking" ? "black" : solving ? "#AAAAAA" : "#00FF9D",
                cursor: solving ? "not-allowed" : "pointer",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Backtracking
            </button>
            <button
              onClick={() => setAlgorithm("genetic")}
              disabled={solving} // Disable when solving
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "1px solid #00FF9D",
                backgroundColor: algorithm === "genetic" ? "#00FF9D" : solving ? "#555555" : "#1a1a1a", // Gray out when disabled
                color: algorithm === "genetic" ? "black" : solving ? "#AAAAAA" : "#00FF9D",
                cursor: solving ? "not-allowed" : "pointer",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Genetic Algorithm
            </button>
          </div>
          <select
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={solving} // Disable when solving
            style={{
              marginLeft: "20px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #00FF9D",
              backgroundColor: solving ? "#333333" : "#1a1a1a", // Gray out when disabled
              color: solving ? "#AAAAAA" : "#00FF9D",
              cursor: solving ? "not-allowed" : "pointer",
            }}
          >
            <option value={1000}>Slow</option>
            <option value={500}>Moderate</option>
            <option value={5}>Fast</option>
          </select>
          <button
            onClick={solveNQueens}
            disabled={solving} // Disable when solving
            style={{
              marginLeft: "20px",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "1px solid #FF5722",
              backgroundColor: solving ? "#555555" : "#FF5722", // Gray out when disabled
              color: solving ? "#AAAAAA" : "black",
              cursor: solving ? "not-allowed" : "pointer",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            Start
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div style={{ marginTop: "150px", display: "flex", justifyContent: "center" }}>
        <div style={{ border: "2px solid #00FF9D", padding: "20px", backgroundColor: "black" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, width: "400px", height: "400px" }}>
            {board.map((row, i) => (
              row.map((cell, j) => (
                <div key={`${i}-${j}`} style={{
                  width: `${400 / n}px`, height: `${400 / n}px`,
                  backgroundColor: (i + j) % 2 === 0 ? "white" : "gray",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontSize: "24px"
                }}>
                  {cell === 1 && "👑"}
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NQueens;