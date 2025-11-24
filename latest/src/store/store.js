import { configureStore } from "@reduxjs/toolkit";
import cardSliceReducer from "./cardSlice.js";

export const store = configureStore({
  reducer: {
    cart: cardSliceReducer,
    

  },
});
  