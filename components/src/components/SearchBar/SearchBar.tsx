import React, { Component } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder: string;
}

class SearchBar extends Component<SearchBarProps, { value: string }> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({ value: (event.target as HTMLInputElement).value });
  }

  handleSubmit(event: React.FocusEvent<HTMLInputElement>) {
    localStorage.setItem('place', this.state.value);
    console.log('A place was submitted: ' + localStorage.getItem('place') || ' ');
    event.preventDefault();
  }

  componentWillUnmount(): void {
    localStorage.setItem('place', this.state.value);
  }

  render() {
    return (
      <div className={styles.search}>
        <div className={styles.search__ico}></div>
        <input
          className={styles.search__input}
          type="text"
          placeholder={this.props.placeholder}
          defaultValue={localStorage.getItem('place') || ''}
          onChange={this.handleChange}
          onBlur={this.handleSubmit}
        />
      </div>
    );
  }
}

export default SearchBar;
