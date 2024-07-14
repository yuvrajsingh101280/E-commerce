import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
// console.log(initialState);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemExist = state.find((item) => item.id == action.payload.id);
      if (itemExist) {
        itemExist.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    deleteFromCart(state, action) {
      const updatedCart = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },

    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});
// action creators are generated for each case reducer function

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
