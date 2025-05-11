import React, { useEffect, useState, useRef } from "react";
import LoteriaAudio from "../LoteriaAudio/LoteriaAudio.jsx";
import "../LoteriaCard/LoteriaCard.css";
import LoteriaCardName from "../LoteriaCardName/LoteriaCardName.jsx";
import { useDispatch } from "react-redux";
import { setLoteriaCard } from "../../redux/LoteriaSlice.js";

const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

const LoteriaCard = ({ onCardChange = () => {}, paused, resetTrigger }) => {
  const [deck, setDeck] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [latestCard, setLatestCard] = useState(null);
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);

  const imageArray = Object.entries(images).map(([path, module]) => ({
    name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
    path: module.default,
  }));

  const dispatch = useDispatch();  

  useEffect(() => {
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setVisibleCards([]);
    setLatestCard(null);
    currentIndexRef.current = 0;
  }, [resetTrigger]);

  useEffect(() => {
    if (deck.length === 0 || paused) return;

    intervalRef.current = setInterval(() => {
      if (currentIndexRef.current >= deck.length) {
        clearInterval(intervalRef.current);
        return;
      }

      const nextCard = deck[currentIndexRef.current++];
      setLatestCard(nextCard);
      onCardChange(nextCard);
      dispatch(setLoteriaCard(nextCard)); // ✅ Correct Redux dispatch

      setVisibleCards(prev => {
        const updated = [nextCard, ...prev];
        return updated.slice(0, 5);
      });
    }, 8000);

    return () => clearInterval(intervalRef.current);
  }, [deck, paused, onCardChange, dispatch]);

  return (
    <div className="card-container2">
      <div className="card-row">
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
      <LoteriaAudio card={latestCard} audioFiles={audioFiles} />
    </div>
  );
};

export default LoteriaCard;
