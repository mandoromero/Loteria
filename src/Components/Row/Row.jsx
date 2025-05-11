import Col from "../Col/Col.jsx";
import "../Row/Row.css"

export default function Row({ cards, drawnCards, selectedCards, handleClick }) {
  return (
    <div className="row">
      {cards.map((card, index) => (
        <Col 
          key={index} 
          card={card}
          drawnCards={drawnCards}
          selectedCards={selectedCards}
          handleClick={handleClick}
       />
      ))}
    </div>
  );
}
