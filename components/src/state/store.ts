import * as toolkitRaw from '@reduxjs/toolkit';
import tourReducer from './reducers/tourSlice';
import { characterApi } from './reducers/characterSlice';
import searchReducer from './reducers/searchSlice';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };

const { combineReducers, configureStore } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;

const rootReducer = combineReducers({
  tourReducer,
  searchReducer,
  [characterApi.reducerPath]: characterApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
