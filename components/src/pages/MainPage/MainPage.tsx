import SearchBar from '../../components/SearchBar/SearchBar';
import style from './MainPage.module.css';
import Card from '../../components/Card/Card';
import data from '../../assets/data';

const MainPage = () => {
  return (
    <div className={style.container}>
      <h1>Search Bar & Cards</h1>
      <SearchBar placeholder="Where do you want to go?" />
      <div className={style.cards}>
        {data.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
