// Les cases
type SquareProps = {
  // les props du composant Square
  value: string | null; // ce qui s'affiche dans la case ("X", "O", ou rien)
  onClick: () => void; // la fonction à exécuter quand on clique sur la case
};

export default function Square({ value, onClick }: SquareProps) {
  return (
    <button className="cell" onClick={onClick}>
      {value}
    </button>
  );
}
