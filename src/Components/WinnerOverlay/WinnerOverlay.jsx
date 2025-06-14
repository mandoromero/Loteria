import React, { useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import "../WinnerOverlay/WinnerOverlay.css"

export default function WinnerOverlay({ isWinner, category  }) {
  console.log(isWinner)
  const [width, height] = useWindowSize();
  const dialogRef = useRef(null);

    // useEffect(() => {
    //   const dialog = dialogRef.current;
    //   if (!dialog) return;

    //   if (isWinner) {
    //     if (!dialog.open) {
    //       dialog.showModal();
    //     }
    //   } else {
    //     if (dialog.open) {
    //       dialog.close();
    //     }
    //   }
    // }, [isWinner]); 

    useEffect (() => {
      if (isWinner) {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      } 
    }, []);


// return (
//   <>
//     {isWinner && (
//       <dialog ref={dialogRef} className="winner-dialog">
//         <div className="winner-overlay">
//           <Confetti width={width} height={height} />
//           <h1 className="ref-text">¡Lotería!</h1>
//         </div>
//         <div>
//           <h3>Winner!!</h3>
//           {category ? <ul><li>{category}</li></ul> : <p>No winning combination yet.</p>}
//         </div>
//       </dialog>
//     )}
//   </>
// );

  

  return (
    <dialog ref={dialogRef} className="winner-dialog">
      <div className="winner-overlay">
        <Confetti width={width} height={height} />
        <h1 className="ref-text">¡Lotería!</h1>
      </div>
      <div>
        <h3>Winner!!</h3>
        {category ? (
          <ul>
            <li>{category}</li>
          </ul>
        ) : (
          <p>No winning combination yet.</p>  
        )}
      </div>
    </dialog>
  );
}
