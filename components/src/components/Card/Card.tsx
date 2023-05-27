import { ICard } from './types';
import Description from './Description';
import styles from './Card.module.css';
import Price from './Price';
interface CardProps {
  card: ICard;
}

const Card = ({ card }: CardProps) => {
  return (
    <div className={styles.card} data-testid="card">
      <div className={styles.card__img}>
        <img src={card.image} alt="product image" />
        <div className={styles.like}></div>
      </div>
      <div>
        <h3 className={styles.card__title}>{card.title}</h3>
        <Description title="Travel Style" description={card.description} />
        <Description title="Destinations" description={card.destinations} />
        <Description title="Age Range" description={card.age} />
      </div>
      <div>
        <Price
          tourLength={card.tourLength}
          pricePerDay={card.pricePerDay}
          save={card.save}
          price={card.price}
          discountPrice={card.discountPrice}
          discount={card.discountPercentage}
        />
        <button>View tour</button>
      </div>
    </div>
  );
};

export default Card;
