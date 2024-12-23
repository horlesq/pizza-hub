import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartState } from "../../types/types";

const initialState: CartState = {
  cart: [],
};

// Creating the cart slice using Redux Toolkit's createSlice
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState,
  reducers: {
    // Reducer to add an item to the cart
    addItem(state, action: PayloadAction<CartItemType>) {
      state.cart.push(action.payload);
    },

    // Reducer to delete an item from the cart by pizzaId
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    // Reducer to increase the quantity of an item in the cart
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload); // Find the item in the cart
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    // Reducer to decrease the quantity of an item in the cart
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload); // Find the item in the cart
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
      // If the quantity is zero, remove the item from the cart
      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },

    // Reducer to clear all items in the cart
    clearCart(state) {
      state.cart = [];
    },
  },
});

// Selectors to access cart state
// Get the entire cart
export const getCart = function (state: { cart: CartState }) {
  return state.cart.cart;
};

// Get the total quantity of items in the cart
export const getTotalCartQuantity = function (state: { cart: CartState }) {
  return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0); // Sum of all item quantities
};

// Get the total price of items in the cart
export const getTotalCartPrice = function (state: { cart: CartState }) {
  return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0); // Sum of all item total prices
};

// Get the quantity of a specific item by its pizzaId
export const getCurrentQuantityById = function (id: number) {
  return function (state: { cart: CartState }) {
    const foundItem = state.cart.cart.find((item) => item.pizzaId === id); // Find the item by pizzaId
    return foundItem ? foundItem.quantity : 0; // Return the quantity or 0 if the item isn't found
  };
};

// Export the actions generated by createSlice
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
