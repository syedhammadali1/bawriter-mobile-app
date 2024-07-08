import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  serviceType: null,
  writer: null,
  workLevel: null,
  urgency: null,
  pages: 1,
  spacing: null,
  title: null,
  instructions: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setOrderData } = orderSlice.actions;

export default orderSlice.reducer;
