import { combineReducers } from '@reduxjs/toolkit';
import userProfileSlice from './userProfileSlice';
import dataSlice from './dataSlice';


export const reducers = combineReducers({
    // Token: tokenReducer,
    userProfile: userProfileSlice,
    data:dataSlice
});



