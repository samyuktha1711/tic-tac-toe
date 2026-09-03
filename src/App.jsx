import { useState } from "react";
import "./index.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  let status;

  if (winner) {
    status = "Winner: " + winner;
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
    <div className="flex flex-col items-center font-sans mt-10 min-h-screen">

      <h1 className="mb-[10px] text-[36px] font-bold">
        Tic-Tac-Toe
      </h1>

      <div className="text-[20px] font-bold mb-[20px]">
        {status}
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-[8px]">

        {board.map((value, index) => (
          <button
            key={index}
            className="w-[100px] h-[100px] bg-white border-2 border-[#333] text-[32px] font-bold cursor-pointer rounded-[8px] transition-[background,transform] duration-200 hover:bg-[#f0f0f0] hover:scale-[1.03]"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}

      </div>

      <button
        className="mt-[25px] px-[25px] py-[10px] text-[16px] font-bold bg-[#007bff] text-white border-0 rounded-[6px] cursor-pointer transition-[background,transform] duration-200 hover:bg-[#0056b3] hover:scale-[1.05]"
        onClick={resetGame}
      >
        Reset Game
      </button>

    </div>
  );
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}