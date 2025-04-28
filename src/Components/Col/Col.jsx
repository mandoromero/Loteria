import "./Col.css";

export default function Col({ card }) {
  return (
    <div className="col">
        <img 
          src={card.path} 
          alt={card.name} 
          className="card-img"
        />
    </div>
  );
}
