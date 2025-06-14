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

                <div className="d-flex align-items-center gap-2">
                    {!currentGame ? (
                        <button className="btn btn-primary reset" onClick={onStartGame}>
                            Start Game
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-warning pause" onClick={onPauseToggle}>
                                {isPaused ? "Resume" : "Pause"}
                            </button>
                            <button className="btn btn-danger" onClick={handleReset}>
                                Reset
                            </button>
                        </>
                    )}
                    <button className="btn btn-secondary sound" onClick={toggleSound}>
                        Sound: {soundOn ? "On" : "Off"}
                    </button>
                    <div className="ms-auto">
                     <button className="btn btn-info" onClick={toggleHistory}>
                        Rules and History
                     </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}