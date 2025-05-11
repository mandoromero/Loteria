import { configureStore } from "@reduxjs/toolkit";
import loteriaReducer from "../redux/LoteriaSlice.js";

const store = configureStore({
  reducer: {
    loteria: loteriaReducer,
  },
});

export default store;
