import { createSlice } from '@reduxjs/toolkit';
import { FormFieldsProps } from 'components/Form/types';

interface TourState {
  tours: FormFieldsProps[];
  //isLoading: boolean;
  //error: string;
}

const initialState: TourState = {
  tours: [],
  //isLoading: false,
  //error: ''
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
