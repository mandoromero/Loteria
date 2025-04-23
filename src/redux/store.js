// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import loteriaReducer from "./LoteriaSlice.js";


const store = configureStore({
  reducer: {
    loteria: loteriaReducer,
  },
});

export default store;

