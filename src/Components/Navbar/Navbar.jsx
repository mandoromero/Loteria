import React from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../../redux/LoteriaSlice.js";
import "./Navbar.css";

export default function Navbar({
    onPauseToggle,
    isPaused, 
    onReset, 
    onStartGame, 
    currentGame, 
         toggleHistory,
    soundOn,
    toggleSound
}) {
    const dispatch = useDispatch();

    const handleReset = () => {
        dispatch(resetGame());
        onReset();
    };

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid d-flex w-100 justify-content-between align-item-center">
                <h1 className="navbar-brand m-0">La Loteria</h1>

                <div className="btn-container">
                    {!currentGame ? (
                        <button className="start" onClick={onStartGame}>
                            Start Game
                        </button>
                    ) : (
                        <>
                            <button className="pause" onClick={onPauseToggle}>
                                {isPaused ? "Resume" : "Pause"}
                            </button>
                            <button className="reset" onClick={handleReset}>
                                Reset
                            </button>
                        </>
                    )}
                    <button className="sound" onClick={toggleSound}>
                        Sound: {soundOn ? "On" : "Off"}
                    </button>
                    <div className="ms-auto">
                     <button className="btn btn-info rules-history" onClick={toggleHistory}>
                        Rules and History
                     </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}