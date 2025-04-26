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

      setVisibleCards((prev) => {
        const updated = [nextCard, ...prev];
        return updated.slice(0, 5);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [deck]);

  return (
    <>
      <div className="card-containter2">
        <div className="card-row">
          {visibleCards.map((card, index) => (
            <img
              key={`${card.name}-${index}`} // unique key
              src={card.path}
              alt={card.name}
              width="45px"
              height="80x"  
              className="main-card"
            />
          ))}        
        </div>   {/* //card-row */}
      </div>  {/* contianer-container2 */}  
      <div className="card-name-box">
        <p className="card-name">{latestCard?.name}</p>
      </div>
    </>
  );
};

export default LoteriaCard;





        
            
             
        