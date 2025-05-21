import Col from "../Col/Col.jsx";
import "../Row/Row.css"

export default function Row({ cards, drawnCards, selectedCards, handleClick }) {
  return (
    <div className="row">
      {cards.map((card) => (
        <Col 
          key={card.id}
          isDrawn={drawnCards.some((drawn) => drawn.name === card.name)} 
          isSelected={selectedCards.includes(card.id)}
          onClick={handleClick}
          card={card}
          // drawnCards={drawnCards}
          // selectedCards={selectedCards}
          // handleClick={handleClick}
       />
      ))}
    </div>
  );
}
