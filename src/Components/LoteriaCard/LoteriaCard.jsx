import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDrawnCard } from "../../redux/LoteriaSlice.js";
import StackedCards from "../StackedCards/StackedCards.jsx";
import LoteriaCardName from "../LoteriaCardName/LoteriaCardName.jsx";
import "../LoteriaCard/LoteriaCard.css";

// Preload images and audio
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

export default function LoteriaCard({ soundOn, resetTrigger }) {
  const dispatch = useDispatch();
  const paused = useSelector((state) => state.loteria.isPaused);
  const drawnCards = useSelector((state) => state.loteria.drawnCards);
  const latestCard = drawnCards.at(-1) || null;

  const [deck, setDeck] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const imageArray = useRef(
    Object.entries(images).map(([path, module]) => ({
      name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
      path: module.default,
    }))
  ).current;

  // Reset deck when game is reset
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

  // Main draw loop
  useEffect(() => {
    if (deck.length === 0 || paused) {
      clearInterval(intervalRef.current);
      return;
    }

    const drawNextCard = () => {
      if (currentIndexRef.current >= deck.length) {
        clearInterval(intervalRef.current);
        return;
      }

      const nextCard = deck[currentIndexRef.current++];
      dispatch(addDrawnCard(nextCard));
      setVisibleCards((prev) => [nextCard, ...prev].slice(0, 5));

      if (soundOn) {
        const audioPath = `/src/assets/Loteria_audio/${nextCard.name}.wav`;
        const audioModule = audioFiles[audioPath];

        if (audioModule) {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          const newAudio = new Audio(audioModule.default);
          audioRef.current = newAudio;
          newAudio.play();
        }
      }
    };

    intervalRef.current = setInterval(drawNextCard, 8000);
    return () => clearInterval(intervalRef.current);
  }, [deck, paused, dispatch, soundOn]);

  // Pause audio immediately when `paused` becomes true
  useEffect(() => {
    if (paused && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [paused]);

  // Clean up on unmount
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
