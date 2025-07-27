import React from "react";
import ReactDOM from "react-dom/client";
import { Provider,  useSelector, useDispatch } from "react-redux";
import { togglePaused } from "../../redux/LoteriaSlice.js";
import "./Navbar.css";


export default function Navbar({
  onReset,
  onStartGame,
  currentGame,
  toggleHistory,
  soundOn,
  toggleSound,
  gameBoardCount,
  setGameBoardCount,
}) {
  const dispatch =  useDispatch();
  const isPaused = useSelector((state) => state.loteria.isPaused);

  const handleStart = () => {
    const count = Number(gameBoardCount);
    if (!count) {
      alert("Please select how many game boards you want to  play ( 1-4)");
      return;
    }
    onStartGame(count);
  }

  const handlePausedToggle = ()=> {
    dispatch(togglePaused());
  };

  const handleReset = ()=> {
    onReset();
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navebar-dark">
      <div className="container-fluid d-flex w-100 justify-content-between align-items-center">
        <h1 className="navbar-brand m-0">La Loteria</h1>

        <div className="btn-container">
          <div className="select-container">
            <label htmlFor="form-select">Select Game Boards</label>
            <select
              value={gameBoardCount}
              onChange={(e) => setGameBoardCount(e.target.value)}
              id="form-select"
              style={{ maxWidth: "200px" }}
              disabled={currentGame}
            >
                {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} Board{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          </div>
          

          {!currentGame ? (
            <button className="start" onClick={handleStart}>
              Start Game
            </button>
          ) : (
            <>
              <button className="pause" onClick={handlePausedToggle}>
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
