import { createSlice } from "@reduxjs/toolkit";

let Wenstore = JSON.parse(localStorage.getItem("cart"));

const cardSlice = createSlice({
  name: "card",
  initialState: Wenstore,
  reducers: {
    addItem(state, action) {
      //   console.log(action.payload);
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify([...state]));
    },
    removeItem(state, action) {
      // let itemid = action.payload; /// if first chose
      let newProduct = state.filter(
        (cardproduct) => cardproduct.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify([...newProduct]));

      return newProduct;
    },
  },
});

export default cardSlice.reducer;
export let { addItem, removeItem } = cardSlice.actions;
