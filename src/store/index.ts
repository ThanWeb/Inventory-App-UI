import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './message/reducer'
import isLoadingReducer from './isLoading/reducer'
import productsReducer from './products/reducer'
import userReducer from './user/reducer'
import transactionsReducer from './transactions/reducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    isLoading: isLoadingReducer,
    products: productsReducer,
    user: userReducer,
    transactions: transactionsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
