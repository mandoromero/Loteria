// src/components/LoteriaCard.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoteriaCard } from '../redux/LoteriaSlice';

// Dynamically import all images from the images folder
const images = import.meta.glob("/src/assets/Loteria_Cards/*.png", { eager: true });

const LoteriaCard = () => {
  // Map images to an array of objects containing name and path
  const imageArray = Object.entries(images).map(([Path, module]) => ({
    name: Path.split("/").pop().replace(".png", ""),
    path: module.default,
  }));

  const dispatch = useDispatch();
  const loteriaCard = useSelector((state) => state.loteria.card);

  useEffect(() => {
    if (!loteriaCard) {
      // Select a random index from the imageArray if no card is set
      const randomIndex = Math.floor(Math.random() * imageArray.length);
      dispatch(setLoteriaCard(imageArray[randomIndex]));
    }
  }, [dispatch, loteriaCard, imageArray]);

  return (
    <div>
      {loteriaCard && (
        <>
          <img src={loteriaCard.path} alt={`LoteriaCard: ${loteriaCard.name}`} width="200px" />
        </>
      )}
    </div>
  );
};

export default LoteriaCard;

