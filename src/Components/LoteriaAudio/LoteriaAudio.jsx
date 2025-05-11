import React, { useEffect } from "react";

// Import all audio files eagerly
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

const LoteriaAudio = ({ card }) => {
  useEffect(() => {
    if (!card) return;

    const cardName = card.name.replace(/\s/g, "_");
    const soundEntry = Object.entries(audioFiles).find(([path]) =>
      path.includes(cardName)
    );

    if (soundEntry) {
      const audio = new Audio(soundEntry[1].default);
      audio.play().catch((err) => {
        console.warn("Autoplay prevented by browser:", err);
      });
    }
  }, [card]);

  return null;
};

export default LoteriaAudio;