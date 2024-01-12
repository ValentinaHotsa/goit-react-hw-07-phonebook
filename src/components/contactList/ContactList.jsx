import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const findContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const deleteContact = id => {
    dispatch(deleteContacts(id));
  };
  return (
    <div className={css.containerList}>
      <ul className={css.contactList}>
        {findContacts.map(({ id, name, number }) => (
          <li className={css.contactItem} key={id}>
            {name}: {number}
            <button
              className={css.buttonDelete}
              type="button"
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
