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
  console.log(contacts);
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

// const fetchContacts = () => async dispatch => {
//   try {
//     dispatch(fetchingInProgress());
//     const response = await axios.get('/contacts');
//     dispatch(fetchingSuccess(response.data));
//   } catch (e) {
//     dispatch(fetchingError(e.message));
//   }
// };
// useEffect(() => {
//   dispatch(fetchContacts());
// }, [dispatch]);
// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/contacts');
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const addContact = createAsyncThunk(
//   'contacts/addcontacts',
//   async (text, thunkAPI) => {
//     try {
//       const response = await axios.post('/contacts', { text });
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (contactId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/contacts/${contactId}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
// новий код
//
//
//
//
//

//
//
//
//
// новий код

// useEffect(() => {
//   const storedContacts = JSON.parse(localStorage.getItem('contacts'));
//   if (storedContacts) {
//     dispatch(saveContact(storedContacts));
//   }
// }, [dispatch]);

// useEffect(() => {
//   localStorage.clear();
//   localStorage.setItem('contacts', JSON.stringify(contacts));
// }, [contacts]);

// import {
//   deleteContacts,
//   saveContact,
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
// } from '../../redux/contactsSlice';

// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
