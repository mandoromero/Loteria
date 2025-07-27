import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawnCards: [],
  selectedCards: [],
  claimedCategories: [],  // SINGLE SOURCE OF TRUTH for all claimed combos
  isPaused: false,
  isGameOver: false,
  lastWinningCategory: null,
};

const loteriaSlice = createSlice({
  name: "loteria",
  initialState,
  reducers: {
    addDrawnCard: (state, action) => {
      state.drawnCards.push(action.payload);
    },
    togglePaused: (state) => {
      state.isPaused = !state.isPaused;
    },
    resetDrawnCards: (state) => {
      state.drawnCards = [];
    },
    toggleSelectedCard: (state, action) => {
      const cardId = action.payload;
      if (state.selectedCards.includes(cardId)) {
        state.selectedCards = state.selectedCards.filter((id) => id !== cardId);
      } else {
        state.selectedCards.push(cardId);
      }
    },
    resetGame: (state) => {
      state.drawnCards = [];
      state.selectedCards = [];
      state.claimedCategories = [];
      state.isPaused = false;
      state.isGameOver = false;
      state.lastWinningCategoroy = null;
    },
    claimCategory: (state, action) => {
      const category = action.payload;
      if (!state.claimedCategories.includes(category)) {
        state.claimedCategories.push(category);
        state.lastWinningCategory = category;

        // Enforce rules: FullCard always ends game.
        if (category === "fullCard") {
          state.isGameOver = true;
        }

        state.isPaused = true;
      }
    },
    setGameOver: (state, action) => {
      state.isGameOver = action.payload;  // NOTE: fix typo! was `inGameOver`
    },
    setPaused: (state, action) => {
      state.isPaused = action.payload;
    }
  }
});

export const {
  addDrawnCard,
  resetDrawnCards,
  toggleSelectedCard,
  resetGame,
  claimCategory,
  setPaused,
  togglePaused,
  setGameOver,
} = loteriaSlice.actions;

export default loteriaSlice.reducer;
