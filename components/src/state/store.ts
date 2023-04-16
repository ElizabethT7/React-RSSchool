import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import tourReducer from './reducers/tourSlice';
import characterReducer from './reducers/characterSlice';

const rootReducer = combineReducers({
  tourReducer,
  characterReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
