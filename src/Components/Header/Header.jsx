import React, { useState } from "react";
import LoteriaCard from "../LoteriaCard/LoteriaCard.jsx";


export default function Header({ paused, resetTrigger }) { 
  const [currentCard, setCurrentCard] = useState(null);

  return (
    <div className="card-container">
      <LoteriaCard
        onCardChange={setCurrentCard}
        paused={paused}
        resetTrigger={resetTrigger}
      />
      
    </div>
  );
}
