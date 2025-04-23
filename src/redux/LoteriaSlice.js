// src/store/loteriaSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Slice for Lotería card state
const loteriaSlice = createSlice({
  name: 'loteria',
  initialState: {
    card: null,
  },
  reducers: {
    setLoteriaCard: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { setLoteriaCard } = loteriaSlice.actions;

export default loteriaSlice.reducer;
