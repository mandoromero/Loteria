import React from 'react';
// import Confetti from 'react-confetti';
import "../WinnerOverlay/WinnerOverlay.css"

export default function WinnerOverlay({ isWinner }) {
    if (!isWinner) return null;

    return (
        <div className="winner-overlay">
            {/* <Confetti /> */}
            <h1 className="winner-text">Winner!</h1>
        </div>
    )
}