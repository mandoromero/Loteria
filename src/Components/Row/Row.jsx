import Col from "../Col/Col.jsx";
import "../Row/Row.css"

export default function Row({ cards }) {
  return (
    <div className="row">
      {cards.map((card, index) => (
        <Col key={index} card={card} />
      ))}
    </div>
  );
}
