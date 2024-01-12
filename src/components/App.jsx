import { useEffect } from 'react';
import ContactForm from 'components/contactForm/ContactForm';
import ContactList from 'components/contactList/ContactList';
import Filter from 'components/filter/Filter';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveContact } from '../redux/contactsSlice';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      dispatch(saveContact(storedContacts));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgb(59, 55, 55)',
      }}
    >
      <div className={css.container}>
        <h1 className={css.titlePage}>Phonebook</h1>
        <ContactForm />

        <h2 className={css.titleList}>Contacts:</h2>

        <ContactList />

        <Filter />
      </div>
    </div>
  );
}
