import "./Col.css";
import React, { useEffect, useState } from "react";


export default function Col({ card, isDrawn, isSelected, onClick }) {
  const [cardClass, setCardClass] = useState("card-img");
 
  useEffect(() => {
    const newClass = `card-img ${isDrawn ? "active" : ""} ${isSelected ? "selected" : ""}`;
    setCardClass(newClass);
  }, [isDrawn, isSelected]);

  
  console.log(isSelected);

  return (
    <div className="col" onClick={() => isDrawn && onClick(card.id)}>
      <img 
        src={card.path} 
        alt={card.name} 
        className={cardClass}
      />
    </div>
  );
}
