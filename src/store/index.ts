import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './message/reducer'
import isLoadingReducer from './isLoading/reducer'
import productsReducer from './products/reducer'
import userReducer from './user/reducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    isLoading: isLoadingReducer,
    products: productsReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
