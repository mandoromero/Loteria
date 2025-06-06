import "../StackedCards/StackedCards.css";
import cardBack from "../../assets/cardbackside/cardbackside.png";

export default function StackedCards() {
    return (
        <div className="stacked-cards">
            <div className="card card-1"></div>
            <div className="card card-2"></div>
            <div className="card card-3"></div>
            <div className="card card-4"></div>
            {/* <div className="card card-5"></div>
            <div className="card card-6"></div>
            <div className="card card-7"></div> */}
            <div className="card card-8">
                <img src={cardBack} alt="Card Backside"  width="50px" height="85px" />
            </div>

        </div>

      
    )
}