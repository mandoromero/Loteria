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
    setResetTrigger((prev) => prev + 1); // triggers fresh deck in LoteriaCard
  };
  
  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  }
  
  return (
    <>
      <Navbar 
        onPauseToggle={handlePauseToggle}
        isPaused={paused}
        onReset={handleReset}
        onStartGame={startGame}
        currentGame={currentGame}
      />  
      
      {currentGame && (
        <>
          <Header paused={paused} resetTrigger={resetTrigger} />
          <div className="gameboard-container">
            <GameBoard />
            <GameBoard />
            <GameBoard />
          </div>
        </>
      )}  
      
      {showHistory && <History />}
    </>
  );
}

export default App;
