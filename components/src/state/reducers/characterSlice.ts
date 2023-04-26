import * as toolkitRaw from '@reduxjs/toolkit';
import ICharacter from '../../components/CharacterCard/types';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };

const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;

export interface CharacterState {
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
    charactersFetchingSuccess(
      state: CharacterState,
      action: toolkitRaw.PayloadAction<ICharacter[]>
    ) {
      state.isLoading = false;
      state.error = '';
      state.characters = action.payload;
    },
    charactersFetchingError(state: CharacterState, action: toolkitRaw.PayloadAction<string>) {
      state.isLoading = false;
      state.characters = [];
      state.error = action.payload;
    },
  },
});

export default characterSlice.reducer;
