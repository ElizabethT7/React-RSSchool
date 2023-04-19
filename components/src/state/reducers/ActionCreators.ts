import { AppDispatch } from '../store';
import { characterSlice } from './characterSlice';

export const fetchCharacters = (searchValue: string) => async (dispatch: AppDispatch) => {
  const url =
    searchValue === ''
      ? 'https://rickandmortyapi.com/api/character'
      : `https://rickandmortyapi.com/api/character/?name=${searchValue}`;
  dispatch(characterSlice.actions.charactersFetching());
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error('Could not fetch the data from this resource. Try input other name');
      }
      return response.json();
    })
    .then((data) => {
      dispatch(characterSlice.actions.charactersFetchingSuccess(data.results));
    })
    .catch((err) => {
      dispatch(characterSlice.actions.charactersFetchingError(err.message));
    });
};
