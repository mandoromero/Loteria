import React from "react";
import LoteriaCard from "../LoteriaCard/LoteriaCard.jsx";
import "./Header.css";

export default function Header() {
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