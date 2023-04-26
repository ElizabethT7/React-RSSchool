import * as toolkitRaw from '@reduxjs/toolkit';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };

const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;

interface SearchState {
  search: string;
}

const initialState: SearchState = {
  search: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    submitValue(state, action: toolkitRaw.PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export default searchSlice.reducer;
