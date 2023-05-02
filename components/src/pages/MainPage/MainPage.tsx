import { useAppDispatch, useAppSelector } from '../../state/hooks/redux';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { searchSlice } from '../../state/reducers/searchSlice';
import style from './MainPage.module.css';
import { characterApi } from '../../state/reducers/characterSlice';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { submitValue } = searchSlice.actions;
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const {
    data: characters,
    error,
    isLoading,
  } = characterApi.useFetchAllCharactersQuery({ searchValue });
  const onSearch = (inputValue: string) => {
    dispatch(submitValue(inputValue));
  };

  return (
    <div className={style.container}>
      <h1>Search Bar & Cards</h1>
      <SearchBar placeholder="Input name..." onSearch={onSearch} />
      {error && <div>Could not fetch the data from this resource. Try input other name</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className={style.characters}>
          {characters &&
            characters.results.map((character, index) => (
              <CharacterCard character={character} key={index}></CharacterCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
