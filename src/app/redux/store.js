import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import apiReducer from './slices/apiSlice';

const rootReducer = combineReducers({
  user: userReducer,
  api: apiReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
