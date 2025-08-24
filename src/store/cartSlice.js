// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     showPanel: false,
//     isGuest: true,
//   },
//   reducers: {
//     addItem: (state, action) => {
//       const { id, count = 1 } = action.payload;
//       const existingItem = state.items.find((item) => item.id === id);
//       if (existingItem) existingItem.count++;
//       else state.items.push({ id, count });
//     },
//     removeItem: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     updateItemCount: (state, action) => {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item) item.count = action.payload.count;
//     },
//     togglePanel: (state) => {
//       state.showPanel = !state.showPanel;
//     },
//     setItems: (state, action) => {
//       state.items = action.payload;
//     },
//     setIsGuest: (state, action) => {
//       if (state.isGuest !== action.payload) state.isGuest = action.payload;
//     },
//   },
// });

// export const {
//   addItem,
//   removeItem,
//   updateItemCount,
//   togglePanel,
//   setItems,
//   setIsGuest,
// } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showPanel: false,
    isGuest: true,
    hasSynced: false,
    lastSyncedEmail: null,
  },
  reducers: {
    addItem: (state, action) => {
      const { id, count = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.count += count;
      } else {
        state.items.push({ id, count });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
    },
    togglePanel: (state) => {
      state.showPanel = !state.showPanel;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setIsGuest: (state, action) => {
      const wasGuest = state.isGuest;
      state.isGuest = action.payload;

      if (wasGuest !== action.payload) {
        state.hasSynced = false;
        state.lastSyncedEmail = null;
      }
    },
    markAsSynced: (state, action) => {
      state.hasSynced = true;
      state.lastSyncedEmail = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItemCount,
  togglePanel,
  setItems,
  setIsGuest,
  markAsSynced,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
