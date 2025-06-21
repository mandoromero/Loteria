import { WinningChecks, typePrefix } from "../WinningChecks/WinningChecks.jsx";

/**
 * @param {Object} options
 * @param {number[]} selected
 * @param {string[]} globalClaimedCategories
 */
export default function checkWinningConditions({ selected = [], globalClaimedCategories = [] }) {
  const claimedPrefixes = new Set(globalClaimedCategories.map(typePrefix));
  const claimedExact = new Set(globalClaimedCategories);

  const validCategories = Object.entries(WinningChecks)
    .filter(([key, check]) => {
      const prefix = typePrefix(key);
      const blocked = prefix === key 
        ? claimedExact.has(key) // unique win type (xShape, etc)
        : claimedPrefixes.has(prefix); // row, col, diag: block whole type
      return !blocked && check(selected);
    })
    .map(([key]) => key);

  return {
    isWinner: validCategories.length > 0,
    categories: validCategories,
  };
}
