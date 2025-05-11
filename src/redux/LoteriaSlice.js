import { createSlice } from '@reduxjs/toolkit';

const loteriaSlice = createSlice({
  name: 'loteria',
  initialState: {
    latestCard: null,
    drawnCards: [],
    selectedCards: [],
  },
  reducers: {
    setLoteriaCard: (state, action) => {
     state.latestCard = action.payload;

     const alreadyDrawn = state.drawnCards.find(card => card.name === action.payload.name);
     if (!alreadyDrawn) {
      state.drawnCards.push(action.payload);
     }
    },
    toggleSelectedCard: (state, action) => {
      const normalizedCardName = action.payload.replace(/_/g, " ");
      if (state.selectedCards.includes(normalizedCardName)) {
        state.selectedCards = state.selectedCards.filter(name => name !== normalizedCardName);
      } else {
        state.selectedCards.push(normalizedCardName);
      }
    },
    resetGame: (state) => {
      state.latestCard = null;
      state.drawnCards = [];
      state.selectedCards = [];
    }
  },
});

export const { setLoteriaCard, toggleSelectedCard, resetGame } = loteriaSlice.actions;


export default loteriaSlice.reducer;
