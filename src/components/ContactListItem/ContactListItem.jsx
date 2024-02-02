import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'; // Import Confirm from Notiflix
import { FaTrash } from 'react-icons/fa'; // Import FontAwesome icons

export const ContactListItem = ({ filteredContact, deleteContact }) => {
  // handleDelete method
  const handleDelete = () => {
      // deleteContact(filteredContact.id);
      //  Notify.success(`${filteredContact.name} was successfully deleted in your contacts!`, { position: 'center-top' });  
      //   return;
      // Show confirmation dialog
    Confirm.show(
      'Delete Contact',
      `Are you sure you want to delete ${filteredContact.name}?`,
      'Yes',
      'No',
      // {
      //   customCss: css.confirmBox, // Add custom CSS class
      // },
      () => {
        // If user clicks 'Yes', proceed with the deletion
        deleteContact(filteredContact.id);
        Notify.success(`${filteredContact.name} was successfully deleted in your contacts!`, { position: 'center-top' });
      },
      () => {
        // If user clicks 'No', do nothing
        Notify.info('Deletion canceled.', { position: 'center-top' });
      }
    );
  };

  return (
    <li className={css.contactListItem}>
      <p>{filteredContact.name}:</p>
      <p className={css.contactAlign}>{filteredContact.number}</p>
      <button className={css.btnDelete} onClick={handleDelete}> <FaTrash className={css.icon} /> Delete</button>
    </li>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};