import SearchBar from '../../components/SearchBar/SearchBar';
import style from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={style.container}>
      <h1>Search Bar & Cards</h1>
      <SearchBar placeholder="Where do you want to go?" />
    </div>
  );
};

export default MainPage;
