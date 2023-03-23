import React, { Component } from 'react';
import styles from './Form.module.css';
import { FormProps } from './types';
import today from '../../utils/date';
import RadioButtons from './RadioButtons';

class Form /*<FormValueInterface>*/ extends Component<FormProps, { selectedOption: string }> {
  //object: FormValueInterface;
  tourName: React.RefObject<HTMLInputElement>;
  startDate: React.RefObject<HTMLInputElement>;
  travelStyle: React.RefObject<HTMLSelectElement>;
  age: React.RefObject<HTMLSelectElement>;
  constructor(props: FormProps) {
    super(props);
    this.state = {
      selectedOption: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.tourName = React.createRef();
    this.startDate = React.createRef();
    this.travelStyle = React.createRef();
    this.age = React.createRef();
  }

  onChangeValue(e: React.FormEvent) {
    this.setState({
      selectedOption: (e.target as HTMLInputElement).value,
    });
  }

  onChange(value: string) {
    console.log('1:', value);
    const a = value;
    return a;
  }

  handleSubmit(event: React.FormEvent) {
    const ageValue = this.onChange;
    console.log('2:', ageValue);
    event.preventDefault();
    this.props.onSubmit({
      tourName: (this.tourName.current as HTMLInputElement).value,
      startDate: (this.startDate.current as HTMLInputElement).value,
      travelStyle: (this.travelStyle.current as HTMLSelectElement).value,
      age: this.state.selectedOption,
    });
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
        <label htmlFor="startDate">Start date:</label>
        <input
          className={styles.form__item}
          type="date"
          name="startDate"
          ref={this.startDate}
          defaultValue={today}
        />
        <label htmlFor="travelStyle">Travel Style:</label>
        <select
          className={styles.form__item}
          defaultValue="adventure"
          name="travelStyle"
          ref={this.travelStyle}
        >
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
        <label htmlFor="agree">
          I agree:
          <input className={styles.check} type="checkbox" defaultValue="" name="agree" required />
        </label>
        <input className={styles.button} type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
