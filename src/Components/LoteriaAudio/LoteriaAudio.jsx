import React, { useEffect } from "react";

// Eagerly import all audio files once
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

export default function LoteriaAudio({ card, soundOn }) {
  useEffect(() => {
    if (!card || !soundOn) return;

    // Convert card name to match file name format
    const cardName = card.name.replace(/\s+/g, "_");
    const soundEntry = Object.entries(audioFiles).find(([path]) =>
      path.endsWith(`${cardName}.wav`)
    );

    if (soundEntry) {
      const audio = new Audio(soundEntry[1].default);
      audio.volume = 0.6;

      const playAudio = async () => {
        try {
          await audio.play();
        } catch (err) {
          console.warn("Audio play failed (maybe autoplay blocked):", err);
        }
      };

      playAudio();

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [card, soundOn]);

  return null;
}
