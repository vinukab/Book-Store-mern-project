import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        Swal.fire({
          position: "center",
          icon: "warning",
          iconColor: "#ff9800",
          title: "Item already in the cart!",
          timer: 1500,
          width: "300px",
          customClass: {
            title: "text-sm font-semibold",
            popup: "small-popup",
          },
        });
        state.cartItems.push(action.payload);
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Item added successfully!",
          showConfirmButton: false,
          timer: 1500,
          width: "300px",
          customClass: {
            title: "text-sm font-semibold",
            popup: "small-popup",
          },
        });
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
