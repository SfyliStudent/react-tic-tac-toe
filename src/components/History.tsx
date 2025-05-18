// Affiche l'historique des coups joués

type HistoryProps = {
  history: ("X" | "O" | null)[][];
  onJumpTo: (move: number) => void; // la fonction à exécuter quand on clique sur un coup
  // onJumpTo est une fonction qui prend un nombre en paramètre et ne retourne rien
};

export default function History({ history, onJumpTo }: HistoryProps) {
  return (
    <div className="history">
      <h2>Historique des coups</h2>
      <ul>
        {history.map((_, move) => {
          // Condition pour ne pas afficher "Revenir au début" si ce n'est que l'état initial
          if (move === 0 && history.length === 1) {
            return null; // Ne rend rien pour le coup 0 si l'historique n'a qu'un élément
          }

          return (
            <li key={move}>
              <button onClick={() => onJumpTo(move)}>
                {move === 0 ? "Revenir au début" : `Aller au coup #${move}`}
                {/* Si
                  move est égal à 0, on affiche "Revenir au début", sinon on affiche
                  "Aller au coup #x" où x est le numéro du coup */}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
