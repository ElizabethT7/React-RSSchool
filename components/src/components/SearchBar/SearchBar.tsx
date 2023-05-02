import styles from './SearchBar.module.css';
import { useAppDispatch, useAppSelector } from '../../state/hooks/redux';
import { searchSlice } from '../../state/reducers/searchSlice';

interface SearchBarProps {
  placeholder: string;
  onSearch: (inputValue: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const { submitValue } = searchSlice.actions;
  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault;
    const value = event.target.value;
    dispatch(submitValue(value));
  };

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault;
    onSearch(searchValue);
  };

  const handleKey = (event: React.KeyboardEvent) => {
    event.preventDefault;
    if (event.code === 'Enter') {
      onSearch(searchValue);
    }
  };

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
