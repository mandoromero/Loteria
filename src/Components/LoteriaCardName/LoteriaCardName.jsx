import React from 'react';
import "../LoteriaCardName/LoteriaCardName.css";

const LoteriaCardName = ({ cardName }) => {
  return (
    <div className="card-name-box">
      <h2 className="card-name">{cardName}</h2>
    </div>
  );
};

export default LoteriaCardName;
