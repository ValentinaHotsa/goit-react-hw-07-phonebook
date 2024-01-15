import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/operations';
import { useEffect } from 'react';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const findContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.containerList}>
      {isLoading && !error && <b>Request in progress...</b>}
      <ul className={css.contactList}>
        {findContacts.map(({ id, name, number }) => (
          <li className={css.contactItem} key={id}>
            {name}: {number}
            <button
              className={css.buttonDelete}
              type="button"
              onClick={() => removeContact(id)}
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
