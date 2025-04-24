import Row from "../Row/Row.jsx";
import { useEffect, useState } from "react";
import "../GameBoard/GameBoard.css";

// Load all images eagerly
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });

export default function GameBoard() {
  const imageArray = Object.entries(images).map(([path, module]) => ({
    name: path.split("/").pop().replace(".png", ""),
    path: module.default,
  }));

  const [cardSet, setCardSet] = useState([]);

  useEffect(() => {
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    setCardSet(shuffled.slice(0, 16)); // 4x4 = 16 unique cards
  }, []);

  return (
    <div className="game-board">
      {[0, 1, 2, 3].map(rowIndex => (
        <Row key={rowIndex} cards={cardSet.slice(rowIndex * 4, rowIndex * 4 + 4)} />
      ))}
    </div>
  );
}
