export default function checkWinningConditions(selected = [], claimedCategories = []) {
  console.log(selected)
  const winningChecks = {
    row: (selected) => [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]].some(row =>
      row.every(i => selected.selected.includes(i))
    ),
    column: (selected) => [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]].some(col =>
      col.every(i => selected.selected.includes(i))
    ),
    diagonal: (selected) => [[0, 5, 10, 15], [3, 6, 9, 12]].some(diag =>
      diag.every(i => selected.selected.includes(i))
    ),
    xShape: (selected) => [0, 5, 10, 15].every(i => selected.selected.includes(i)) &&
                          [3, 6, 9, 12].every(i => selected.selected.includes(i)),
    corners: (selected) => [0, 3, 12, 15].every(i => selected.selected.includes(i)),
    center: (selected) => [5, 6, 9, 10].every(i => selected.selected.includes(i)),
    fullCard: (selected) => selected.length === 16,
  };

  for (const [category, check] of Object.entries(winningChecks)) {
    if (!claimedCategories.includes(category) && check(selected)) {
      return { isWinner: true, category };
    }
  }

  return { isWinner: false, category: null };
}
