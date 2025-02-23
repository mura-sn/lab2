import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [isComputerMode, setIsComputerMode] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = useCallback((i) => {
    if (board[i] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    const winner = calculateWinner(newBoard);
    if (winner) {
      if (winner === 'X') {
        setScoreX(s => s + 1);
      } else {
        setScoreO(s => s + 1);
      }
    }
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }, [board, isXNext]);

  useEffect(() => {
    if (isComputerMode && !isXNext && !calculateWinner(board)) {
      const availableMoves = board.map((val, idx) => val === null ? idx : null)
        .filter(val => val !== null);
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      setTimeout(() => {
        handleClick(randomMove);
      }, 500);
    }
  }, [board, isXNext, isComputerMode, handleClick]);

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}`
    : board.every(square => square) 
    ? 'Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const renderSquare = (i) => {
    return (
      <button 
        className="square" 
        onClick={() => handleClick(i)}
        data-value={board[i]}
      >
        {board[i]}
      </button>
    );
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <button 
        className={`mode-toggle ${isComputerMode ? 'active' : ''}`}
        onClick={() => {
          setIsComputerMode(!isComputerMode);
          setBoard(Array(9).fill(null));
          setIsXNext(true);
        }}
      >
        {isComputerMode ? 'Switch to 2 Players' : 'Play vs Computer'}
      </button>
      <div className="game-container">
        <div className="score-x">Player X: {scoreX}</div>
        <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        </div>
        <div className="score-o">Player O: {scoreO}</div>
      </div>
      <div className="status">{status}</div>
      <div className="button-container">
        <button 
          className="reset" 
          onClick={() => {
            setBoard(Array(9).fill(null));
            setIsXNext(true);
          }}
        >
          Reset Board
        </button>
        <button
          className="reset-scores"
          onClick={() => {
            setScoreX(0);
            setScoreO(0);
          }}
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
}

export default App;
