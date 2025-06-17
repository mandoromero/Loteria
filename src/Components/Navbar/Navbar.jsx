import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./Navbar.css";


export default function Navbar({
  onPauseToggle,
  isPaused,
  onReset,
  onStartGame,
  currentGame,
  toggleHistory,
  soundOn,
  toggleSound,
  gameBoardCount,
  setGameBoardCount,
}) {

  const handleReset = () => {
    onReset();
  };

  const handleStart = () => {
    const count = Number(gameBoardCount);
    if (!count) {
      alert("Please select how many game boards you want to  play ( 1-4)");
      return;
    }
    onStartGame(count);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex w-100 justify-content-between align-items-center">
        <h1 className="navbar-brand m-0">La Loteria</h1>

        <div className="btn-container d-flex align-items-center gap-2">
          <select
            value={gameBoardCount}
            onChange={(e) => setGameBoardCount(e.target.value)}
            className="form-select"
            style={{ maxWidth: "200px" }}
            disabled={currentGame}
          >
            <option value="">Select Game Boards</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} Board{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          {!currentGame ? (
            <button className="start" onClick={handleStart}>
              Start Game
            </button>
          ) : (
            <>
              <button className="pause" onClick={onPauseToggle}>
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button className="reset" onClick={handleReset}>
                Reset
              </button>
            </>
          )}

          <button className="sound" onClick={toggleSound}>
            Sound: {soundOn ? "On" : "Off"}
          </button>

          <button
            className="btn btn-info rules-history"
            onClick={toggleHistory}
          >
            Rules and History
          </button>
        </div>
      </div>
    </nav>
  );
}
