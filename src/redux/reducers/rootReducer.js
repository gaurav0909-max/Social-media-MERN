import { combineReducers } from 'redux';
import dataSlice from './dataSlice';
import userProfileSlice from './userProfileSlice';

const rootReducer = combineReducers({
  data: dataSlice,
  userProfile: userProfileSlice,
});

export default rootReducer;