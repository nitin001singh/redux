import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productsSlice';

import cartReducer from '../features/cart/cartsSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart:cartReducer
  },
});
