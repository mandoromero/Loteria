import React from 'react';
import { useSelector } from 'react-redux';

export default function WinningCombinations({ selected = [] }) {
  // ✅ Get global claimed categories directly from Redux:
  const claimedCategories = useSelector((state) => state.loteria.claimedCategories);

  // ✅ These are the win checks:
  const winningChecks = {
    row: (selected) =>
      [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]].some(row =>
        row.every(i => selected.includes(i))
      ),
    column: (selected) =>
      [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]].some(col =>
        col.every(i => selected.includes(i))
      ),
    diagonal: (selected) =>
      [[0, 5, 10, 15], [3, 6, 9, 12]].some(diag =>
        diag.every(i => selected.includes(i))
      ),
    xShape: (selected) =>
      [0, 5, 10, 15].every(i => selected.includes(i)) &&
      [3, 6, 9, 12].every(i => selected.includes(i)),
    corners: (selected) =>
      [0, 3, 12, 15].every(i => selected.includes(i)),
    center: (selected) =>
      [5, 6, 9, 10].every(i => selected.includes(i)),
    fullCard: (selected) => selected.length === 16,
  };

  // ✅ Only show win combos that:
  // - This card currently has
  // - AND have not been claimed yet
  const possibleWins = Object.entries(winningChecks)
    .filter(([key, check]) => !claimedCategories.includes(key) && check(selected))
    .map(([key]) => key);

  return (
    <div className="winning-combos">
      <h4>Possible Wins:</h4>
      <ul>
        {possibleWins.length === 0 && (
          <li className="inactive">No new wins yet</li>
        )}
        {possibleWins.map((w) => (
          <li key={w} className="active">
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
