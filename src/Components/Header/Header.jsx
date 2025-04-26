import { useState } from 'react';
import React from "react";
import LoteriaCard from "../LoteriaCard/LoteriaCard.jsx";
import "./Header.css";
import LoteriaCardName from "../LoteriaCardName/LoteriaCardName.jsx"

export default function Header() {
  const [currentCard, setCurrentCard] = useState(null);

    return (
        <div className="card-container">
          <LoteriaCard onCardChange={setCurrentCard} />
          <LoteriaCardName cardName={currentCard?.name || "Waiting..."} />
      </div>
    );
}