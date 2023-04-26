import * as toolkitRaw from '@reduxjs/toolkit';
//import { createSlice } from '@reduxjs/toolkit';
import { FormFieldsProps } from 'components/Form/types';

//import { configureStore } from '@reduxjs/toolkit';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };

const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;

interface TourState {
  tours: FormFieldsProps[];
}

const initialState: TourState = {
  tours: [],
};

export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    addTour(state: TourState, action) {
      state.tours.push(action.payload);
    },
  },
});

export default tourSlice.reducer;
