import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import "../WinnerOverlay/WinnerOverlay.css"

export default function WinnerOverlay({ isWinner }) {
  const [width, height] = useWindowSize();

  if (!isWinner) return null;

  return (
    <div className="winner-overlay">
      <Confetti width={width} height={height} />
      <h1 className="winner-text">¡Lotería!</h1>
    </div>
  );
}
