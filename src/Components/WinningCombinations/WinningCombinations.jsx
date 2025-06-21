import React from 'react';
import { useSelector } from 'react-redux';
import { WinningChecks, typePrefix } from './WinningChecks';

export default function WinningCombinations({ selected = [] }) {
  const claimedCategories = useSelector((state) => state.loteria.claimedCategories);

  const claimedPrefixes = new Set(claimedCategories.map(typePrefix));
  const claimedExact = new Set(claimedCategories);

  const possibleWins = Object.entries(WinningChecks)
    .filter(([key, check]) => {
      const prefix = typePrefix(key);
      const blocked = prefix === key
        ? claimedExact.has(key)
        : claimedPrefixes.has(prefix);
      return !blocked && check(selected);
    })
    .map(([key]) => key);

  return (
    <div className="winning-combos">
      <h4>Possible Wins:</h4>
      <ul>
        {possibleWins.length === 0 && (
          <li className="inactive">No new wins yet</li>
        )}
        {possibleWins.map((w) => (
          <li key={w} className="active">{w}</li>
        ))}
      </ul>
    </div>
  );
}
