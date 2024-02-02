import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FaUser, FaPhoneAlt } from 'react-icons/fa'; // Import FontAwesome icons

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleNumberChange = e => {
    this.setState({
      number: e.target.value,
    });
  };

  handleSubmit = e => {
    // prevent the form refreshing when submitting
    e.preventDefault();
    const { name, number } = this.state;
    const { addContact, contacts } = this.props;

    // if name and number is empty, it will not submit(return)
    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    // if existing contact set an alert, it will not submit(return)
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
        
         Notify.failure(`${name} is already in your contacts!`, { position: 'center-top' });  
        return;
      }
       else {
              Notify.success(`${name} is successfully added to your contacts!`, { position: 'center-top' });
        }

    // Add Contact
    addContact({
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    });

    // Reset Form Fields upon submitting
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.formField}>
          <p className={css.formLabel}>Name</p>
          <div className={css.inputContainer}>
            <FaUser className={css.icon} />
            <input
              type="text"
              name="name"
              // add \ before - in [' \-] to make it work (LMS)
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
              required
              value={name}
              onChange={this.handleNameChange}
            />
          </div>
        </label>
        
        <label className={css.formField}>
          <p className={css.formLabel}>Number</p>
          <div className={css.inputContainer}>
            <FaPhoneAlt className={css.icon} />
            <input
              type="tel"
              name="number"
              // add \ before - in [\-.\s] to make it work (LMS)
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleNumberChange}
            />
          </div>
        </label>
        <button className={css.btnSubmit} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}