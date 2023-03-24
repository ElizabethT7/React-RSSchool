import React, { Component } from 'react';
import Form from '../../components/Form/Form';
import { FormFieldsProps } from 'components/Form/types';
import styles from './ToursPage.module.css';
import Card from '../../components/Card/Card';

class ToursPage extends Component<FormFieldsProps, { cards: FormFieldsProps[] }> {
  constructor(props: FormFieldsProps) {
    super(props);
    this.state = {
      cards: [],
    };
  }
  onSubmit = (FormFields: FormFieldsProps) => {
    console.log(FormFields);
    this.setState({
      cards: [...this.state.cards, FormFields],
    });
  };

  render() {
    return (
      <section className={styles.tours}>
        <h2>Are you tour operator?</h2>
        <p>Complete form and leave information about the tour</p>
        <section className={styles.form__container}>
          <h3>Add new tour</h3>
          <Form onSubmit={this.onSubmit} />
        </section>
        <section>
          <h3>Tours</h3>
          <div className={styles.tours__container}>
            {this.state.cards.map((card, index) => (
              <div key={index} style={{ marginTop: 20 }}>
                <Card card={card} />
                <span className={styles.date}>Created: {card.startDate}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }
}

export default ToursPage;
