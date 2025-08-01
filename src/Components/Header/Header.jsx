import React from "react";
import { useSelector } from "react-redux";
import LoteriaCard from "../LoteriaCard/LoteriaCard.jsx";
import "../Header/Header.css";
import LoteriaAudio from "../LoteriaAudio.jsx";

export default function Header({ paused, resetTrigger, soundOn }) {
  // 👇 Pull the latest drawn card from Redux
  const currentCard = useSelector((state) => {
    const cards = state.loteria.drawnCards;
    return cards.length > 0 ? cards[cards.length - 1] : null;
  });

  console.log("Playing audio for card:", currentCard?.name, "Sound On:", soundOn);


  return (
    <div className="card-container">
      <LoteriaCard
        resetTrigger={resetTrigger}
        soundOn={soundOn}
      />

      {/* 👇 Display the current drawn card, if any */}
      {currentCard && (
        <div className="current-card">
          <img src={currentCard.image} />
        </div>
      )}
      <LoteriaAudio card={currentCard} soundOn={soundOn} />
    </div>
  );
}
