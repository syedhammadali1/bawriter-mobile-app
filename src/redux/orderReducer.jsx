// orderReducer.js
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
    setOrderData(state, action) {
      return {
        ...state,
        serviceType: action.payload.serviceType || state.serviceType,
        writer: action.payload.writer || state.writer,
        workLevel: action.payload.workLevel || state.workLevel,
        urgency: action.payload.urgency || state.urgency,
        pages: action.payload.pages || state.pages,
        spacing: action.payload.spacing || state.spacing,
        title: action.payload.title || state.title,
        instructions: action.payload.instructions || state.instructions,
      };
    },
  },
});

export const { setOrderData } = orderSlice.actions;

export default orderSlice.reducer;
