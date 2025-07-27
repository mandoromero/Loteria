import React, { useState } from "react";
import Header from "./Components/Header/Header";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import "../src/App.css";
import History from "./Components/History/History.jsx";
import WinnerOverlay from "./Components/WinnerOverlay/WinnerOverlay.jsx";

function App() {
  const [currentGame, setCurrentGame] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0); // used to reset LoteriaCard
  const [showHistory, setShowHistory] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [gameBoardCount, setGameBoardCount] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [winnerCategory, setWinnerCategory] = useState("")


  const startGame = (count) => {
    if (!count || count < 1 || count > 4) {
      alert("Please select 1-4 game boards.");
      return
    }
    setCurrentGame(true);
    setIsPaused(false);
  }

  const handlePauseToggle = () => setIsPaused((prev) => !prev);

  const handleReset = () => {
    setCurrentGame(false);
    setIsPaused(false);
    //setResetTrigger(resetTrigger+ 1)
    setResetTrigger((prev) => prev + 1); // triggers fresh deck in LoteriaCard
  };

  const toggleHistory = () => setShowHistory((prev) => !prev);
  const toggleSound = () => setSoundOn((prev) => !prev);
  
  const handleWin = (category) => {                     
    setIsWinner(true);
    setIsPaused(true);
    setSoundOn(false);
    setWinnerCategory(category);

    setTimeout(() => {
      setIsWinner(false);
      setIsPaused(false);
      setSoundOn(true)
      setWinnerCategory("");
    }, 8000);
  };

  return (
    <>
      <Navbar
        onPauseToggle={handlePauseToggle}
        isPaused={isPaused}
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
          <Header 
            isPaused={isPaused} 
            resetTrigger={resetTrigger} 
            soundOn={soundOn}
          />
          <div className="gameboard-container">
              {Array.from({ length: gameBoardCount }, (_, index) => (
                <GameBoard 
                  key={index}
                  onWin={handleWin}  
                />
              ))}
          </div>
        </div>
      )}

      {showHistory && <History />}
      <WinnerOverlay isWinner={isWinner} category={winnerCategory} />
    </>
  );
}

export default App;