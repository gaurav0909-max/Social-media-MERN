import { combineReducers } from '@reduxjs/toolkit';
import userProfileSlice from './userProfileSlice';
import dataSlice from './dataSlice';
import postSlice from './postSlice'

export const reducers = combineReducers({
    // Token: tokenReducer,
    userProfile: userProfileSlice,
    data:dataSlice,
    post:postSlice
});



