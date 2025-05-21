import React, { useState } from "react";
import LoteriaCard from "../LoteriaCard/LoteriaCard.jsx";


export default function Header({ paused, resetTrigger }) { 
  const [currentCard, setCurrentCard] = useState(null);

 const handleCardDrawn = (card) => {
  setCurrentCard(card);
 } 

  return (
    <div className="card-container">
      <LoteriaCard
        onCardChange={handleCardDrawn}
        paused={paused}
        resetTrigger={resetTrigger}
      />
      
    </div>
  );
}
