import React, { useEffect, useState, useRef } from "react";
import "../LoteriaCard/LoteriaCard.css";
import LoteriaCardName from "../LoteriaCardName/LoteriaCardName.jsx";
import { addDrawnCard } from "../../redux/LoteriaSlice.js";
import { useDispatch, useSelector } from "react-redux";
import StackedCards from "../StackedCards/StackedCards.jsx";

// Static imports
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

export default function LoteriaCard({ paused, resetTrigger, soundOn }) {
  const dispatch = useDispatch();

  const [deck, setDeck] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);
  const audioRef = useRef(null);

  const latestCard = useSelector((state) => {
    const cards = state.loteria.drawnCards;
    return cards.length > 0 ? cards[cards.length - 1] : null;
  });

  // Build image array once
  const imageArray = useRef(
    Object.entries(images).map(([path, module]) => ({
      name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
      path: module.default,
    }))
  ).current;

  // 🔁 Reset deck when triggered
  useEffect(() => {
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setVisibleCards([]);
    currentIndexRef.current = 0;

    clearInterval(intervalRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [resetTrigger]);

  // ▶️ Card draw loop
  useEffect(() => {
    if (deck.length === 0 || paused) {
      clearInterval(intervalRef.current);
      return;
    }

    const drawCard = () => {
      if (currentIndexRef.current >= deck.length) {
        clearInterval(intervalRef.current);
        return;
      }

      const nextCard = deck[currentIndexRef.current++];
      dispatch(addDrawnCard(nextCard));

      // 🔊 Audio playback
      if (soundOn) {
        const audioPath = `/src/assets/Loteria_audio/${nextCard.name}.wav`;
        const audioFile = audioFiles[audioPath];

        if (audioFile) {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          const newAudio = new Audio(audioFile.default);
          audioRef.current = newAudio;
          newAudio.play();
        }
      }

      setVisibleCards((prev) => [nextCard, ...prev].slice(0, 5));
    };

    intervalRef.current = setInterval(drawCard, 8000);
    return () => clearInterval(intervalRef.current);
  }, [deck, paused, dispatch, soundOn]);

  // ⏸ Pause audio on game pause
  useEffect(() => {
    if (paused && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [paused]);

  // 🧹 Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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
