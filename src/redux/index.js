import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './reducers/tokenReducer'
import userProfileSlice from './reducers/userProfileSlice'
import dataSlice from './reducers/dataSlice'

export const store = configureStore({
  reducer: {
    Token: tokenReducer,
    userProfile: userProfileSlice,
    data: dataSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})