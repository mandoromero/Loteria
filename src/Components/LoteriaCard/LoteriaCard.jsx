import React, { useEffect, useState } from "react";
import "../LoteriaCard/LoteriaCard.css";

const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });

const LoteriaCard = ({ onCardChange = () => {} }) => {
  const imageArray = Object.entries(images).map(([Path, module]) => ({
    name: Path.split("/").pop().replace(".png", "").replace(/_/g, " "),
    path: module.default,
  }));

  const [deck, setDeck] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [latestCard, setLatestCard] = useState(null);

  useEffect(() => {
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
  }, []);

  useEffect(() => {
    if (deck.length === 0) return;

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= deck.length) {
        clearInterval(interval);
        return;
      }

      const nextCard = deck[currentIndex];
      currentIndex++;
      setLatestCard(nextCard);
      onCardChange(nextCard); // Notify parent

      setVisibleCards((prev) => {
        const updated = [nextCard, ...prev];
        return updated.slice(0, 5);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [deck, onCardChange]);

  return (
    <div className="card-container2">
      <div className="card-row">
        {visibleCards.map((card, index) => (
          <img
            key={`${card.name}-${index}`}
            src={card.path}
            alt={card.name}
            width="50px"
            height="90px"
            className="main-card"
          />
        ))}
      </div>
    </div>
  );
};

export default LoteriaCard;






        
            
             
        