import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ICharacter from '../../components/CharacterCard/types';

interface CharacterState {
  characters: ICharacter[];
  isLoading: boolean;
  error: string;
}

const initialState: CharacterState = {
  characters: [],
  isLoading: false,
  error: '',
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    charactersFetching(state: CharacterState) {
      state.isLoading = true;
    },
    charactersFetchingSuccess(state: CharacterState, action: PayloadAction<ICharacter[]>) {
      state.isLoading = false;
      state.error = '';
      state.characters = action.payload;
    },
    charactersFetchingError(state: CharacterState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.characters = [];
      state.error = action.payload;
    },
  },
});

export default characterSlice.reducer;
