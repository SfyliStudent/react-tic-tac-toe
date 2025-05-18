import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Status from "./components/Status";
import History from "./components/History";

// Type pour une case : "X", "O" ou vide
type Player = "X" | "O" | null;

export default function Game() {
  // Historique des plateaux (chaque plateau = tableau de 9 cases)
  const [history, setHistory] = useState<Player[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // indice du coup actuel
  const currentSquares = history[currentMove]; // plateau courant

  const xIsNext = currentMove % 2 === 0; // X commence, puis alterne
  const winner = calculateWinner(currentSquares);

  const isDraw = currentSquares.every((square) => square !== null) && !winner;

  const resetGame = () => {
    setHistory([Array(9).fill(null)]); // réinitialiser l'historique
    setCurrentMove(0); // réinitialiser le coup actuel
  };
  // Fonction pour rejouer
  const replay = () => {
    resetGame();
  };

  // Fonction appelée quand on clique sur une case
  function handlePlay(index: number) {
    if (currentSquares[index] || winner) return; // si déjà rempli ou gagnant, on ignore

    const nextSquares = [...currentSquares];
    nextSquares[index] = xIsNext ? "X" : "O";

    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, nextSquares]);
    setCurrentMove(newHistory.length);
  }

  // Revenir à un coup précédent
  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  return (
    <div className="game">
      <Status
        winner={winner}
        nextPlayer={xIsNext ? "X" : "O"}
        isDraw={isDraw}
      />
      <Board squares={currentSquares} onClick={handlePlay} />
      <History history={history} onJumpTo={jumpTo} />
      {history.length > 1 && ( // Rendu conditionnel du bouton Rejouer
        <button onClick={resetGame}>Rejouer</button>
      )}
    </div>
  );
}

// Fonction pour vérifier s'il y a un gagnant
function calculateWinner(squares: Player[]): Player {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
