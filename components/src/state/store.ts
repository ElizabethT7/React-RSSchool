import * as toolkitRaw from '@reduxjs/toolkit';
import tourReducer from './reducers/tourSlice';
import characterReducer from './reducers/characterSlice';
import searchReducer from './reducers/searchSlice';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };

const { combineReducers, configureStore } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;

const rootReducer = combineReducers({
  tourReducer,
  characterReducer,
  searchReducer,
});

export const setupStore = (preloadedState?: toolkitRaw.PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
