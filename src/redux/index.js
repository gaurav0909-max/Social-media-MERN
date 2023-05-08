import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './reducers/tokenReducer'

export const store = configureStore({
  reducer: {
    Token:tokenReducer,
  },
})