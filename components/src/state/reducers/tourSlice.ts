import { createSlice } from '@reduxjs/toolkit';
import { FormFieldsProps } from 'components/Form/types';

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
