import React from "react";
import "./LoteriaCardName.css";

export default function LoteriaCardName({ cardName }) {
  return (
    <div className="loteria-card-name">
      <h2>{cardName}</h2>
    </div>
  );
}
