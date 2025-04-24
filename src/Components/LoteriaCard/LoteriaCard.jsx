import React, { useEffect, useState } from "react";

// Dynamically import all images from the images folder
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });

const LoteriaCard = () => {
  const imageArray = Object.entries(images).map(([Path, module]) => ({
    name: Path.split("/").pop().replace(".png", ""),
    path: module.default,
  }));

  const [deck, setDeck] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);

  // Shuffle deck on mount
  useEffect(() => {
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
  }, []);

  // Draw a card every 5 seconds
  useEffect(() => {
    if (deck.length === 0) return;

    let currentIndex = 0;

    const interval = setInterval(() => {
      setVisibleCards((prev) => {
        if (currentIndex >= deck.length) {
          clearInterval(interval);
          return prev;
        }

        const nextCard = deck[currentIndex];
        currentIndex++;

        const updated = [nextCard, ...prev];
        return updated.slice(0, 5); // Show max 5 cards
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [deck]);

  return (
    <div className="card-row">
      {visibleCards.map((card, index) => (
        <img
          key={`${card.name}-${index}`} // safer unique key
          src={card.path}
          alt={card.name}
          width="50px"
          height="80px"
          className={`card card-${index}`}
        />
      ))}
    </div>
  );
};

export default LoteriaCard;
