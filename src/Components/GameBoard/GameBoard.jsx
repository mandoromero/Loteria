import Row from "../Row/Row.jsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelectedCard } from "../../redux/LoteriaSlice.js";
import "../GameBoard/GameBoard.css";
import WinningCombinations from "../WinningCombinations/WinningCombinations.jsx";
import WinnerOverlay from "../WinnerOverlay/WinnerOverlay.jsx";
import { checkWinningConditions } from "../WinningCombinations/WinningCombinations.jsx";

// Load all images eagerly
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });

export default function GameBoard() {
  const [isWinner, setIsWinner] = useState(false);
  const drawnCards = useSelector((state) => state.loteria.drawnCards);
  const selectedCards = useSelector((state) => state.loteria.selectedCards);
  const dispatch = useDispatch();

  const imageArray = Object.entries(images).map(([path, module]) => ({
    name: path.split("/").pop().replace(".png", "").replace(/_/g, " "),
    path: module.default,
  }));

  const [cardSet, setCardSet] = useState([]);

  useEffect(() => {
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    setCardSet(shuffled.slice(0, 16)); // 4x4 = 16 unique cards
  }, []);

  const handleClick = (cardName) => {
    if (drawnCards.find((card) => card.name === cardName)) {
      dispatch(toggleSelectedCard(cardName));
    }
  };

  const selectedIndices = selectedCards
    .map(name => cardSet.findIndex(card => card.name === name))
    .filter(index => index !== -1);

  const handleLoteriaClick = () => {
    const selectedIndices = selectedCards
      .map(name =>  cardSet.findIndex(card => card.name === name))
      .filter(index => index !== -1);

    const winner = checkWinningConditions(selectedIndices);
    setIsWinner(winner);
  }

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

        <button className="loteria-btn"></button>

        <WinningCombinations selected={cardSet.length ? selectedCards.map(name =>
          cardSet.findIndex(card => card.name === name)
        ).filter(index => index !== -1): []} />
      </div>

      <WinnerOverlay isWinner={isWinner} />
    </div>  
  );
}
