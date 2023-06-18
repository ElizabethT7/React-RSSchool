import SearchBar from '../../components/SearchBar/SearchBar';
import style from './ViewToursPage.module.css';
import Card from '../../components/Card/Card';
import data from '../../assets/data';

const ViewToursPage = () => {
  const onSearch = (inputValue: string) => {
    console.log(inputValue);
  };

  return (
    <main className={style.container}>
      <h1>Search Bar & Cards</h1>
      <SearchBar placeholder="Where do you want to go?" onSearch={onSearch} />
      <div className={style.cards}>
        {data.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </main>
  );
};

export default ViewToursPage;
