import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';
import { fetchCharacters } from '../../state/reducers/ActionCreators';
import { useAppDispatch } from '../../state/hooks/redux';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const search = useRef<string>(searchValue);
  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault;
    setSearchValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    search.current = searchValue;
  }, [searchValue]);

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault;
    dispatch(fetchCharacters(searchValue));
  };

  const dispatch = useAppDispatch();

  const handleKey = (event: React.KeyboardEvent) => {
    event.preventDefault;
    if (event.code === 'Enter') {
      dispatch(fetchCharacters(searchValue));
    }
  };

  useEffect(() => {
    dispatch(fetchCharacters(searchValue));
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
          defaultValue={searchValue}
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
