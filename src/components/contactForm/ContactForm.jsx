import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
// import { saveContact } from '../../redux/contactsSlice';
import { addContact } from '../../redux/contactsSlice';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  //
  //
  // NEW
  const onSubmit = evt => {
    evt.preventDefault();

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  //
  //
  //NEW
  //
  //
  // const onSubmit = evt => {
  //   evt.preventDefault();

  //   const newContact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };

  //   if (
  //     contacts.some(
  //       contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
  //     )
  //   ) {
  //     alert(`${newContact.name} is already in contacts`);
  //   } else {
  //     dispatch(saveContact(newContact));
  //     setName('');
  //     setNumber('');
  //   }
  // };
  return (
    <form className={css.form} onSubmit={onSubmit}>
      <label className={css.formLabel}>
        Name
        <input
          className={css.formInput}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.formLabel}>
        Number
        <input
          className={css.formInput}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>

      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
