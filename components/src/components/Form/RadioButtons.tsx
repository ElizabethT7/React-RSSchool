import React, { Component } from 'react';
//import styles from './Form.module.css';
import { RadioButtonsProps } from './types';

class RadioButtons extends Component<RadioButtonsProps, { selectedOption: string }> {
  age: React.RefObject<HTMLSelectElement>;
  constructor(props: RadioButtonsProps) {
    super(props);
    this.state = {
      selectedOption: ' ',
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.age = React.createRef();
  }

  onChangeValue(e: React.FormEvent) {
    this.setState({
      selectedOption: (e.target as HTMLInputElement).value,
    });
    console.log((e.target as HTMLInputElement).value);
    this.props.onChange((e.target as HTMLInputElement).value);
  }

  render() {
    return (
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
    );
  }
}

export default RadioButtons;
