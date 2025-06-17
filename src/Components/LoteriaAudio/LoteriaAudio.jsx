import React, { useEffect } from "react";

// Eagerly import audio files ONCE at the top
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

export default function LoteriaAudio({ card, soundOn }) {
  useEffect(() => {
    if (!card || !soundOn) return;

    // Normalize card name to match file name convention
    const cardName = card.name.replace(/\s/g, "_");
    const soundEntry = Object.entries(audioFiles).find(([path]) =>
      path.endsWith(`${cardName}.wav`)
    );

    if (soundEntry) {
      const audio = new Audio(soundEntry[1].default);
      audio.play().catch((err) => {
        console.warn("Autoplay prevented by browser:", err);
      });

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [card, soundOn]);

  return null; // This component only plays audio
}