import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './components/shared/shared.module.css';
import './App.css';
import { css } from 'styled-components';
import Form from './components/form/';
import ContactsList from './components/contactsList/';
import Filter from './components/filter';

class App extends Component {
  static defaultProps = {
    contacts: '',
    name: '',
  };

  static propTypes = {};

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    filter: '',
  };

  formSubmitHandler = data => {
    const { name, number } = data;

    this.state.contacts.map(contact => {
      if (contact.name === name) {
        alert(`${name} already in contacts`);
      }
    });

    this.setState(prev => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return {
        contacts: [...prev.contacts, newContact],
      };
    });

    // this.setState(prev => {{ const id = nanoid(); }
    //   return{
    //   contacts: [...prev.contacts, { id: 55, name, number }],
    // };
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  handleDelete = id => {
    this.setState(prev => {
      const newContacts = prev.contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <div className={(styles.container, styles.border)}>
          <h1>Phonebook</h1>
          <Form onSubmit={this.formSubmitHandler} />
        </div>
        <div className={styles.container}>
          <h1>Contacts</h1>
          <Filter
            className={css.filter}
            value={filter}
            onChange={this.changeFilter}
          />
          <ContactsList
            className={styles.contactList}
            onDelete={this.handleDelete}
            contacts={visibleContacts}
          />
        </div>
      </>
    );
  }
}

export default App;
