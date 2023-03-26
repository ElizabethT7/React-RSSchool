import React, { Component } from 'react';
import styles from './Form.module.css';
import { FormProps, FormValueInterface, StateInterface } from './types';

class Form extends Component<FormProps, StateInterface> {
  object: FormValueInterface;
  file!: Blob;
  checked!: string;
  constructor(props: FormProps) {
    super(props);
    this.state = {
      selectedOption: '',
      imagePreviewUrl: '',
      errors: {},
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
      radioItems: ['from 18 to 39 year olds', 'from 12to 59 year olds', 'any'],
      errorItems: [
        'Tour name mast be more then 3 symbols and starts with uppercased letter',
        'Destinations mast be input',
        'Date should be checked',
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(e: React.FormEvent) {
    this.setState({
      selectedOption: (e.target as HTMLInputElement).value,
    });
  }

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
    const name = (this.object.tourName.current as HTMLInputElement).value;
    const days = +(this.object.tourLength.current as HTMLInputElement).value;
    const dayPrice = +(this.object.pricePerDay.current as HTMLInputElement).value;
    const discount = +(this.object.discount.current as HTMLInputElement).value;
    this.setState({
      errors: {
        /*name: '',
        destinations: '',
        date: '',*/
      },
    });
    console.log('1', this.state.errors);
    if (name.length < 3 || name.charAt(0) !== name.charAt(0).toUpperCase()) {
      //alert('Tour name mast be more then 3 symbols and starts with uppercased letter');
      this.setState({
        errors: {
          ...this.state.errors,
          name: this.object.errorItems[0],
        },
      });
      return;
    } else if (!(this.object.destinations.current as HTMLInputElement).value.length) {
      //alert(this.object.errorItems[1]);
      this.setState({
        errors: {
          ...this.state.errors,
          destinations: this.object.errorItems[1],
        },
      });
      return;
    } else if ((this.object.startDate.current as HTMLInputElement).value === '') {
      //alert(this.object.errorItems[2]);
      this.setState({
        errors: {
          ...this.state.errors,
          date: this.object.errorItems[2],
        },
      });
      console.log(this.state.errors);
      return;
    }
    /*if (Object.keys(this.state.errors).length === 0) {
      alert('No errors');
    }*/
    console.log(this.state.errors);

    this.props.onSubmit({
      title: name,
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

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label>
          Tour name:
          <input
            className={styles.form__item}
            type="text"
            defaultValue=""
            ref={this.object.tourName}
          />
          {this.state.errors?.name !== undefined && (
            <span className={styles.error}>*{this.object.errorItems[0]}</span>
          )}
        </label>
        <label>
          Destinations:
          <input
            className={styles.form__item}
            type="text"
            defaultValue=""
            ref={this.object.destinations}
          />
          {this.state.errors?.destinations !== undefined && (
            <span className={styles.error}>*{this.object.errorItems[1]}</span>
          )}
        </label>
        <label htmlFor="startDate">
          Start date:
          <input
            className={styles.form__item}
            type="date"
            //name="startDate"
            ref={this.object.startDate}
            defaultValue=""
          />
          {this.state.errors?.date !== undefined /*&& this.state.errors?.date !== ''*/ && (
            <span className={styles.error}>*{this.object.errorItems[2]}</span>
          )}
        </label>
        <label /*htmlFor="travelStyle"*/>
          Travel Style:
          <select
            className={styles.form__item}
            defaultValue=""
            //name="travelStyle"
            ref={this.object.travelStyle}
          >
            <option value="" disabled></option>
            {this.object.selectItems.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select an age range
          <div className={styles.radio__container}>
            {this.object.radioItems.map((radio, index) => (
              <div className={styles.radio} key={index}>
                <input
                  type="radio"
                  name={index.toString()}
                  value={radio}
                  checked={this.state.selectedOption === radio}
                  onChange={this.onChangeValue}
                />
                {radio}
              </div>
            ))}
          </div>
        </label>
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
        <label className={styles.photo__container}>Add photo</label>
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
