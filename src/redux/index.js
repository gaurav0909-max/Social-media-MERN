import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './reducers/tokenReducer'
import userProfileSlice from './reducers/userProfileSlice'

export const store = configureStore({
  reducer: {
    Token:tokenReducer,
    userProfile: userProfileSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})