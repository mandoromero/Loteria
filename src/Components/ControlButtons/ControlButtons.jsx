import "../ControlButtons/ControlButtons.css";
import { resetGame } from "../../redux/LoteriaSlice.js";
import { useDispatch } from "react-redux";

const ControlButtons = ({ onPauseToggle, isPaused, onReset }) => {
  const dispatch = useDispatch();  
    const handleReset = () => {
      dispatch(resetGame())
      onReset()
    } 

    return (
      <div className="control-buttons">
        <button id="pause" onClick={onPauseToggle}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>
    );
  };
  
  export default ControlButtons;
  