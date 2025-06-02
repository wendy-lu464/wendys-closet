import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice.js'
import authApi from './features/auth/authApi.js'
import authReducer from './features/auth/authSlice.js'
import itemsApi from './features/items/itemsApi.js'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [itemsApi.reducerPath]: itemsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, itemsApi.middleware) // TODO Can't see this on the Redux tab in Chrome
})