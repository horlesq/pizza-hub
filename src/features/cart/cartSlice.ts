import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartState } from "../../types/types";

const initialState:CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
