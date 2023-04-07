import CharacterCard from '../../components/CharacterCard/CharacterCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import style from './MainPage.module.css';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const [characters, setCharacters] = useState([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const onSearch = (searchValue: string) => {
    setIsPending(true);
    console.log(searchValue);
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchValue}`)
      .then((res) => {
        if (!res.ok) {
          throw Error('Input other name');
        }
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data from this resource');
        }
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  return (
    <div className={style.container}>
      <h1>Search Bar & Cards</h1>
      <SearchBar placeholder="Input name..." onSearch={onSearch} />
      {error && <div>{error}</div>}
      {isPending ? (
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
