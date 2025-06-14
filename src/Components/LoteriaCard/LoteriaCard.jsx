import React, { useEffect, useState, useRef } from "react";
import "../LoteriaCard/LoteriaCard.css";
import LoteriaCardName from "../LoteriaCardName/LoteriaCardName.jsx";
import { addDrawnCard } from "../../redux/LoteriaSlice.js";
import { useDispatch } from "react-redux";
import StackedCards from "../StackedCards/StackedCards.jsx";

// Correctly import all images and audio files
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

export default function LoteriaCard({
  onCardChange = () => {},
  paused,
  resetTrigger,
  soundOn, // ✅ fix typo
}) {
  const [deck, setDeck] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [latestCard, setLatestCard] = useState(null);
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);
  const dispatch = useDispatch();

  // Build image array from imported images
  const imageArray = Object.entries(images).map(([path, module]) => ({
    name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
    path: module.default,
  }));

  // Reset deck on trigger
  useEffect(() => {
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setVisibleCards([]);
    setLatestCard(null);
    currentIndexRef.current = 0;
  }, [resetTrigger]);

  // Main card draw loop
  useEffect(() => {
    if (deck.length === 0) return;

    if (paused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (currentIndexRef.current >= deck.length) {
        clearInterval(intervalRef.current);
        return;
      }

      const nextCard = deck[currentIndexRef.current++];
      setLatestCard(nextCard);
      onCardChange(nextCard);
      dispatch(addDrawnCard(nextCard));

      // Play audio if enabled
      if (soundOn) {
        const audioPath = `/src/assets/Loteria_audio/${nextCard.name}.wav`;
        const audioFile = audioFiles[audioPath];
        if (audioFile) {
          const audio = new Audio(audioFile.default);
          audio.play();
        }
      }

      setVisibleCards((prev) => {
        const updated = [nextCard, ...prev];
        return updated.slice(0, 5); // show up to 5 cards
      });
    }, 8000);

    return () => clearInterval(intervalRef.current);
  }, [deck, paused, onCardChange, dispatch, soundOn]);

  return (
    <div className="card-container2">
      <div className="card-row">
        <StackedCards />
        <LoteriaCardName cardName={latestCard?.name || "Waiting..."} />
        {visibleCards.map((card, index) => (
          <img
            key={`${card.name}-${index}`}
            src={card.path}
            alt={card.name}
            className={`main-card ${card.name === latestCard?.name ? "highlight" : ""}`}
            width="50"
            height="90"
          />
        ))}
      </div>
    </div>
  );
}
