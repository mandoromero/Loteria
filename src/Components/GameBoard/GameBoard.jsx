import Row from "../Row/Row.jsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WinnerOverlay from "../WinnerOverlay/WinnerOverlay.jsx";
import {
  toggleSelectedCard,
  claimCategory,
  setPaused,
  setGameOver,
} from "../../redux/LoteriaSlice.js";
import checkWinningConditions from "../checkWinningConditions/checkWinningConditions.js";
import "../GameBoard/GameBoard.css";

// Eagerly load all card images
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });

export default function GameBoard() {
  const dispatch = useDispatch();

  const drawnCards = useSelector((state) => state.loteria.drawnCards);
  const selectedCards = useSelector((state) => state.loteria.selectedCards);
  const claimedCategories = useSelector((state) => state.loteria.claimedCategories);
  const paused = useSelector((state) => state.loteria.isPaused);
  const isGameOver = useSelector((state) => state.loteria.isGameOver);

  const [cardSet, setCardSet] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [winningCategory, setWinningCategory] = useState(null);

  const imageArray = Object.entries(images).map(([path, module]) => ({
    name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
    path: module.default,
  }));

  // Initialize board with 16 cards once on mount
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

  // Auto resume unless full card ends game
  useEffect(() => {
    if (paused && !isGameOver) {
      const timeout = setTimeout(() => {
        setIsWinner(false);
        dispatch(setPaused(false));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [paused, isGameOver, dispatch]);

  const getSelectedIndices = () =>
    selectedCards
      .map((id) => cardSet.findIndex((card) => card.id === id))
      .filter((i) => i !== -1);

  // Compute player's claimed combos
  const yourWinningCombos = (() => {
    const selectedIndices = getSelectedIndices();
    const { categories = [] } = checkWinningConditions({
      selected: selectedIndices,
      claimedCategories: [],
    });
    return categories.filter((cat) => claimedCategories.includes(cat));
  })();

  const handleClick = (cardId) => {
    const card = cardSet.find((c) => c.id === cardId);
    if (drawnCards.some((drawn) => drawn.name === card.name)) {
      dispatch(toggleSelectedCard(cardId));
    }
  };

  const handleLoteriaClick = () => {
    const selectedIndices = getSelectedIndices();
    const { categories: possibleCombos } = checkWinningConditions(selectedIndices);

    // Only combos NOT claimed globally
    const newCombos = possibleCombos.filter(
      (combo) => !claimedCategories.includes(combo)
    );

    if (newCombos.length > 0) {
      // Mark all new combos as claimed globally
      newCombos.forEach((combo) => dispatch(claimCategory(combo)));

      // Set winning category: use prefix if row-X or col-X or diag-X, else whole name
      const firstCombo = newCombos[0];
      const category = firstCombo.includes('-') ? firstCombo.split('-')[0] : firstCombo;

    setWinningCategory(category);
    setIsWinner(true);
    dispatch(setPaused(true));

    if (newCombos.includes("fullCard")) {
      dispatch(setGameOver(true));
    }
  } else {
    console.log("No new combos — they were already claimed!");
  }
};


  const formatCategory = (category) => {
    const map = {
      xShape: "X Shape",
      corners: "Four Corners",
      center: "Center",
      fullCard: "Full Card",
    };
    if (map[category]) return map[category];
    if (category.startsWith("row")) return `Horizontal Line (${category.split("-")[1]})`;
    if (category.startsWith("col")) return `Vertical Line (${category.split("-")[1]})`;
    if (category.startsWith("diag")) return `Diagonal Line (${category.split("-")[1]})`;
    return category;
  };

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
        <h5>Claimed Wins (all players):</h5>
        {claimedCategories.length === 0 ? (
          <p>No combinations claimed yet.</p>
        ) : (
          <ul>
            {claimedCategories.map((combo, index) => (
              <li key={index}>{formatCategory(combo)}</li>
            ))}
          </ul>
        )}

        <h5>Your Winning Combos:</h5>
        {yourWinningCombos.length === 0 ? (
          <p>You haven't claimed a win yet.</p>
        ) : (
          <ul>
            {yourWinningCombos.map((combo, index) => (
              <li key={index}>{formatCategory(combo)}</li>
            ))}
          </ul>
        )}
      </div>

      <WinnerOverlay isWinner={isWinner} category={winningCategory} />
    </div>
  );
}
