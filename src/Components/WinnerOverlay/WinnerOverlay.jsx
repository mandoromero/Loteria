import React, { useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import "../WinnerOverlay/WinnerOverlay.css"

export default function WinnerOverlay({ isWinner, category  }) {
  const [width, height] = useWindowSize();
  const dialogRef = useRef(null);

    useEffect (() => {
      if (isWinner) {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      } 
    }, [isWinner]);
  

  return (
    <dialog ref="dialogRef" className="winner-dialog">
      <div className="winner-overlay">
        <Confetti width={width} height={height} />
        <h1 className="ref-text">¡Lotería!</h1>
      </div>
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
    </dialog>
  );
}
