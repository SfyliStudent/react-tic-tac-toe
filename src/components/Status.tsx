// Affiche les messages "tour de X" ou "tour de O" "le gagnant est X" ou "le gagnant est O"
type StatusProps = {
  winner: "X" | "O" | null;
  nextPlayer: "X" | "O";
  isDraw: boolean; //is draw veut dire est ce que la partie est nulle
};

export default function Status({ winner, nextPlayer, isDraw }: StatusProps) {
  let message;

  if (winner) {
    message = `🏆 Le joueur ${winner} a gagné !`;
  } else if (isDraw) {
    message = `🤝 Match nul !`;
  } else {
    message = `🎯 Au tour du joueur ${nextPlayer}`;
  }

  return <div className="status">{message}</div>;
}
