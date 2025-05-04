import React, { useState } from 'react';
import Header from "./Components/Header/Header"
import GameBoard from "./Components/GameBoard/GameBoard.jsx"

function App() {
  const [currentGame, setCurrentGame] = useState(false);

  const startGame = (e) => {
    e.preventDefault()
    setCurrentGame(true)
  }


  return (
    <>
      {currentGame == true ? 
        <div>
          <Header />
          <GameBoard />
        </div>
        :
        <button
          className="btn btn-danger"
          onClick={(e) => startGame(e)}
        >
          Start Game
        </button >
      }

    </>
  );
}

export default App;
