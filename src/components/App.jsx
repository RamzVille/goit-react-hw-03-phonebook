import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // Calling local storage
  
// This React script is using two lifecycle methods, componentDidMount and componentDidUpdate, to interact with the local storage of the browser. It is primarily focused on managing and persisting the state of the contacts array in the component.

// Here's a breakdown of the script:

// componentDidMount()
// The componentDidMount lifecycle method is called after the component has been rendered for the first time.It's a good place to perform actions that need to happen once the component is mounted.

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts !== null) {
      // If something has already been saved in localStorage, we write THIS in the state
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

// Explanation:

// It retrieves the data stored in the local storage under the key 'contacts'.
// It checks if there's any data (savedContacts !== null).
// If data exists, it parses the JSON string and sets it as the initial state for the contacts array using this.setState.
// This ensures that if there are previously saved contacts in the local storage, they will be loaded into the component's state when the component is mounted.

// componentDidUpdate(_prevProps, prevState)
// The componentDidUpdate lifecycle method is called whenever the component updates, i.e., whenever setState is called.
  
  componentDidUpdate(_prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      // if a contact is new, set value to localStorage
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

// Explanation:

// It compares the current state of contacts with the previous state (prevState.contacts).
// If there's a difference (i.e., a new contact has been added or an existing one has been removed), it updates the local storage with the new state of the contacts array.
// This ensures that whenever the contacts array in the state is updated, the changes are reflected in the local storage. This approach is often used to persist data across page reloads or component unmounts, providing a form of client-side storage for the application.

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilter = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div style={{ margin: '50px auto', width: '500px', backgroundColor: 'rgb(255, 255, 255)', borderRadius:' 5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)' }}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter filter={filter} setFilter={this.setFilter} />
        <ContactList
          filterContact={this.filterContact}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}