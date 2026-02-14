import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "bag",
  initialState: {
    items: []
  },

  reducers: {
    additems: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i._id === item._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeitems: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i._id === item._id);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i._id !== item._id);
        }
      }
    },

    clearBag: (state) => {
      state.items = [];
    }
  }
});

// Selector to get total count of items in bag
export const selectTotalItems = (state) => {
  return state.bag.items.reduce((total, item) => total + item.quantity, 0);
};

// Selector to get total unique items in bag
export const selectUniqueItemsCount = (state) => {
  return state.bag.items.length;
};

export const { additems, removeitems, clearBag } = itemSlice.actions;
export default itemSlice.reducer;
