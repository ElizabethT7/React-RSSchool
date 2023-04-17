import React, { useEffect } from 'react';
import styles from './SearchBar.module.css';
import { fetchCharacters } from '../../state/reducers/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../state/hooks/redux';
import { searchSlice } from '../../state/reducers/searchSlice';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const { search } = useAppSelector((state) => state.searchReducer);
  const { submitValue } = searchSlice.actions;
  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault;
    const value = event.target.value;
    dispatch(submitValue(value));
  };

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault;
    dispatch(fetchCharacters(search));
  };

  const dispatch = useAppDispatch();

  const handleKey = (event: React.KeyboardEvent) => {
    event.preventDefault;
    if (event.code === 'Enter') {
      dispatch(fetchCharacters(search));
    }
  };

  useEffect(() => {
    dispatch(fetchCharacters(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.search__container}>
      <div className={styles.search}>
        <div className={styles.search__ico}></div>
        <input
          className={styles.search__input}
          type="text"
          placeholder={placeholder}
          defaultValue={search}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
      </div>
      <button className={styles.search__button} onClick={onClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
