// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import api from './services/apiService'; // Import your API slice
import orderReducer from './redux/orderReducer';
import authreducer from './redux/authReducer';
import apiService from './services/apiService';



const store = configureStore({
  reducer: {
    // Add your reducers here
    [apiService.reducerPath]: apiService.reducer,
    order : orderReducer,
    auth : authreducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add the RTK Query middleware directly

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch); // Setup RTK Query listeners

export default store;
