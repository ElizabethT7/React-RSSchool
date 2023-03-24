import React, { Component } from 'react';
import styles from './Form.module.css';
import { FormProps, StateInterface } from './types';
import RadioButtons from './RadioButtons';

class Form /*<FormValueInterface>*/ extends Component<FormProps, StateInterface> {
  //object: FormValueInterface;
  tourName: React.RefObject<HTMLInputElement>;
  startDate: React.RefObject<HTMLInputElement>;
  travelStyle: React.RefObject<HTMLSelectElement>;
  age: React.RefObject<HTMLSelectElement>;
  img: React.RefObject<HTMLInputElement>;
  imgUrl!: string;
  file!: Blob;
  destinations: React.RefObject<HTMLInputElement>;
  tourLength: React.RefObject<HTMLInputElement>;
  pricePerDay: React.RefObject<HTMLInputElement>;
  discount: React.RefObject<HTMLInputElement>;
  checked!: string;
  agree: React.RefObject<HTMLInputElement>;
  constructor(props: FormProps) {
    super(props);
    this.state = {
      selectedOption: '',
      imagePreviewUrl: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.tourName = React.createRef();
    this.startDate = React.createRef();
    this.travelStyle = React.createRef();
    this.age = React.createRef();
    this.img = React.createRef();
    this.destinations = React.createRef();
    this.tourLength = React.createRef();
    this.pricePerDay = React.createRef();
    this.discount = React.createRef();
    this.agree = React.createRef();
  }

  onChangeValue(e: React.FormEvent) {
    this.setState({
      selectedOption: (e.target as HTMLInputElement).value,
    });
  }

  onChange(value: string) {
    this.checked = value;
    return this.checked;
  }

  handleImageChange(e: React.BaseSyntheticEvent<HTMLInputElement> | React.FormEvent) {
    e.preventDefault();
    const reader = new FileReader();
    this.file = e.target.files[0];
    reader.onloadend = () => {
      this.imgUrl = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(this.checked);
    if ((this.tourName.current as HTMLInputElement).value.length < 3) {
      alert('Tour name mast be more then 3 symbols;');
      return;
    } else {
      const days = +(this.tourLength.current as HTMLInputElement).value;
      const dayPrice = +(this.pricePerDay.current as HTMLInputElement).value;
      const discount = +(this.discount.current as HTMLInputElement).value;
      this.props.onSubmit({
        title: (this.tourName.current as HTMLInputElement).value,
        startDate: (this.startDate.current as HTMLInputElement).value,
        description: (this.travelStyle.current as HTMLSelectElement).value,
        destinations: (this.destinations.current as HTMLInputElement).value,
        age: this.state.selectedOption,
        image: this.imgUrl,
        price: `${dayPrice * days}`,
        discountPercentage: discount,
        discountPrice: `${(dayPrice * days * (100 - discount)) / 100}`,
        save: +`${dayPrice * days - (dayPrice * days * (100 - discount)) / 100}`,
        pricePerDay: dayPrice,
        tourLength: days,
      });
      alert('The data has been saved');
      (this.tourName.current as HTMLInputElement).value = '';
      (this.startDate.current as HTMLInputElement).value = '';
      (this.travelStyle.current as HTMLSelectElement).value = '';
      (this.tourLength.current as HTMLInputElement).value = '';
      (this.pricePerDay.current as HTMLInputElement).value = '';
      (this.discount.current as HTMLInputElement).value = '';
      (this.destinations.current as HTMLInputElement).value = '';
      (this.agree.current as HTMLInputElement).checked = false;
      this.imgUrl = '';
      this.setState({
        selectedOption: '',
      });
    }
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label htmlFor="tourName">Tour name:</label>
        <input
          className={styles.form__item}
          type="text"
          defaultValue=""
          name="tourName"
          ref={this.tourName}
        />
        <label htmlFor="destinations">Destinations:</label>
        <input
          className={styles.form__item}
          type="text"
          defaultValue=""
          name="destinations"
          ref={this.destinations}
        />
        <label htmlFor="startDate">Start date:</label>
        <input
          className={styles.form__item}
          type="date"
          name="startDate"
          ref={this.startDate}
          defaultValue=""
        />
        <label htmlFor="travelStyle">Travel Style:</label>
        <select
          className={styles.form__item}
          defaultValue=""
          name="travelStyle"
          ref={this.travelStyle}
        >
          <option value="" disabled></option>
          <option value="Active Adventure">Active Adventure</option>
          <option value="beach">Beach</option>
          <option value="private">Private</option>
          <option value="group">Group</option>
          <option value="guider">Fully Guided</option>
          <option value="local">Local Living</option>
        </select>
        <label>Select an age range</label>
        <div>
          <input
            type="radio"
            value="18 to 39 year olds"
            checked={this.state.selectedOption === '18 to 39 year olds'}
            onChange={this.onChangeValue}
          />
          18 to 39 year olds
          <input
            type="radio"
            value="12 to 59 year olds"
            checked={this.state.selectedOption === '12 to 59 year olds'}
            onChange={this.onChangeValue}
          />
          12 to 59 year olds
          <input
            type="radio"
            value="any"
            checked={this.state.selectedOption === 'any'}
            onChange={this.onChangeValue}
          />
          any
        </div>
        <RadioButtons onChange={this.onChange} />
        <div className={styles.price}>
          <label htmlFor="tourLength" className={styles.price__label}>
            Tour length:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              name="tourLength"
              ref={this.tourLength}
            />
          </label>
          <label htmlFor="perDay" className={styles.price__label}>
            Price per day:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              name="perDay"
              ref={this.pricePerDay}
            />
          </label>
          <label htmlFor="discount" className={styles.price__label}>
            Discount:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              name="discount"
              ref={this.discount}
            />
          </label>
        </div>
        <label>Add photo</label>
        <input type="file" ref={this.img} onChange={(e) => this.handleImageChange(e)} />
        <label htmlFor="agree">
          I agree with the rules of the site:
          <input
            className={styles.check}
            type="checkbox"
            ref={this.agree}
            defaultChecked={false}
            required
          />
        </label>
        <input className={styles.button} type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
