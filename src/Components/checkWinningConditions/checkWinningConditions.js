export default function checkWinningConditions({ selected = [], claimedCategories = [] }) {
  // Define groups by win type
  const groups = {
    row: ["row-0", "row-1", "row-2", "row-3"],
    col: ["col-0", "col-1", "col-2", "col-3"],
    diag: ["diag-0", "diag-1"],
    x: ["xShape"],
    corners: ["corners"],
    center: ["center"],
    full: ["fullCard"],
  };

  // Define how to check each condition
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

  const results = [];

  // Loop by win type groups: row, col, diag, etc.
  for (const [groupType, categoryList] of Object.entries(groups)) {
    // If ANY category in this group is already claimed, skip it for everyone
    if (categoryList.some(cat => claimedCategories.includes(cat))) continue;

    for (const category of categoryList) {
      const check = winningChecks[category];
      if (check && check({ selected })) {
        results.push(category);
        break; // One win per group
      }
    }
  }

  return {
    isWinner: results.length > 0,
    categories: results,
  };
}
