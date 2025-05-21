import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawnCards: [],
  selectedCards: [],
  claimedCategories: [],
  isPaused: false,
};

const loteriaSlice = createSlice({
  name: "loteria",
  initialState,
  reducers: {
    addDrawnCard: (state, action) => {
      state.drawnCards.push(action.payload);
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
    },
    claimCategory: (state, action) => {
      if (!state.claimedCategories.includes(action.payload)) {
        state.claimedCategories.push(action.payload);
      }
    },
    setPaused: (state, action) => {
      state.isPaused = action.payload;
    },
  }
});

export const {
  addDrawnCard,
  resetDrawnCards,
  toggleSelectedCard,
  resetGame,
  claimCategory,
  setPaused,
} = loteriaSlice.actions;

export default loteriaSlice.reducer;
