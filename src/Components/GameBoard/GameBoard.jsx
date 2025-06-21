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

// Eagerly load card images once
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });

export default function GameBoard() {
  const dispatch = useDispatch();

  // Redux state
  const drawnCards = useSelector((state) => state.loteria.drawnCards);
  const selectedCards = useSelector((state) => state.loteria.selectedCards);
  const claimedCategories = useSelector((state) => state.loteria.claimedCategories);
  const paused = useSelector((state) => state.loteria.isPaused);
  const isGameOver = useSelector((state) => state.loteria.isGameOver);

  // Local state
  const [cardSet, setCardSet] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [winningCategory, setWinningCategory] = useState(null);

  // Prepare image metadata once
  const imageArray = Object.entries(images).map(([path, module]) => ({
    name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
    path: module.default,
  }));

  // Initialize the 4x4 board once
  useEffect(() => {
    const shuffled = [...imageArray]
      .sort(() => Math.random() - 0.5)
      .slice(0, 16)
      .map((card, index) => ({
        ...card,
        id: `${card.name}-${index}`,
      }));
    setCardSet(shuffled);
  }, []);

  // Auto-unpause after win overlay, unless game ended
  useEffect(() => {
    if (paused && !isGameOver) {
      const timeout = setTimeout(() => {
        setIsWinner(false);
        dispatch(setPaused(false));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [paused, isGameOver, dispatch]);

  // Get board indices of selected cards
  const getSelectedIndices = () => {
    return selectedCards
      .map((id) => cardSet.findIndex((card) => card.id === id))
      .filter((i) => i !== -1);
  };

  // Derive player-specific claimed combos
  const yourWinningCombos = (() => {
    const selectedIndices = getSelectedIndices();
    const { categories = [] } = checkWinningConditions({
      selected: selectedIndices,
      globalClaimedCategories: [], // show ALL possible from selected only
    });
    return categories.filter((cat) => claimedCategories.includes(cat));
  })();

  // Click card only if its name was drawn
  const handleClick = (cardId) => {
    const card = cardSet.find((c) => c.id === cardId);
    if (!card) return;
    if (drawnCards.some((drawn) => drawn.name === card.name)) {
      dispatch(toggleSelectedCard(cardId));
    }
  };

  // Claim possible wins for player
  const handleLoteriaClick = () => {
    const selectedIndices = getSelectedIndices();

    const { categories: possibleCombos } = checkWinningConditions({
      selected: selectedIndices,
      globalClaimedCategories: claimedCategories,
    });

    // Filter only NEW unclaimed combos
    const newCombos = possibleCombos.filter(
      (combo) => !claimedCategories.includes(combo)
    );

    if (newCombos.length > 0) {
      newCombos.forEach((combo) => dispatch(claimCategory(combo)));

      const firstCombo = newCombos[0];
      const displayName = firstCombo.includes('-')
        ? firstCombo.split('-')[0]
        : firstCombo;

      setWinningCategory(displayName);
      setIsWinner(true);
      dispatch(setPaused(true));

      if (newCombos.includes("fullCard")) {
        dispatch(setGameOver(true));
      }
    } else {
      alert("No new Lotería to claim — keep playing!");
    }
  };

  // Format a combo nicely for display
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
        disabled={paused || isGameOver}
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
