import React, { Component } from 'react';
import ICard from './types';
import Description from './Description';
import styles from './Card.module.css';
import Price from './Price';

interface CardProps {
  card: ICard;
}

class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.card__img}>
          <img src={this.props.card.image} alt="product image" />
          <div className={styles.like}></div>
        </div>
        <div>
          <h3 className={styles.card__title}>{this.props.card.title}</h3>
          <Description title="Travel Style" description={this.props.card.description} />
          <Description title="Destinations" description={this.props.card.destinations} />
          <Description title="Age Range" description={this.props.card.age} />
        </div>
        <div>
          <Price
            tourLength={this.props.card.TourLength}
            pricePerDay={this.props.card.pricePerDay}
            save={this.props.card.save}
            price={this.props.card.price}
            discountPrice={this.props.card.discountPrice}
            discount={this.props.card.discountPercentage}
          />
          <button>View tour</button>
        </div>
      </div>
    );
  }
}

export default Card;
