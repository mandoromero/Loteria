import React, { useEffect, useRef } from "react";

// Import all audio files eagerly (once)
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

export default function LoteriaAudio({ card, soundOn }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!card || !soundOn) return;

    // Convert card name to match file naming convention
    const cardName = card.name.replace(/\s+/g, "_").toLowerCase();
    const soundEntry = Object.entries(audioFiles).find(([path]) =>
      path.endsWith(`${cardName}.wav`)
    );

    if (soundEntry) {
      // If no audio instance exists, create one
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      // Stop any currently playing audio before playing new one
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = soundEntry[1].default;
      audioRef.current.volume = 0.6;

      audioRef.current.play().catch((err) => {
        console.warn("Audio play failed (maybe autoplay blocked):", err);
      });
    }

    // ✅ Cleanup function (runs when card or soundOn changes, or component unmounts)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [card, soundOn]);

  return null;
}
