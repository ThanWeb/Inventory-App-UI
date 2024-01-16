import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './message/reducer'
import isLoadingReducer from './isLoading/reducer'
import productsReducer from './products/reducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    isLoading: isLoadingReducer,
    products: productsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
