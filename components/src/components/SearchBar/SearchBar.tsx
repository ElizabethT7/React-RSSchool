import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder: string;
  onSearch: (inputValue: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('name') || '');
  const search = useRef<string>(searchValue);
  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault;
    setSearchValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    search.current = searchValue;
  }, [searchValue]);

  useEffect(() => {
    return () => {
      localStorage.setItem('name', search.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKey = (event: React.KeyboardEvent) => {
    event.preventDefault;
    if (event.code === 'Enter') {
      props.onSearch(searchValue);
    }
  };

  return (
    <div className={styles.search__container}>
      <div className={styles.search}>
        <div className={styles.search__ico}></div>
        <input
          className={styles.search__input}
          type="text"
          placeholder={props.placeholder}
          defaultValue={searchValue}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
      </div>
      <button className={styles.search__button} onClick={() => props.onSearch(searchValue)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
