import React, { useState } from "react";
import Header from "./Components/Header/Header";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import "../src/App.css";
import History from "./Components/History/History.jsx";

function App() {
  const [currentGame, setCurrentGame] = useState(false);
  const [paused, setPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0); // used to reset LoteriaCard
  const [showHistory, setShowHistory] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [gameBoardCount, setGameBoardCount] = useState("");

  const startGame = (count) => {
    if (!count || count < 1 || count > 4) {
      alert("Please select 1-4 game boards.");
      return
    }
    setCurrentGame(true);
    setPaused(false);
  }

  const handlePauseToggle = () => {
    setPaused(!paused);
  };

  const handleReset = () => {
    setCurrentGame(false);
    setPaused(false);
    //setResetTrigger(resetTrigger+ 1)
    setResetTrigger((prev) => prev + 1); // triggers fresh deck in LoteriaCard
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const toggleSound = () => {
    setSoundOn(!soundOn);
  };

  return (
    <>
      <Navbar
        onPauseToggle={handlePauseToggle}
        isPaused={paused}
        onReset={handleReset}
        onStartGame={startGame}
        currentGame={currentGame}
        toggleHistory={toggleHistory}
        soundOn={soundOn}
        toggleSound={toggleSound}
        gameBoardCount={gameBoardCount}
        setGameBoardCount={setGameBoardCount}
      />

      {currentGame && (
        <div>
          <Header paused={paused} resetTrigger={resetTrigger} />
          <div className="gameboard-container">
              {Array.from({ length: gameBoardCount }, (_, index) => (
                <GameBoard key={index} />
              ))}
          </div>
        </div>
      )}

      {showHistory && <History />}
    </>
  );
}

export default App;

