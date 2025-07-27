import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import "../WinnerOverlay/WinnerOverlay.css";
import { useDispatch } from 'react-redux';
import { resetGame } from '../../redux/LoteriaSlice';

export default function WinnerOverlay({ isWinner, category, onReset }) {
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();

  if (!isWinner) return null;

  const isGameOver = category === 'Full Card';

  const handleReset = () => {
    dispatch(resetGame());
    if (onReset) onReset();
  };

  return (
    <div className="winner-overlay-wrapper">
      <div className="winner-overlay">
        <Confetti width={width} height={height} />
        <h1 className="ref-text">¡Lotería!</h1>
        <div className="winner-details">
          <h3>{isGameOver ? 'Game Over' : 'Winner!!'}</h3>
          {category ? (
            <ul>
              <li>{category}</li>
            </ul>
          ) : (
            <p>No winning combination yet.</p>
          )}
          {isGameOver && (
            <button className="reset-btn" onClick={handleReset}>
              Reset Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
