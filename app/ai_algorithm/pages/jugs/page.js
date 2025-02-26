import { useState, useEffect } from 'react';

export default function Home() {
  const [jug1Capacity, setJug1Capacity] = useState('');
  const [jug2Capacity, setJug2Capacity] = useState('');
  const [jug3Capacity, setJug3Capacity] = useState('');
  const [targetWater, setTargetWater] = useState('');
  const [steps, setSteps] = useState([]);
  const [jug1Value, setJug1Value] = useState(0);
  const [jug2Value, setJug2Value] = useState(0);
  const [jug3Value, setJug3Value] = useState(0);
  const [numJugs, setNumJugs] = useState(2); // Default value for both server and client

  const handleSolve = async () => {
    // Validate inputs
    if ((numJugs === 2 && (!jug1Capacity || !jug2Capacity)) || (numJugs === 3 && (!jug1Capacity || !jug2Capacity || !jug3Capacity)) || !targetWater) {
      alert('Please enter valid jug capacities and target water amount.');
      return;
    }
  
    // Initialize states
    setJug1Value(0);
    setJug2Value(0);
    setJug3Value(0);
    setSteps([]);
  
    let stepList = [];
    let jug1 = 0;
    let jug2 = 0;
    let jug3 = 0;
    const cap1 = parseInt(jug1Capacity);
    const cap2 = parseInt(jug2Capacity);
    const cap3 = parseInt(jug3Capacity);
    const target = parseInt(targetWater);
  
    if (numJugs === 2) {
      // Solve for 2 jugs
      while (jug1 !== target && jug2 !== target) {
        if (jug1 === 0) {
          jug1 = cap1;
          stepList.push({ step: 'Fill Jug1', jug1, jug2 });
        } else if (jug2 === cap2) {
          jug2 = 0;
          stepList.push({ step: 'Empty Jug2', jug1, jug2 });
        } else if (jug1 > 0 && jug2 < cap2) {
          const pourAmount = Math.min(jug1, cap2 - jug2);
          jug1 -= pourAmount;
          jug2 += pourAmount;
          stepList.push({ step: 'Pour from Jug1 to Jug2', jug1, jug2 });
        }
  
        setSteps([...stepList]);
        setJug1Value(jug1);
        setJug2Value(jug2);
  
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } else if (numJugs === 3) {
      // Solve for 3 jugs
      while (jug1 !== target && jug2 !== target && jug3 !== target) {
        if (jug1 === 0) {
          jug1 = cap1;
          stepList.push({ step: 'Fill Jug1', jug1, jug2, jug3 });
        } else if (jug2 === 0) {
          jug2 = cap2;
          stepList.push({ step: 'Fill Jug2', jug1, jug2, jug3 });
        } else if (jug3 === cap3) {
          jug3 = 0;
          stepList.push({ step: 'Empty Jug3', jug1, jug2, jug3 });
        } else if (jug1 > 0 && jug2 < cap2) {
          const pourAmount = Math.min(jug1, cap2 - jug2);
          jug1 -= pourAmount;
          jug2 += pourAmount;
          stepList.push({ step: 'Pour from Jug1 to Jug2', jug1, jug2, jug3 });
        } else if (jug2 > 0 && jug3 < cap3) {
          const pourAmount = Math.min(jug2, cap3 - jug3);
          jug2 -= pourAmount;
          jug3 += pourAmount;
          stepList.push({ step: 'Pour from Jug2 to Jug3', jug1, jug2, jug3 });
        }
  
        setSteps([...stepList]);
        setJug1Value(jug1);
        setJug2Value(jug2);
        setJug3Value(jug3);
  
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  };
  

  const handleReset = () => {
    setJug1Capacity('');
    setJug2Capacity('');
    setJug3Capacity('');
    setTargetWater('');
    setJug1Value(0);
    setJug2Value(0);
    setJug3Value(0);
    setSteps([]);
    setNumJugs(2);
    if (typeof window !== 'undefined') {
      localStorage.setItem('numJugs', '2');
    }
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Water Jug Problem ({numJugs} Jugs)</h1>

      <div style={styles.mainContainer}>
        <div style={styles.leftContainer}>
          <div style={styles.inputContainer}>
            <input
              type="number"
              placeholder="Jug1 Capacity"
              value={jug1Capacity}
              onChange={(e) => setJug1Capacity(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Jug2 Capacity"
              value={jug2Capacity}
              onChange={(e) => setJug2Capacity(e.target.value)}
              style={styles.input}
            />
            {numJugs === 3 && (
              <input
                type="number"
                placeholder="Jug3 Capacity"
                value={jug3Capacity}
                onChange={(e) => setJug3Capacity(e.target.value)}
                style={styles.input}
              />
            )}
            <input
              type="number"
              placeholder="Target Water"
              value={targetWater}
              onChange={(e) => setTargetWater(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.jugSection}>
            <div style={styles.jugContainer}>
              <div style={styles.jug}>
                <div style={{ ...styles.water, height: `${(jug1Value / jug1Capacity) * 100}%` }}></div>
              </div>
              <div style={styles.jug}>
                <div style={{ ...styles.water, height: `${(jug2Value / jug2Capacity) * 100}%` }}></div>
              </div>
              {numJugs === 3 && (
                <div style={styles.jug}>
                  <div style={{ ...styles.water, height: `${(jug3Value / jug3Capacity) * 100}%` }}></div>
                </div>
              )}
            </div>
            <div style={styles.jugDetails}>
              <div style={{ ...styles.jugLabel, color: '#1E90FF' }}>Jug 1</div>
              <div style={{ ...styles.jugValue, color: '#1E90FF' }}>{jug1Value}L</div>
              <div style={{ ...styles.jugLabel, color: '#32CD32' }}>Jug 2</div>
              <div style={{ ...styles.jugValue, color: '#32CD32' }}>{jug2Value}L</div>
              {numJugs === 3 && (
                <>
                  <div style={{ ...styles.jugLabel, color: '#FFD700' }}>Jug 3</div>
                  <div style={{ ...styles.jugValue, color: '#FFD700' }}>{jug3Value}L</div>
                </>
              )}
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button onClick={handleSolve} style={styles.solveButton}>Solve</button>
            <button onClick={() => setNumJugs(numJugs === 2 ? 3 : 2)} style={styles.toggleButton}>
              Switch to {numJugs === 2 ? '3 Jugs' : '2 Jugs'}
            </button>
            <button onClick={handleReset} style={styles.resetButton}>Reset</button>
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
                    {numJugs === 3 && <th style={styles.tableHeader}>Jug3 (L)</th>}
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>{step.step}</td>
                      <td style={styles.tableCell}>{step.jug1}</td>
                      <td style={styles.tableCell}>{step.jug2}</td>
                      {numJugs === 3 && <td style={styles.tableCell}>{step.jug3}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    width: '100vw',
    overflow: 'hidden',
  },
  heading: {
    marginBottom: '30px',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  input: {
    width: '120px',
    padding: '8px',
    margin: '10px',
    fontSize: '0.9rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  solveButton: {
    padding: '8px 16px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  toggleButton: {
    padding: '8px 16px',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    marginLeft: '10px',
  },
  resetButton: {
    padding: '8px 16px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    marginLeft: '10px',
  },
  jugSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  jugContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  jug: {
    position: 'relative',
    width: '150px',
    height: '300px',
    backgroundColor: '#d3d3d3',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    transform: 'perspective(1000px) rotateX(10deg)',
  },
  water: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#4fa3f7',
    borderRadius: '8px',
    transition: 'height 0.3s ease-in-out',
  },
  jugDetails: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '10px',
  },
  jugLabel: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  jugValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  stepsSection: {
    display: 'flex',
    justifyContent: 'center',
    width: '30%',
  },
  stepsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  },
  stepsHeading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  stepsContent: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  stepsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '1.2rem',
  },
  tableHeader: {
    padding: '12px',
    backgroundColor: '#4caf50',
    color: 'white',
    borderBottom: '2px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '12px',
    textAlign: 'center',
  },
};
