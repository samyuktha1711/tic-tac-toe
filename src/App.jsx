import { useState } from "react";
import "./index.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else if (isDraw) {
    status = "Game is a Draw!";
  } else {
    status = "Next Player: " + (isXNext ? "X" : "O");
  }

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const nextBoard = board.slice();
    nextBoard[index] = isXNext ? "X" : "O";

    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game-container">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="status">{status}</div>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

