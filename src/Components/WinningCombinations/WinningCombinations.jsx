export function checkWinningConditions(selected) {
  const winningChecks = {
    row: (selected) => {
      const rows = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ];
      return rows.some(row => row.every(i => selected.includes(i)));
    },

    column: (selected) => {
      const columns = [
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15]
      ];
      return columns.some(col => col.every(i => selected.includes(i)));
    },

    diagonal: (selected) => {
      const diag1 = [0, 5, 10, 15];
      const diag2 = [3, 6, 9, 12];
      return diag1.every(i => selected.includes(i)) || diag2.every(i => selected.includes(i));
    },

    xShape: (selected) => {
      const diag1 = [0, 5, 10, 15];
      const diag2 = [3, 6, 9, 12];
      return diag1.every(i => selected.includes(i)) && diag2.every(i => selected.includes(i));
    },

    corners: (selected) => {
      const corners = [0, 3, 12, 15];
      return corners.every(i => selected.includes(i));
    },

    center: (selected) => {
      const centerFour = [5, 6, 9, 10];
      return centerFour.every(i => selected.includes(i));
    },

    fullCard: (selected) => selected.length === 16,
  };

  return Object.values(winningChecks).some(check => check(selected));
}

export default function WinningCombinations({ selected }) {
  const winningChecks = {
    row: (selected) => {
      const rows = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ];
      return rows.some(row => row.every(i => selected.includes(i)));
    },

    column: (selected) => {
      const columns = [
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15]
      ];
      return columns.some(col => col.every(i => selected.includes(i)));
    },

    diagonal: (selected) => {
      const diag1 = [0, 5, 10, 15];
      const diag2 = [3, 6, 9, 12];
      return diag1.every(i => selected.includes(i)) || diag2.every(i => selected.includes(i));
    },

    xShape: (selected) => {
      const diag1 = [0, 5, 10, 15];
      const diag2 = [3, 6, 9, 12];
      return diag1.every(i => selected.includes(i)) && diag2.every(i => selected.includes(i));
    },

    corners: (selected) => {
      const corners = [0, 3, 12, 15];
      return corners.every(i => selected.includes(i));
    },

    center: (selected) => {
      const centerFour = [5, 6, 9, 10];
      return centerFour.every(i => selected.includes(i));
    },

    fullCard: (selected) => selected.length === 16,
  };

  const wins = Object.entries(winningChecks)
    .filter(([key, check]) => check(selected))
    .map(([key]) => key);

  return (
    <div>
      <h3>Winner!!</h3>
      {wins.length > 0 ? (
        <ul>
          {wins.map((win) => (
            <li key={win}>{win}</li>
          ))}
        </ul>
      ) : (
        <p>No winning combination, yet.</p>
      )}
    </div>
  );
}
