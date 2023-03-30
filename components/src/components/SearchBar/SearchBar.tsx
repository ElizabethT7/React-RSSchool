import React, { RefObject, useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('place') || '');

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setSearchValue((event.target as HTMLInputElement).value);
  };

  const search = useRef<string | RefObject<HTMLInputElement>>();

  useEffect(() => {
    search.current = searchValue;
    return () => {
      localStorage.setItem('place', searchValue || '');
    };
  }, [searchValue]);

  /*useEffect(() => {
    return () => {
      localStorage.setItem('place', search.current || '');
    };
  }, []);*/

  return (
    <div className={styles.search}>
      <div className={styles.search__ico}></div>
      <input
        className={styles.search__input}
        type="text"
        placeholder={props.placeholder}
        defaultValue={searchValue}
        onChange={handleChange}
        ref={search}
      />
    </div>
  );
};

export default SearchBar;
