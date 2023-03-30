import styles from './Price.module.css';

interface PriceProps {
  tourLength: number;
  pricePerDay: number;
  save: number;
  price: string;
  discountPrice: string;
  discount: number;
}

const Price = (props: PriceProps) => {
  return (
    <div className={styles.price__container}>
      {props.discount !== 0 && <div className={styles.discount}>-{props.discount}%</div>}
      <div className={styles.details}>
        <div>
          <p className={styles.title}>Tour length</p>
          <p className={styles.amount}>{props.tourLength} days</p>
        </div>
        <div>
          <p className={styles.title}>Price per day</p>
          <p className={styles.amount}>€{props.pricePerDay}</p>
        </div>
      </div>
      <div>
        {props.discount !== 0 && (
          <div>
            <p style={{ marginBottom: 0 }}>From €{props.price}</p>
            <span className={styles.line}></span>
          </div>
        )}
        <p className={styles.price}>€{props.discountPrice}</p>
        {props.discount !== 0 && <p className={styles.title}>You save: {props.save}</p>}
      </div>
    </div>
  );
};

export default Price;
