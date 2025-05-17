import Row from "../Row/Row.jsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../GameBoard/GameBoard.css";
import WinningCombinations from "../WinningCombinations/WinningCombinations.jsx";
import WinnerOverlay from "../WinnerOverlay/WinnerOverlay.jsx";
import { checkWinningConditions } from "../WinningCombinations/WinningCombinations.jsx";
import { addDrawnCard } from "../../redux/LoteriaSlice.js"; // assuming you use this action

// Load all images eagerly
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });

export default function GameBoard() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [claimedCategories, setClaimedCategories] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [winningCategory, setWinningCategory] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [cardSet, setCardSet] = useState([]);
  const dispatch = useDispatch();
  const drawnCards = useSelector((state) => state.loteria.drawnCards);

  const imageArray = Object.entries(images).map(([path, module]) => ({
    name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
    path: module.default,
  }));

  // Setup a 4x4 card set for display
  useEffect(() => {
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    setCardSet(shuffled.slice(0, 16));
  }, []);

  // Simulate automatic card drawing every 3s (but pause if isPaused is true)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return;

      const remaining = imageArray.filter(
        (card) => !drawnCards.some((drawn) => drawn.name === card.name)
      );

      if (remaining.length > 0) {
        const nextCard = remaining[Math.floor(Math.random() * remaining.length)];
        dispatch(addDrawnCard(nextCard));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [drawnCards, isPaused]);

  const handleClick = (cardName) => {
    if (isPaused) return;
    if (drawnCards.find((card) => card.name === cardName)) {
      setSelectedCards((prev) =>
        prev.includes(cardName)
          ? prev.filter((name) => name !== cardName)
          : [...prev, cardName]
      );
    }
  };

  const handleLoteriaClick = () => {
    if (isPaused) return;

    const selectedIndices = selectedCards
      .map((name) => cardSet.findIndex((card) => card.name === name))
      .filter((i) => i !== -1);

    const { isWinner, category } = checkWinningConditions(selectedIndices, claimedCategories);

    if (isWinner && !claimedCategories.includes(category)) {
      setClaimedCategories((prev) => [...prev, category]);
      setWinningCategory(category);
      setIsWinner(true);
      setIsPaused(true);

      // Pause rendering/drawing for 10 seconds
      setTimeout(() => {
        setIsWinner(false);
        setIsPaused(false);
      }, 10000);
    }
  };

  const selectedIndices = selectedCards
    .map((name) => cardSet.findIndex((card) => card.name === name))
    .filter((index) => index !== -1);

  return (
    <div className="gameboard-wrapper" style={{ position: "relative" }}>
      <div className="game-board">
        {[0, 1, 2, 3].map((rowIndex) => (
          <Row
            key={rowIndex}
            cards={cardSet.slice(rowIndex * 4, rowIndex * 4 + 4)}
            drawnCards={drawnCards}
            selectedCards={selectedCards}
            handleClick={handleClick}
          />
        ))}

        <button
          className="loteria-btn"
          onClick={handleLoteriaClick}
          disabled={isPaused}
        >
          ¡Lotería!
        </button>

        <WinningCombinations selected={selectedIndices} />
      </div>

      <WinnerOverlay isWinner={isWinner} category={winningCategory} />
    </div>
  );
}
