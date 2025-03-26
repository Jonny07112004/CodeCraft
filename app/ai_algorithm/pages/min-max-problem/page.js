"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [aiLogic, setAiLogic] = useState([]);

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => makeAIMove(), 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner]);

  const checkWinner = (currentBoard) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return currentBoard.every(cell => cell !== null) ? 'Tie' : null;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = checkWinner(currentBoard);
    if (result) {
      if (result === 'X') return -10 + depth;
      if (result === 'O') return 10 - depth;
      if (result === 'Tie') return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = 'O';
          let score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = 'X';
          let score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const makeAIMove = () => {
    setAiLogic([
      '🤖 AI is planning its move...',
      'Looking at all possible moves to find the best one'
    ]);
    
    let bestScore = -Infinity;
    let bestMove;
    const newBoard = [...board];
    const moveEvaluations = [];

    for (let i = 0; i < 9; i++) {
      if (!newBoard[i]) {
        newBoard[i] = 'O';
        let score = minimax(newBoard, 0, false);
        newBoard[i] = null;
        
        let evaluation = score > 0 ? 'Good chance to win' :
                        score === 0 ? 'Likely a tie' :
                        'Trying to block you';
        moveEvaluations.push(`Position ${i}: ${evaluation} (Score: ${score})`);
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    setAiLogic([
      '🤖 AI Thinking Process:',
      'Checked all possible moves:',
      ...moveEvaluations,
      `🎯 Best move is position ${bestMove} with score ${bestScore}`,
      'This move gives me the best outcome!'
    ]);

    newBoard[bestMove] = 'O';
    setBoard(newBoard);
    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      setGameOver(true);
    }
    setIsPlayerTurn(true);
  };

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || winner) return;
    setAiLogic(['Waiting for your move...', 'AI will respond next']);
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      setGameOver(true);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setGameOver(false);
    setAiLogic(['Game reset!', 'You start with X']);
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #1a1a1a;
          font-family: Arial, sans-serif;
          color: #fff;
          overflow: hidden;
        }

        .main-container {
          height: 100vh;
          padding: 20px;
          background: #1a1a1a;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .title-container {
          background: #2d2d2d;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          margin-top: 40px;
          margin-bottom: 20px;
          text-align: center;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .game-title {
          color: #fff;
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
                      0 0 20px rgba(255, 255, 255, 0.2),
                      0 0 30px rgba(255, 255, 255, 0.1);
          margin: 0;
        }

        .content-container {
          display: flex;
          flex: 1;
          gap: 20px;
          height: calc(100% - 160px);
          box-sizing: border-box;
          overflow: hidden;
        }

        .steps-container {
          width: 350px;
          padding: 20px;
          background: #2d2d2d;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
        }

        .game-container {
          flex: 1;
          padding: 20px;
          background: #2d2d2d;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          box-sizing: border-box;
          max-width: calc(100vw - 410px);
          overflow: hidden;
        }

        h2 {
          color: #fff;
          font-size: 1.5rem;
          margin: 0 0 15px 0;
          text-align: center;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }

        .steps-container ul {
          list-style: none;
          padding: 0;
          font-size: 1rem;
          color: #ddd;
          line-height: 1.6;
          margin: 0;
          flex: 1;
          overflow-y: auto;
        }

        .status {
          margin: 10px 0;
          font-size: 1.1rem;
          color: #fff;
          background: #404040;
          padding: 10px 20px;
          border-radius: 5px;
          text-align: center;
          width: 100%;
          max-width: 280px;
          box-sizing: border-box;
        }

        .board {
          display: grid;
          grid-template-columns: repeat(3, 80px);
          grid-gap: 5px;
          background: #333;
          padding: 5px;
          border-radius: 10px;
          margin: 0 auto;
        }

        .cell {
          width: 80px;
          height: 80px;
          background: #404040;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          border-radius: 5px;
          transition: all 0.3s;
          font-weight: bold;
          color: #fff;
        }

        .cell:hover:not(:disabled) {
          background: #505050;
          transform: scale(1.05);
        }

        .cell:disabled {
          cursor: not-allowed;
          color: #fff;
        }

        .reset {
          margin-top: 15px;
          padding: 10px 20px;
          font-size: 1rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%; /* Full width within container */
          max-width: 200px; /* Limit width */
        }

        .reset:hover {
          background: #0051bb;
          transform: scale(1.05);
        }
      `}</style>

      <div className="main-container">
        <div className="title-container">
          <div className="game-title">
            TIC TAC TOE Problem<br/>Using Min-Max Algorithm
          </div>
        </div>

        <div className="content-container">
          <div className="steps-container">
            <h2>AI Thinking Steps</h2>
            <ul>
              {aiLogic.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
              {aiLogic.length === 0 && <li>Waiting for the game to start...</li>}
            </ul>
            <button className="reset" onClick={resetGame}>
              Reset Game
            </button>
          </div>

          <div className="game-container">
            <h2>Game Board</h2>
            <div className="status">
              {winner ? (
                winner === 'Tie' ? 
                  'Game ended in a Tie! 🤝' : 
                  `${winner === 'X' ? 'You Win! 🎉' : 'AI Wins! 🤖'}`
              ) : (
                isPlayerTurn ? 
                  "Your Turn (X) 👈" : 
                  "AI's Turn (O) 🤖"
              )}
            </div>
            <div className="board">
              {board.map((cell, index) => (
                <button
                  key={index}
                  className="cell"
                  onClick={() => handleClick(index)}
                  disabled={!isPlayerTurn || cell || winner}
                >
                  {cell}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}