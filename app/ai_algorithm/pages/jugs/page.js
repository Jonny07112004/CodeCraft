"use client";
import { useState, useEffect } from "react";

export default function WaterJugs() {
  const [isThreeJug, setIsThreeJug] = useState(true);
  const [jug1Capacity, setJug1Capacity] = useState("3");
  const [jug2Capacity, setJug2Capacity] = useState("5");
  const [jug3Capacity, setJug3Capacity] = useState("8");
  const [targetWater, setTargetWater] = useState("4");
  const [jug1Value, setJug1Value] = useState(0);
  const [jug2Value, setJug2Value] = useState(0);
  const [jug3Value, setJug3Value] = useState(8);
  const [steps, setSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const isSolvable = (capacities, target, initialState) => {
    const maxCap = Math.max(...capacities);
    if (target > maxCap) return false;
    const g = capacities.reduce((acc, val) => gcd(acc, val), capacities[0]);
    const totalWater = initialState.reduce((a, b) => a + b, 0);
    return totalWater >= target && target % g === 0;
  };

  const getPossibleMoves = (state, capacities) => {
    const moves = [];
    const n = capacities.length;

    for (let i = 0; i < n; i++) {
      if (state[i] < capacities[i]) {
        const newState = [...state];
        newState[i] = capacities[i];
        moves.push({ state: newState, step: `Fill Jug${i + 1} to ${capacities[i]}L` });
      }
    }

    for (let i = 0; i < n; i++) {
      if (state[i] > 0) {
        const newState = [...state];
        newState[i] = 0;
        moves.push({ state: newState, step: `Empty Jug${i + 1}` });
      }
    }

    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        if (from !== to && state[from] > 0 && state[to] < capacities[to]) {
          const pourAmount = Math.min(state[from], capacities[to] - state[to]);
          const newState = [...state];
          newState[from] -= pourAmount;
          newState[to] += pourAmount;
          moves.push({ state: newState, step: `Pour from Jug${from + 1} to Jug${to + 1}` });
        }
      }
    }

    return moves;
  };

  const bfsSolve = async (capacities, target, initialState) => {
    const visited = new Set();
    const queue = [{ state: initialState, path: [{ step: "Started with initial state", jug1: initialState[0], jug2: initialState[1], jug3: initialState[2] }] }];
    visited.add(initialState.join(","));

    let finalPath = [];

    while (queue.length > 0) {
      const { state, path } = queue.shift();

      if (state.includes(target)) {
        finalPath = path.concat({
          step: "Target reached",
          jug1: state[0],
          jug2: state[1],
          jug3: state[2],
        });
        break;
      }

      const moves = getPossibleMoves(state, capacities);
      for (const { state: nextState, step } of moves) {
        const stateKey = nextState.join(",");
        if (!visited.has(stateKey)) {
          visited.add(stateKey);
          const newPath = [
            ...path,
            { step, jug1: nextState[0], jug2: nextState[1], jug3: nextState[2] },
          ];
          queue.push({ state: nextState, path: newPath });
        }
      }
    }

    if (finalPath.length === 0) {
      setSteps([{ step: "No solution possible", jug1: initialState[0], jug2: initialState[1], jug3: initialState[2] }]);
      setIsRunning(false);
      return false;
    }

    for (const step of finalPath) {
      setSteps((prev) => [...prev, step]);
      setJug1Value(step.jug1);
      setJug2Value(step.jug2);
      setJug3Value(step.jug3);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setIsRunning(false);
    return true;
  };

  const handleSolve = async () => {
    // Parse inputs first
    const cap1 = parseInt(jug1Capacity);
    const cap2 = parseInt(jug2Capacity);
    const cap3 = isThreeJug ? parseInt(jug3Capacity) : 0;
    const target = parseInt(targetWater);

    // Check for valid numbers
    if (
      isNaN(cap1) || cap1 <= 0 ||
      isNaN(cap2) || cap2 <= 0 ||
      (isThreeJug && (isNaN(cap3) || cap3 <= 0)) ||
      isNaN(target) || target < 0
    ) {
      alert("Please enter valid positive jug capacities and a non-negative target water amount.");
      return;
    }

    if (isRunning) return;

    const capacities = isThreeJug ? [cap1, cap2, cap3] : [cap1, cap2];
    const initialState = isThreeJug ? [0, 0, cap3] : [0, cap2];

    setIsRunning(true);
    setJug1Value(0);
    setJug2Value(isThreeJug ? 0 : cap2);
    setJug3Value(isThreeJug ? cap3 : 0);
    setSteps([]);

    if (!isSolvable(capacities, target, initialState)) {
      alert("No solution exists for the given inputs.");
      setIsRunning(false);
      return;
    }

    await bfsSolve(capacities, target, initialState);
  };

  const handleReset = () => {
    if (isRunning) return;
    setJug1Capacity("3");
    setJug2Capacity("5");
    setJug3Capacity("8");
    setTargetWater("4");
    setJug1Value(0);
    setJug2Value(0);
    setJug3Value(8);
    setSteps([]);
    setIsRunning(false);
    setIsThreeJug(true);
  };

  const handleSwitch = () => {
    if (isRunning) return;
    handleReset();
    setIsThreeJug(!isThreeJug);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#1a1a1a",
      textAlign: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      width: "100vw",
      overflow: "hidden",
      color: "#ffffff",
    },
    heading: {
      marginBottom: "30px",
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#1e90ff",
    },
    mainContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    leftContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "60%",
    },
    inputContainer: {
      display: "flex",
      marginBottom: "20px",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
    input: {
      width: "120px",
      padding: "8px",
      margin: "10px",
      fontSize: "0.9rem",
      borderRadius: "8px",
      border: "1px solid #444",
      backgroundColor: "#2d2d2d",
      color: "#fff",
      transition: "border-color 0.3s ease",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
      gap: "10px",
    },
    switchButton: {
      padding: "8px 16px",
      backgroundColor: "#2ecc71",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.9rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      transition: "background-color 0.3s ease, transform 0.2s",
    },
    solveButton: {
      padding: "8px 16px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.9rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      transition: "background-color 0.3s ease, transform 0.2s",
    },
    resetButton: {
      padding: "8px 16px",
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.9rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      transition: "background-color 0.3s ease, transform 0.2s",
    },
    buttonDisabled: {
      backgroundColor: "#666",
      cursor: "not-allowed",
      boxShadow: "none",
    },
    jugSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    jugContainer: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
    },
    jug: {
      position: "relative",
      width: "150px",
      height: "300px",
      backgroundColor: "#2d2d2d",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      transform: "perspective(1000px) rotateX(10deg)",
    },
    water: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      background: "linear-gradient(to top, #1e90ff, #87cefa)",
      borderRadius: "8px",
      transition: "height 0.5s ease-in-out",
    },
    jugDetails: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
      marginTop: "10px",
    },
    jugLabel: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    jugValue: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    stepsSection: {
      display: "flex",
      justifyContent: "center",
      width: "30%",
    },
    stepsContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: "#222",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      overflowY: "auto",
    },
    stepsHeading: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#1e90ff",
    },
    stepsContent: {
      maxHeight: "400px",
      overflowY: "auto",
    },
    stepsTable: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "1.2rem",
    },
    tableHeader: {
      padding: "12px",
      backgroundColor: "#3498db",
      color: "white",
      borderBottom: "2px solid #444",
    },
    tableRow: {
      borderBottom: "1px solid #444",
      animation: "fadeIn 0.5s ease-in",
    },
    tableCell: {
      padding: "12px",
      textAlign: "center",
      color: "#ddd",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Water Jugs Problem</h1>

      <div style={styles.mainContainer}>
        <div style={styles.leftContainer}>
          <div style={styles.inputContainer}>
            <input
              type="number"
              placeholder="Jug 1 Capacity"
              value={jug1Capacity}
              onChange={(e) => setJug1Capacity(e.target.value)}
              style={{ ...styles.input, ...(isRunning ? { opacity: 0.7 } : {}) }}
              disabled={isRunning}
            />
            <input
              type="number"
              placeholder="Jug 2 Capacity"
              value={jug2Capacity}
              onChange={(e) => setJug2Capacity(e.target.value)}
              style={{ ...styles.input, ...(isRunning ? { opacity: 0.7 } : {}) }}
              disabled={isRunning}
            />
            {isThreeJug && (
              <input
                type="number"
                placeholder="Jug 3 Capacity"
                value={jug3Capacity}
                onChange={(e) => setJug3Capacity(e.target.value)}
                style={{ ...styles.input, ...(isRunning ? { opacity: 0.7 } : {}) }}
                disabled={isRunning}
              />
            )}
            <input
              type="number"
              placeholder="Target Water"
              value={targetWater}
              onChange={(e) => setTargetWater(e.target.value)}
              style={{ ...styles.input, ...(isRunning ? { opacity: 0.7 } : {}) }}
              disabled={isRunning}
            />
          </div>

          <div style={styles.jugSection}>
            <div style={styles.jugContainer}>
              <div style={styles.jug}>
                <div
                  style={{
                    ...styles.water,
                    height: jug1Capacity ? `${(jug1Value / parseInt(jug1Capacity)) * 100}%` : "0%",
                  }}
                ></div>
              </div>
              <div style={styles.jug}>
                <div
                  style={{
                    ...styles.water,
                    height: jug2Capacity ? `${(jug2Value / parseInt(jug2Capacity)) * 100}%` : "0%",
                  }}
                ></div>
              </div>
              {isThreeJug && (
                <div style={styles.jug}>
                  <div
                    style={{
                      ...styles.water,
                      height: jug3Capacity ? `${(jug3Value / parseInt(jug3Capacity)) * 100}%` : "0%",
                    }}
                  ></div>
                </div>
              )}
            </div>
            <div style={styles.jugDetails}>
              <div style={{ ...styles.jugLabel, color: "#1E90FF" }}>Jug 1</div>
              <div style={{ ...styles.jugValue, color: "#1E90FF" }}>{jug1Value}L</div>
              <div style={{ ...styles.jugLabel, color: "#32CD32" }}>Jug 2</div>
              <div style={{ ...styles.jugValue, color: "#32CD32" }}>{jug2Value}L</div>
              {isThreeJug && (
                <>
                  <div style={{ ...styles.jugLabel, color: "#FFD700" }}>Jug 3</div>
                  <div style={{ ...styles.jugValue, color: "#FFD700" }}>{jug3Value}L</div>
                </>
              )}
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              onClick={handleSwitch}
              style={{ ...styles.switchButton, ...(isRunning ? styles.buttonDisabled : {}) }}
              disabled={isRunning}
            >
              {isThreeJug ? "Switch to 2 Jugs" : "Switch to 3 Jugs"}
            </button>
            <button
              onClick={handleSolve}
              style={{ ...styles.solveButton, ...(isRunning ? styles.buttonDisabled : {}) }}
              disabled={isRunning}
            >
              {isRunning ? "Solving..." : "Solve"}
            </button>
            <button
              onClick={handleReset}
              style={{ ...styles.resetButton, ...(isRunning ? styles.buttonDisabled : {}) }}
              disabled={isRunning}
            >
              Reset
            </button>
          </div>
        </div>

        <div style={styles.stepsSection}>
          <div style={styles.stepsContainer}>
            <h3 style={styles.stepsHeading}>Steps:</h3>
            <div style={styles.stepsContent}>
              <table style={styles.stepsTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Step</th>
                    <th style={styles.tableHeader}>Jug1 (L)</th>
                    <th style={styles.tableHeader}>Jug2 (L)</th>
                    {isThreeJug && <th style={styles.tableHeader}>Jug3 (L)</th>}
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>{step.step}</td>
                      <td style={styles.tableCell}>{step.jug1}</td>
                      <td style={styles.tableCell}>{step.jug2}</td>
                      {isThreeJug && <td style={styles.tableCell}>{step.jug3}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input:focus:not(:disabled) {
          border-color: #1e90ff;
          outline: none;
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .switchButton:hover:not(:disabled) {
          background-color: #27ae60;
        }
        .solveButton:hover:not(:disabled) {
          background-color: #2980b9;
        }
        .resetButton:hover:not(:disabled) {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
}