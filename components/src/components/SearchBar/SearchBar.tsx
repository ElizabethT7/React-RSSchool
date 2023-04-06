import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('place') || '');
  const search = useRef<string>(searchValue);
  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setSearchValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    search.current = searchValue;
  }, [searchValue]);

  useEffect(() => {
    return () => {
      localStorage.setItem('place', search.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles.search__ico}></div>
      <input
        className={styles.search__input}
        type="text"
        placeholder={props.placeholder}
        defaultValue={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
