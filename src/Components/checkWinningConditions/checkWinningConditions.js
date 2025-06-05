export default function checkWinningConditions(selected = [], claimedCategories = []) {
  const winningChecks = {
    "row-0": (sel) => [0, 1, 2, 3].every(i => sel.selected.includes(i)),
    "row-1": (sel) => [4, 5, 6, 7].every(i => sel.selected.includes(i)),
    "row-2": (sel) => [8, 9, 10, 11].every(i => sel.selected.includes(i)),
    "row-3": (sel) => [12, 13, 14, 15].every(i => sel.selected.includes(i)),

    "col-0": (sel) => [0, 4, 8, 12].every(i => sel.selected.includes(i)),
    "col-1": (sel) => [1, 5, 9, 13].every(i => sel.selected.includes(i)),
    "col-2": (sel) => [2, 6, 10, 14].every(i => sel.selected.includes(i)),
    "col-3": (sel) => [3, 7, 11, 15].every(i => sel.selected.includes(i)),

    "diag-0": (sel) => [0, 5, 10, 15].every(i => sel.selected.includes(i)),
    "diag-1": (sel) => [3, 6, 9, 12].every(i => sel.selected.includes(i)),

    "xShape": (sel) =>
      [0, 5, 10, 15].every(i => sel.selected.includes(i)) &&
      [3, 6, 9, 12].every(i => sel.selected.includes(i)),

    "corners": (sel) => [0, 3, 12, 15].every(i => sel.selected.includes(i)),
    "center": (sel) => [5, 6, 9, 10].every(i => sel.selected.includes(i)),
    "fullCard": (sel) => sel.selected.length === 16,
  };

  for (const [category, check] of Object.entries(winningChecks)) {
    const isMatch = check(selected);
    if (isMatch && !claimedCategories.includes(category)) {
      return { isWinner: true, category };
    }
  }

  return { isWinner: false, category: null };
}
