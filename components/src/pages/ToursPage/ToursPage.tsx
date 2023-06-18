import { useState } from 'react';
import Form from '../../components/Form/Form';
import { FormFieldsProps } from 'components/Form/types';
import styles from './ToursPage.module.css';
import Card from '../../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../../state/hooks/redux';
import { tourSlice } from '../../state/reducers/tourSlice';

const ToursPage = () => {
  const [success, setSuccess] = useState(false);

  const { tours } = useAppSelector((state) => state.tourReducer);
  const { addTour } = tourSlice.actions;
  const dispatch = useAppDispatch();

  const onSubmit = (FormFields: FormFieldsProps) => {
    dispatch(addTour(FormFields));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5500);
  };

  return (
    <main className={styles.tours}>
      <h2>Are you tour operator?</h2>
      <p>Complete form and leave information about the tour</p>
      <section className={styles.form__container}>
        <h3>Add new tour</h3>
        <Form onSubmit={onSubmit} />
      </section>
      {success && <div className={styles.success}>The data has been saved</div>}
      <section>
        <h3>Tours</h3>
        <div className={styles.tours__container}>
          {tours.map((card, index) => (
            <div key={index} style={{ marginTop: 20 }}>
              <Card card={card} />
              <span className={styles.date}>Tour start: {card.startDate}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ToursPage;
