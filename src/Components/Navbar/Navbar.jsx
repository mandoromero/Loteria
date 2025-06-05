import React from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../../redux/LoteriaSlice.js";

export default function Navbar({
    onPauseToggle,
    isPaused, 
    onReset, 
    onStartGame, 
    currentGame, 
    toggleHistory
}) {
    const dispatch = useDispatch();

    const handleReset = () => {
        dispatch(resetGame());
        onReset();
    };

    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid d-flex w-100 justify-content-between align-item-center">
                <h1 className="navbar-brand m-0">La Loteria</h1>

                <div className="d-flex align-items-center gap-2">
                    {!currentGame ? (
                        <button className="btn btn-primary" onClick={onStartGame}>Start Game</button>
                    ) : (
                        <>
                            <button className="btn btn-warning" onClick={onStartGame}>
                                {isPaused ? "Resume": "Pause"}
                            </button>
                            <button className="btn btn-danger" onClick={handleReset}>
                                Reset
                            </button>
                        </>    
                     )}
                </div>

                <div className="ms-auto">
                     <button className="btn btn-info" onClick={toggleHistory}>
                        Rules and History
                     </button>
                </div>
            </div>
        </nav>
    );
}