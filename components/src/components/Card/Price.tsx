import { Component } from 'react';
import styles from './Price.module.css';

interface PriceProps {
  tourLength: number;
  pricePerDay: number;
  save: number;
  price: string;
  discountPrice: string;
  discount: number;
}

class Price extends Component<PriceProps> {
  constructor(props: PriceProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.price__container}>
        <div className={styles.discount}>-{this.props.discount}%</div>
        <div className={styles.details}>
          <div>
            <p className={styles.title}>Tour length</p>
            <p className={styles.amount}>{this.props.tourLength} days</p>
          </div>
          <div>
            <p className={styles.title}>Price per day</p>
            <p className={styles.amount}>€{this.props.pricePerDay}</p>
          </div>
        </div>
        <div>
          <p style={{ marginBottom: 0 }}>From €{this.props.price}</p>
          <span className={styles.line}></span>
          <p className={styles.price}>€{this.props.discountPrice}</p>
          <p className={styles.title}>You save: {this.props.save}</p>
        </div>
      </div>
    );
  }
}

export default Price;
