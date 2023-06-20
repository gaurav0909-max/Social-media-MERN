import { combineReducers } from '@reduxjs/toolkit';
import userProfileSlice from './userProfileSlice';
import dataSlice from './dataSlice';
import PostReducer from './PostReducer';


export const reducers = combineReducers({
    // Token: tokenReducer,
    userProfile: userProfileSlice,
    data:dataSlice,
    post:PostReducer,
});



