import React, { Component } from 'react';
import styles from './Form.module.css';
import { FormProps, FormValueInterface, StateInterface } from './types';
import text from './constant';

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
      errors: {},
    });
    if (name.length < 3 || name.charAt(0) !== name.charAt(0).toUpperCase()) {
      this.setState({
        errors: {
          ...this.state.errors,
          name: text.errorItems[0],
        },
      });
      return;
    } else if (!(this.object.destinations.current as HTMLInputElement).value.length) {
      this.setState({
        errors: {
          ...this.state.errors,
          destinations: text.errorItems[1],
        },
      });
      return;
    } else if ((this.object.startDate.current as HTMLInputElement).value === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          date: text.errorItems[2],
        },
      });
      return;
    } else if ((this.object.travelStyle.current as HTMLSelectElement).value === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          style: text.errorItems[3],
        },
      });
      return;
    } else if (this.state.selectedOption === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          age: text.errorItems[4],
        },
      });
      return;
    } else if ((this.object.tourLength.current as HTMLInputElement).value === '' || days <= 0) {
      this.setState({
        errors: {
          ...this.state.errors,
          tourLength: text.errorItems[5],
        },
      });
      return;
    } else if ((this.object.pricePerDay.current as HTMLInputElement).value === '' || dayPrice < 0) {
      this.setState({
        errors: {
          ...this.state.errors,
          pricePerDay: text.errorItems[6],
        },
      });
      return;
    } else if ((this.object.discount.current as HTMLInputElement).value === '' || discount < 0) {
      this.setState({
        errors: {
          ...this.state.errors,
          discount: text.errorItems[7],
        },
      });
      return;
    } else if (this.object.imgUrl === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          img: text.errorItems[8],
        },
      });
      return;
    } else if (!(this.object.agree.current as HTMLInputElement).checked) {
      this.setState({
        errors: {
          ...this.state.errors,
          agree: text.errorItems[9],
        },
      });
      return;
    }
    this.props.onSubmit({
      title: name,
      startDate: (this.object.startDate.current as HTMLInputElement).value,
      description: (this.object.travelStyle.current as HTMLSelectElement).value,
      destinations: (this.object.destinations.current as HTMLInputElement).value,
      age: this.state.selectedOption,
      image: this.object.imgUrl,
      price: `${dayPrice * days}`,
      discountPercentage: discount,
      discountPrice: `${Math.floor((dayPrice * days * (100 - discount)) / 100)}`,
      save: +`${Math.floor(dayPrice * days - (dayPrice * days * (100 - discount)) / 100)}`,
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
            <span className={styles.error}>*{text.errorItems[0]}</span>
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
            <span className={styles.error}>*{text.errorItems[1]}</span>
          )}
        </label>
        <label>
          Start date:
          <input
            className={styles.form__item}
            type="date"
            ref={this.object.startDate}
            defaultValue=""
          />
          {this.state.errors?.date !== undefined && (
            <span className={styles.error}>*{text.errorItems[2]}</span>
          )}
        </label>
        <label>
          Travel Style:
          <select className={styles.form__item} defaultValue="" ref={this.object.travelStyle}>
            <option value="" disabled></option>
            {text.selectItems.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          {this.state.errors?.style !== undefined && (
            <span className={styles.error}>*{text.errorItems[3]}</span>
          )}
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
                  checked={this.state.selectedOption === radio}
                  onChange={this.onChangeValue}
                />
                {radio}
              </div>
            ))}
          </div>
          {this.state.errors?.age !== undefined && (
            <span className={styles.error}>*{text.errorItems[4]}</span>
          )}
        </label>
        <div className={styles.price}>
          <label className={styles.price__label}>
            Tour length:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              ref={this.object.tourLength}
            />
          </label>
          <label className={styles.price__label}>
            Price per day:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              ref={this.object.pricePerDay}
            />
          </label>
          <label className={styles.price__label}>
            Discount:
            <input
              className={styles.price__item}
              type="number"
              defaultValue=""
              ref={this.object.discount}
            />
          </label>
          <div>
            {this.state.errors?.tourLength !== undefined && (
              <span className={styles.error}>*{text.errorItems[5]}</span>
            )}
            {this.state.errors?.pricePerDay !== undefined && (
              <span className={styles.error}>*{text.errorItems[6]}</span>
            )}
            {this.state.errors?.discount !== undefined && (
              <span className={styles.error}>*{text.errorItems[7]}</span>
            )}
          </div>
        </div>
        <label className={styles.photo__container}>Add photo</label>
        <input type="file" ref={this.object.img} onChange={(e) => this.handleImageChange(e)} />
        {this.state.errors?.img !== undefined && (
          <div className={styles.error}>*{text.errorItems[8]}</div>
        )}
        <label>
          I agree with the rules of the site:
          <input
            className={styles.check}
            type="checkbox"
            ref={this.object.agree}
            defaultChecked={false}
          />
          {this.state.errors?.agree !== undefined && (
            <span className={styles.error}>*{text.errorItems[9]}</span>
          )}
        </label>
        <input className={styles.button} type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
