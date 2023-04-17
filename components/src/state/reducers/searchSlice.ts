import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    submitValue(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export default searchSlice.reducer;
