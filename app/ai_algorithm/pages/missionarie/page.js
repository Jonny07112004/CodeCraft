'use client'
import React, { useState } from 'react';

const solutionSteps = [
  { left: [3, 3], boat: [0, 0], right: [0, 0] },
  { left: [2, 2], boat: [1, 1], right: [1, 1] },
  { left: [3, 2], boat: [0, 1], right: [0, 1] },
  { left: [3, 0], boat: [0, 2], right: [0, 3] },
  { left: [3, 1], boat: [0, 1], right: [0, 2] },
  { left: [1, 1], boat: [2, 0], right: [2, 2] },
  { left: [2, 2], boat: [1, 0], right: [1, 2] },
  { left: [0, 2], boat: [2, 0], right: [3, 2] },
  { left: [0, 3], boat: [0, 1], right: [3, 1] },
  { left: [0, 1], boat: [0, 2], right: [3, 3] },
  { left: [0, 0], boat: [0, 0], right: [3, 3] }, // Final state
];

const MissionariesCannibals = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < solutionSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Missionaries & Cannibals Problem</h1>
      <div style={styles.layout}>
        <div style={styles.rulesContainer}>
          <h2>Rules & Goal</h2>
          <p>1. The boat can carry at most two people.</p>
          <p>2. Cannibals must never outnumber missionaries on either side.</p>
          <p>3. The goal is to move all safely to the right side.</p>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.leftSide}>
            <h2>Left Side</h2>
            <div style={styles.iconContainer}>
              {'🧑'.repeat(solutionSteps[step].left[0])} {'👹'.repeat(solutionSteps[step].left[1])}
            </div>
          </div>

          <div style={styles.river}>
            <h2 style={styles.riverHeading}>River</h2>
            <div
              style={{
                ...styles.boat,
                transform: `translateX(${step % 2 === 0 ? '0%' : '100%'})`,
              }}
            >
              {'🧑'.repeat(solutionSteps[step].boat[0])} {'👹'.repeat(solutionSteps[step].boat[1])}
            </div>
          </div>

          <div style={styles.rightSide}>
            <h2>Right Side</h2>
            <div style={styles.iconContainer}>
              {'🧑'.repeat(solutionSteps[step].right[0])} {'👹'.repeat(solutionSteps[step].right[1])}
            </div>
          </div>
        </div>

        <div style={styles.stepsContainer}>
          <h2>Steps</h2>
          <div style={styles.stepsScroll}>
            {solutionSteps.map((s, index) => (
              <p key={index} style={index === step ? styles.highlightedStep : {}}>
                Step {index + 1}: Move {s.boat[0]} Missionaries and {s.boat[1]} Cannibals.
              </p>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.controls}>
        <button style={styles.button} onClick={prevStep} disabled={step === 0}>Previous</button>
        <button style={styles.button} onClick={nextStep} disabled={step === solutionSteps.length - 1}>Next</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#121212', // Dark background
    padding: '20px',
    color: '#ffffff',
    overflow: 'hidden',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#ffffff', // White text
  },
  layout: {
    display: 'flex',
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  rulesContainer: {
    width: '20%',
    height: '100%',
    backgroundColor: '#1e1e1e', // Dark gray
    padding: '20px',
    borderRadius: '10px',
    color: '#ffffff', // White text
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainContent: {
    display: 'flex',
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSide: {
    width: '30%',
    height: '400px',
    backgroundColor: '#2e7d32', // Dark green
    padding: '20px',
    borderRadius: '10px',
    color: '#ffffff', // White text
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    marginTop: '10px',
  },
  river: {
    width: '40%',
    height: '400px',
    backgroundColor: '#1e88e5', // Dark blue
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    padding: '20px',
  },
  riverHeading: {
    marginBottom: '20px',
    color: '#ffffff', // White text
  },
  boat: {
    width: '100px',
    height: '50px',
    backgroundColor: '#ffb74d', // Orange
    position: 'absolute',
    transition: 'transform 1s ease-in-out',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    width: '30%',
    height: '400px',
    backgroundColor: '#2e7d32', // Dark green
    padding: '20px',
    borderRadius: '10px',
    color: '#ffffff', // White text
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsContainer: {
    width: '20%',
    height: '100%',
    backgroundColor: '#1e1e1e', // Dark gray
    padding: '20px',
    borderRadius: '10px',
    color: '#ffffff', // White text
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  stepsScroll: {
    overflowY: 'auto',
    maxHeight: '300px',
  },
  highlightedStep: {
    fontWeight: 'bold',
    color: '#ff5722', // Orange
  },
  controls: {
    marginTop: '20px', // Adjust position to be a little higher
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '12px',
    width: '100px',
    backgroundColor: '#ff5722', // Orange
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
    transition: 'background 0.3s',
  },
};

export default MissionariesCannibals;
