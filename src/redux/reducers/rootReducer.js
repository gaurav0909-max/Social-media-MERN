import { combineReducers } from 'redux';
import dataSlice from './dataSlice';
import userProfileSlice from './userProfileSlice';
import postSlice from './postSlice'
const rootReducer = combineReducers({
  data: dataSlice,
  userProfile: userProfileSlice,
  post:postSlice
});

export default rootReducer;