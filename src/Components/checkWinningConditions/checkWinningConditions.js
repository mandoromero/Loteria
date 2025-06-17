export default function checkWinningConditions({ selected = [], claimedCategories = [] }) {
  const winningChecks = {
    "row-0": (sel) => [0, 1, 2, 3].every(i => sel.includes(i)),
    "row-1": (sel) => [4, 5, 6, 7].every(i => sel.includes(i)),
    "row-2": (sel) => [8, 9, 10, 11].every(i => sel.includes(i)),
    "row-3": (sel) => [12, 13, 14, 15].every(i => sel.includes(i)),

    "col-0": (sel) => [0, 4, 8, 12].every(i => sel.includes(i)),
    "col-1": (sel) => [1, 5, 9, 13].every(i => sel.includes(i)),
    "col-2": (sel) => [2, 6, 10, 14].every(i => sel.includes(i)),
    "col-3": (sel) => [3, 7, 11, 15].every(i => sel.includes(i)),

    "diag-0": (sel) => [0, 5, 10, 15].every(i => sel.includes(i)),
    "diag-1": (sel) => [3, 6, 9, 12].every(i => sel.includes(i)),

    "xShape": (sel) =>
      [0, 5, 10, 15].every(i => sel.includes(i)) &&
      [3, 6, 9, 12].every(i => sel.includes(i)),

    "corners": (sel) => [0, 3, 12, 15].every(i => sel.includes(i)),
    "center": (sel) => [5, 6, 9, 10].every(i => sel.includes(i)),
    "fullCard": (sel) => sel.length === 16,
  };

  // Determine invalid prefixes based on claimed
  const typePrefix = (key) => {
    if (key.startsWith("row")) return "row";
    if (key.startsWith("col")) return "col";
    if (key.startsWith("diag")) return "diag";
    return key; // unique type (corners, xShape, etc)
  };

  const claimedTypes = new Set(claimedCategories.map(typePrefix));

  // Filter: valid and not blocked by same-type
  const categories = Object.entries(winningChecks)
    .filter(([key, check]) =>
      !claimedTypes.has(typePrefix(key)) && check(selected)
    )
    .map(([key]) => key);

  return {
    isWinner: categories.length > 0,
    categories,
  };
}
