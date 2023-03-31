import React, { useState } from 'react';
import styles from './Form.module.css';
import { FormProps, FormValueInterface } from './types';
import text from './constant';

const Form = (props: FormProps) => {
  const object: FormValueInterface = {
    tourName: React.createRef(),
    startDate: React.createRef(),
    travelStyle: React.createRef(),
    age: React.createRef(),
    img: React.createRef(),
    destinations: React.createRef(),
    tourLength: React.createRef(),
    pricePerDay: React.createRef(),
    discount: React.createRef(),
    agree: React.createRef(),
    imgUrl: '',
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    destinations: '',
    date: '',
    style: '',
    age: '',
    tourLength: '',
    pricePerDay: '',
    discount: '',
    img: '',
    agree: '',
  });
  let file!: Blob;

  const onChangeValue = (e: React.FormEvent) => {
    setSelectedOption((e.target as HTMLInputElement).value);
  };

  const handleImageChange = (e: React.BaseSyntheticEvent<HTMLInputElement> | React.FormEvent) => {
    e.preventDefault();
    const reader = new FileReader();
    file = e.target.files[0];
    reader.onloadend = () => {
      object.imgUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const name = (object.tourName.current as HTMLInputElement).value;
    const days = +(object.tourLength.current as HTMLInputElement).value;
    const dayPrice = +(object.pricePerDay.current as HTMLInputElement).value;
    const discount = +(object.discount.current as HTMLInputElement).value;
    setErrors({
      name: '',
      destinations: 'string',
      date: 'string',
      style: 'string',
      age: 'string',
      tourLength: 'string',
      pricePerDay: 'string',
      discount: 'string',
      img: 'string',
      agree: 'string',
    });
    if (name.length < 3 || name.charAt(0) !== name.charAt(0).toUpperCase()) {
      setErrors({ ...errors, name: text.errorItems[0] });
      return;
    } else setErrors({ ...errors, name: 'text.errorItems[0]' });
    if (!(object.destinations.current as HTMLInputElement).value.length) {
      setErrors({ ...errors, destinations: text.errorItems[1] });
      return;
    } else setErrors({ ...errors, date: '' });
    if ((object.startDate.current as HTMLInputElement).value === '') {
      setErrors({ ...errors, date: text.errorItems[2] });
      return;
    }

    if ((object.travelStyle.current as HTMLSelectElement).value === '') {
      setErrors({ ...errors, style: text.errorItems[3] });
      return;
    } else setErrors({ ...errors, style: '' });

    /*(object.travelStyle.current as HTMLSelectElement).value === ''
      ? setErrors({ ...errors, style: text.errorItems[3] })
      : setErrors({ ...errors, style: '' });
    return;*/
    if (selectedOption === '') {
      setErrors({ ...errors, age: text.errorItems[4] });
      return;
    }
    if ((object.tourLength.current as HTMLInputElement).value === '' || days <= 0) {
      setErrors({ ...errors, tourLength: text.errorItems[5] });
      return;
    }
    if ((object.pricePerDay.current as HTMLInputElement).value === '' || dayPrice < 0) {
      setErrors({ ...errors, pricePerDay: text.errorItems[6] });
      return;
    }
    if ((object.discount.current as HTMLInputElement).value === '' || discount < 0) {
      setErrors({ ...errors, discount: text.errorItems[7] });
      return;
    }
    if (object.imgUrl === '') {
      setErrors({ ...errors, img: text.errorItems[8] });
      return;
    }
    if (!(object.agree.current as HTMLInputElement).checked) {
      setErrors({ ...errors, agree: text.errorItems[9] });
      return;
    }
    props.onSubmit({
      title: name,
      startDate: (object.startDate.current as HTMLInputElement).value,
      description: (object.travelStyle.current as HTMLSelectElement).value,
      destinations: (object.destinations.current as HTMLInputElement).value,
      age: selectedOption,
      image: object.imgUrl,
      price: `${dayPrice * days}`,
      discountPercentage: discount,
      discountPrice: `${Math.floor((dayPrice * days * (100 - discount)) / 100)}`,
      save: +`${Math.floor(dayPrice * days - (dayPrice * days * (100 - discount)) / 100)}`,
      pricePerDay: dayPrice,
      tourLength: days,
    });

    alert('The data has been saved');
    (object.tourName.current as HTMLInputElement).value = '';
    (object.startDate.current as HTMLInputElement).value = '';
    (object.travelStyle.current as HTMLSelectElement).value = '';
    (object.tourLength.current as HTMLInputElement).value = '';
    (object.pricePerDay.current as HTMLInputElement).value = '';
    (object.discount.current as HTMLInputElement).value = '';
    (object.destinations.current as HTMLInputElement).value = '';
    (object.agree.current as HTMLInputElement).checked = false;
    object.imgUrl = '';
    setSelectedOption('');
    setErrors({
      name: '',
      destinations: '',
      date: '',
      style: '',
      age: '',
      tourLength: '',
      pricePerDay: '',
      discount: '',
      img: '',
      agree: '',
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Tour name:
        <input
          className={styles.form__item}
          type="text"
          defaultValue=""
          ref={object.tourName}
          data-testid="name"
        />
        <span className={styles.error}>*{errors.name}</span>
      </label>
      <label>
        Destinations:
        <input
          className={styles.form__item}
          type="text"
          defaultValue=""
          ref={object.destinations}
        />
        {errors?.destinations !== undefined && (
          <span className={styles.error}>*{errors.destinations}</span>
        )}
      </label>
      <label>
        Start date:
        <input className={styles.form__item} type="date" ref={object.startDate} defaultValue="" />
        {errors?.date !== undefined && <span className={styles.error}>{errors.date}</span>}
      </label>
      <label>
        Travel Style:
        <select className={styles.form__item} defaultValue="" ref={object.travelStyle}>
          <option value="" disabled></option>
          {text.selectItems.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        {errors?.style !== undefined && <span className={styles.error}>*{errors.style}</span>}
      </label>
      <label>
        Select an age range
        <div className={styles.radio__container}>
          {text.radioItems.map((radio, index) => (
            <div className={styles.radio} key={index}>
              <input
                type="radio"
                name={index.toString()}
                value={radio}
                checked={selectedOption === radio}
                onChange={onChangeValue}
              />
              {radio}
            </div>
          ))}
        </div>
        {errors?.age !== undefined && <span className={styles.error}>{errors.age}</span>}
      </label>
      <div className={styles.price}>
        <label className={styles.price__label}>
          Tour length:
          <input
            className={styles.price__item}
            type="number"
            defaultValue=""
            ref={object.tourLength}
            data-testid="number"
          />
        </label>
        <label className={styles.price__label}>
          Price per day:
          <input
            className={styles.price__item}
            type="number"
            defaultValue=""
            ref={object.pricePerDay}
          />
        </label>
        <label className={styles.price__label}>
          Discount:
          <input
            className={styles.price__item}
            type="number"
            defaultValue=""
            ref={object.discount}
          />
        </label>
        <div>
          {errors?.tourLength !== undefined && (
            <span className={styles.error}>{errors.tourLength}</span>
          )}
          {errors?.pricePerDay !== undefined && (
            <span className={styles.error}>{errors.pricePerDay}</span>
          )}
          {errors?.discount !== undefined && (
            <span className={styles.error}>{errors.discount}</span>
          )}
        </div>
      </div>
      <label className={styles.photo__container}>Add photo</label>
      <input type="file" ref={object.img} onChange={(e) => handleImageChange(e)} />
      {errors?.img !== undefined && <div className={styles.error}>{errors.img}</div>}
      <label>
        I agree with the rules of the site:
        <input className={styles.check} type="checkbox" ref={object.agree} defaultChecked={false} />
        {errors?.agree !== undefined && <span className={styles.error}>{errors.agree}</span>}
      </label>
      <input className={styles.button} type="submit" value="Submit" />
    </form>
  );
};

export default Form;
