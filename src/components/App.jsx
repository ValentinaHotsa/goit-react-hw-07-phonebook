import ContactForm from 'components/contactForm/ContactForm';
import ContactList from 'components/contactList/ContactList';
import Filter from 'components/filter/Filter';
import css from './App.module.css';

export function App() {
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
