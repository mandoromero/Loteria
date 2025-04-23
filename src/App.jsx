import React from 'react';
import LoteriaCard from "./Components/LoteriaCard.jsx";
import "../src/App.css";

function App() {



  return (
    <div className="card-container">
      <LoteriaCard />
      <div id="top-border"></div>
      <div id="left-border"></div>
      <div id="bottom-border"></div>
      <div id="right-border"></div>
    </div>
  );
}

export default App;
