import React, { useEffect, useRef } from "react";

// ✅ Load all audio files only once
const audioFiles = import.meta.glob("/src/assets/Loteria_audio/*.wav", { eager: true });

// ✅ Normalize names ONCE (top of file)
const audioMap = Object.fromEntries(
  Object.entries(audioFiles).map(([path, module]) => {
    const normalizedName = path
      .split("/")
      .pop()
      .replace(".wav", "")
      .toLowerCase();
    return [normalizedName, module.default];
  })
);

export default function LoteriaAudio({ card, soundOn }) {
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (!card || !soundOn) return;

    // ✅ Normalize the incoming card name
    const cardKey = card.name.replace(/\s+/g, "_").toLowerCase();
    const audioSrc = audioMap[cardKey];

    console.log("🔊 Trying to play:", cardKey, "| Found:", !!audioSrc);

    if (audioSrc) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = audioSrc;
      audioRef.current.volume = 0.6;

      audioRef.current.play().catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  }, [card, soundOn]);

  return null;
}
