import React, { useState } from "react";
import LoteriaCard from "../LoteriaCard/LoteriaCard.jsx";
import StackedCards from "../StackedCards/StackedCards.jsx";
import "../Header/Header.css";


export default function Header({ paused, resetTrigger }) { 
  const [currentCard, setCurrentCard] = useState(null);

 const handleCardDrawn = (card) => {
  setCurrentCard(card);
 } 

  return (
    <div className="card-container">
      <StackedCards />
      <LoteriaCard
        onCardChange={handleCardDrawn}
        paused={paused}
        resetTrigger={resetTrigger}
      />
      
    </div>
  );
}
