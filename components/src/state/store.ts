import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tourReducer from './reducers/tourSlice';

const rootReducer = combineReducers({
  tourReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
