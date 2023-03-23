import Form from '../../components/Form/Form';
import { FormFieldsProps } from 'components/Form/types';
import styles from './ToursPage.module.css';

const ToursPage = () => {
  const onSubmit = (FormFields: FormFieldsProps) => {
    console.log(FormFields);
  };

  return (
    <section>
      <h2>Are you tour operator?</h2>
      <p>Complete form and leave information about the tour</p>
      <section className={styles.form__container}>
        <h3>Add new tour</h3>
        <Form onSubmit={onSubmit} />
      </section>
      <section>
        <h3>Tours</h3>
        <div className={styles.tours__container}></div>
      </section>
    </section>
  );
};

export default ToursPage;
