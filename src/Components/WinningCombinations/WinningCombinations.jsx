export function checkWinningConditions(selected, claimedCategories = []) {
  const winningChecks = {
    row: [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ],
    column: [
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
    ],
    diagonal: [
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ],
    xShape: [
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ],
    corners: [
      [0, 3, 12, 15],
    ],
    center: [
      [5, 6, 9, 10],
    ],
    fullCard: [
      Array.from({ length: 16 }, (_, i) => i),
    ],
  };

  for (const [category, patterns] of Object.entries(winningChecks)) {
    if (claimedCategories.includes(category)) continue;

    if (category === "xShape") {
      const [d1, d2] = patterns;
      if (d1.every(i => selected.includes(i)) && d2.every(i => selected.includes(i))) {
        return { isWinner: true, category };
      }
    } else {
      if (patterns.some(p => p.every(i => selected.includes(i)))) {
        return { isWinner: true, category };
      }
    }
  }

  return { isWinner: false, category: null };
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
