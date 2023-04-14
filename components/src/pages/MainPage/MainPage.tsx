import { useAppSelector } from '../../state/hooks/redux';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import style from './MainPage.module.css';

const MainPage = () => {
  const { characters, isLoading, error } = useAppSelector((state) => state.characterReducer);

  return (
    <div className={style.container}>
      <h1>Search Bar & Cards</h1>
      <SearchBar placeholder="Input name..." />
      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className={style.characters}>
          {characters &&
            characters.map((character, index) => (
              <CharacterCard character={character} key={index}></CharacterCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
