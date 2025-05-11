import "./Col.css";
import React, { useEffect, useState } from "react";

export default function Col({ card, drawnCards, selectedCards, handleClick }) {
  const [cardClass, setCardClass] = useState("card-img");
  const isDrawn = drawnCards.some(drawn => drawn.name === card.name);
  const isSelected = selectedCards.includes(card.name);

  useEffect(() => {
    const newClass = `card-img ${isDrawn ? "active" : ""} ${isSelected ? "selected" : ""}`;
    setCardClass(newClass);
  }, [isDrawn, isSelected]);

  return (
    <div className="col" onClick={() => isDrawn && handleClick(card.name)}>
      <img 
        src={card.path} 
        alt={card.name} 
        className={cardClass}
      />
    </div>
  );
}
