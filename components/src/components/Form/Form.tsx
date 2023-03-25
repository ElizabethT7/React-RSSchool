import React, { Component } from 'react';
import styles from './Form.module.css';
import { FormProps, FormValueInterface, StateInterface } from './types';
//import RadioButtons from './RadioButtons';

class Form extends Component<FormProps, StateInterface> {
  object: FormValueInterface;
  file!: Blob;
  checked!: string;
  constructor(props: FormProps) {
    super(props);
    this.state = {
      selectedOption: '',
      imagePreviewUrl: '',
    };
    this.object = {
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
      selectItems: ['Active Adventure', 'Beach', 'Private', 'Group', 'Fully Guided', 'Local'],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    //this.onChange = this.onChange.bind(this);
    /*for (let key in this.object) {
      [key] = React.createRef();
    }*/
    /*Object.keys(this.object).map((element: any) => {
      element = React.createRef();
      console.log(element);
    });*/
  }

  onChangeValue(e: React.FormEvent) {
    this.setState({
      selectedOption: (e.target as HTMLInputElement).value,
    });
  }

  /*onChange(value: string) {
    this.checked = value;
    return this.checked;
  }*/

  handleImageChange(e: React.BaseSyntheticEvent<HTMLInputElement> | React.FormEvent) {
    e.preventDefault();
    const reader = new FileReader();
    this.file = e.target.files[0];
    reader.onloadend = () => {
      this.object.imgUrl = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(this.checked);
    //console.log(this.onChange);
    if ((this.object.tourName.current as HTMLInputElement).value.length < 3) {
      alert('Tour name mast be more then 3 symbols;');
      return;
    } else {
      const days = +(this.object.tourLength.current as HTMLInputElement).value;
      const dayPrice = +(this.object.pricePerDay.current as HTMLInputElement).value;
      const discount = +(this.object.discount.current as HTMLInputElement).value;
      this.props.onSubmit({
        title: (this.object.tourName.current as HTMLInputElement).value,
        startDate: (this.object.startDate.current as HTMLInputElement).value,
        description: (this.object.travelStyle.current as HTMLSelectElement).value,
        destinations: (this.object.destinations.current as HTMLInputElement).value,
        age: this.state.selectedOption,
        image: this.object.imgUrl,
        price: `${dayPrice * days}`,
        discountPercentage: discount,
        discountPrice: `${(dayPrice * days * (100 - discount)) / 100}`,
        save: +`${dayPrice * days - (dayPrice * days * (100 - discount)) / 100}`,
        pricePerDay: dayPrice,
        tourLength: days,
      });
      alert('The data has been saved');
      (this.object.tourName.current as HTMLInputElement).value = '';
      (this.object.startDate.current as HTMLInputElement).value = '';
      (this.object.travelStyle.current as HTMLSelectElement).value = '';
      (this.object.tourLength.current as HTMLInputElement).value = '';
      (this.object.pricePerDay.current as HTMLInputElement).value = '';
      (this.object.discount.current as HTMLInputElement).value = '';
      (this.object.destinations.current as HTMLInputElement).value = '';
      (this.object.agree.current as HTMLInputElement).checked = false;
      this.object.imgUrl = '';
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
          ref={this.object.tourName}
        />
        <label htmlFor="destinations">Destinations:</label>
        <input
          className={styles.form__item}
          type="text"
          defaultValue=""
          name="destinations"
          ref={this.object.destinations}
        />
        <label htmlFor="startDate">Start date:</label>
        <input
          className={styles.form__item}
          type="date"
          name="startDate"
          ref={this.object.startDate}
          defaultValue=""
        />
        <label htmlFor="travelStyle">Travel Style:</label>
        <select
          className={styles.form__item}
          defaultValue=""
          name="travelStyle"
          ref={this.object.travelStyle}
        >
          <option value="" disabled></option>
          {this.object.selectItems.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
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

        <div className={styles.price}>
          <label htmlFor="tourLength" className={styles.price__label}>
            Tour length:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              name="tourLength"
              ref={this.object.tourLength}
            />
          </label>
          <label htmlFor="perDay" className={styles.price__label}>
            Price per day:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              name="perDay"
              ref={this.object.pricePerDay}
            />
          </label>
          <label htmlFor="discount" className={styles.price__label}>
            Discount:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              name="discount"
              ref={this.object.discount}
            />
          </label>
        </div>
        <label>Add photo</label>
        <input type="file" ref={this.object.img} onChange={(e) => this.handleImageChange(e)} />
        <label htmlFor="agree">
          I agree with the rules of the site:
          <input
            className={styles.check}
            type="checkbox"
            ref={this.object.agree}
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

//<RadioButtons onChange={this.onChange} />
