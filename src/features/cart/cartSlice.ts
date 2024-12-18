import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartState } from "../../types/types";

const initialState: CartState = {
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
      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const getCart = function (state: { cart: CartState }) {
  return state.cart.cart;
};

export const getTotalCartQuantity = function (state: { cart: CartState }) {
  return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const getTotalCartPrice = function (state: { cart: CartState }) {
  return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
};

export const getCurrentQuantityById = function (id: number) {
  return function (state: { cart: CartState }) {
    const foundItem = state.cart.cart.find((item) => item.pizzaId === id);
    return foundItem ? foundItem.quantity : 0;
  };
};

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
