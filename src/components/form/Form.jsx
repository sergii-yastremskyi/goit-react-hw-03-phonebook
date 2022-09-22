import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './form.module.css';
class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };
  nameId = nanoid();
  phoneId = nanoid();
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <div className={css.formContainer}>
          <label htmlFor={this.nameId}>Name</label>
          <input
            id={this.nameId}
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
        </div>
        <div className={css.formContainer}>
          <label htmlFor={this.phoneId}>Phone</label>
          <input
            id={this.phoneId}
            onChange={this.handleChange}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default Form;
