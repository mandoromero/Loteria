import React, { useState, useRef } from "react";
import Header from "./Components/Header/Header";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import ControlButtons from "./Components/ControlButtons/ControlButtons.jsx";
import "../src/App.css";

function App() {
  const [currentGame, setCurrentGame] = useState(false);
  const [paused, setPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0); // used to reset LoteriaCard

  const startGame = (e) => {
    e.preventDefault();
    setCurrentGame(true);
  };

  const handlePauseToggle = () => {
    setPaused(prev => !prev);
  };

  const handleReset = () => {
    setCurrentGame(false);
    setPaused(false);
    setResetTrigger(prev => prev + 1); // triggers fresh deck in LoteriaCard
  };

  return (
    <>
      {currentGame ? (
        <div>
          <Header paused={paused} resetTrigger={resetTrigger} />
          <ControlButtons onPauseToggle={handlePauseToggle} isPaused={paused} onReset={handleReset} />
          <div className="gameboard-container">
            <GameBoard />
            <GameBoard />
            <GameBoard />
          </div>
        </div>
      ) : (
        <button className="start" onClick={startGame}>
          Start Game
        </button>
      )}
    </>
  );
}

export default App;
