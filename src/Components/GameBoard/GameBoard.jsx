import Row from "../Row/Row.jsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WinningCombinations from "../WinningCombinations/WinningCombinations.jsx";
import WinnerOverlay from "../WinnerOverlay/WinnerOverlay.jsx";
import {
  toggleSelectedCard,
  claimCategory,
  setPaused,
} from "../../redux/LoteriaSlice.js";
import checkWinningConditions from "../checkWinningConditions/checkWinningConditions.js";
import "../GameBoard/GameBoard.css";

// Load all images eagerly
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });



export default function GameBoard() {
  const dispatch = useDispatch();

  const drawnCards = useSelector((state) => state.loteria.drawnCards);
  const selectedCards = useSelector((state) => state.loteria.selectedCards);
  const claimedCategories = useSelector((state) => state.loteria.claimedCategories);
  const paused = useSelector((state) => state.loteria.paused);

  const [cardSet, setCardSet] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [winningCategory, setWinningCategory] = useState(null);

  const imageArray = Object.entries(images).map(([path, module]) => ({
    name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
    path: module.default,
  }));

  // Setup a 4x4 card set for display
  useEffect(() => {
    if (paused) return;
    const shuffled = [...imageArray]
      .sort(() => 0.5 - Math.random())
      .slice(0, 16)
      .map((card, index) => ({
        ...card,
        id: `${card.name}-${index}`,
      }));

    setCardSet(shuffled);
  }, []);

  const handleClick = (cardId) => {
    const card = cardSet.find((c) => c.id === cardId);
    if (drawnCards.find((drawn) => drawn.name === card.name)) {
      dispatch(toggleSelectedCard(cardId));
    }
  };

  const handleLoteriaClick = () => {
    const selectedIndices = selectedCards
      .map((id) => cardSet.findIndex((card) => card.id === id))
      .filter((i) => i !== -1);

    const { isWinner: win, categories } = checkWinningConditions({
      selected: selectedIndices,
      claimedCategories,
    });

    if (win) {
      const newCategories = categories.filter(cat => !claimedCategories.includes(cat));

      if (newCategories.length > 0) {
        for (const category of newCategories) {
          dispatch(claimCategory(category));
        }

        // Just use the first for the overlay, adjust as needed
        setWinningCategory(newCategories[0].split("-")[0]);
        setIsWinner(true);
        dispatch(setPaused(true));

        if (newCategories.includes("fullCard")) {
          console.log("full card");
          return;
        }

        setTimeout(() => {
          setIsWinner(false);
          dispatch(setPaused(false));
        }, 5000);
      }
    }
  }
  function formatCategory(category) {
      const map = {
        "xShape": "X Shape",
        "corners": "Four Corners",
        "center": "Center",
        "fullCard": "Full Card"
      };

      if (map[category]) return map[category];

      if (category.startsWith("row")) return `Horizontal Line (${category.split("-")[1]})`;
      if (category.startsWith("col")) return `Vertical Lline (${category.split("-")[1]})`;
      if (category.startsWith("diag")) return `Diagonal Line (${category.split("-")[1]})`;

      return category;
    }
  return (
    <div className="gameboard-wrapper">
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
      </div>

      <button
        className="loteria-btn"
        onClick={handleLoteriaClick}
        disabled={paused}
      >
        ¡Lotería!
      </button>

      <div className="claimed-combos mt-3">
        <h5>Claimed Wins:</h5>
        {claimedCategories.length === 0 ? (
          <p>No combinations claimed yet.</p>
        ) : (
          <ul>
            {claimedCategories.map((combo, index) => (
              <li key={index}>{formatCategory(combo)}</li>
            ))}
          </ul>
        )}
      </div>

      <WinningCombinations
        selected={selectedCards}
        claimedCategories={claimedCategories}
      />

      <WinnerOverlay isWinner={isWinner} category={winningCategory} />
    </div>
  );
}
