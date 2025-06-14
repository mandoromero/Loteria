import React, { useState } from "react";
import LoteriaCard from "../LoteriaCard/LoteriaCard.jsx";
import "../Header/Header.css";

export default function Header({ paused, resetTrigger, soundOn }) {
  const [currentCard, setCurrentCard] = useState(null);

  const handleCardDrawn = (card) => {
    setCurrentCard(card);
  };

  return (
    <div className="card-container">
      <LoteriaCard
        onCardChange={handleCardDrawn}
        paused={paused}
        resetTrigger={resetTrigger}
        soundOn={soundOn}
      />
    </div>
  );
}
