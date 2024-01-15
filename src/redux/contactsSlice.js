import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import {
//   fetchContacts,
//   addContact,
//   deleteContact,
// } from 'components/contactList/ContactList';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get(
    'https://65a5007652f07a8b4a3e2170.mockapi.io/contacts'
  );
  return response.data;
});

export const addContact = createAsyncThunk(
  'contacts/addcontact',
  async contact => {
    const response = await axios.post(
      'https://65a5007652f07a8b4a3e2170.mockapi.io/contacts',
      contact
    );
    return response.data;
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await axios.delete(
      `https://65a5007652f07a8b4a3e2170.mockapi.io/contacts/${id}`
    );
    return id;
  }
);
export const filterContacts = createAsyncThunk(
  'contacts/filterContacts',
  async (value, thunkAPI) => {
    try {
      const response = axios.get(
        `https://65a5007652f07a8b4a3e2170.mockapi.io/contacts/${value}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
    filter: '',
  },

  // reducers: {
  // saveContact: (state, action) => {
  //   const newContacts = Array.isArray(action.payload)
  //     ? action.payload
  //     : [action.payload];
  //   const nonEmptyContacts = newContacts
  //     .filter(contact => contact && contact.name && contact.number)
  //     .filter(
  //       contact => contact.name.trim() !== '' && contact.number.trim() !== ''
  //     );

  //   if (nonEmptyContacts.length > 0) {
  //     state.contacts = [...state.contacts, ...nonEmptyContacts];
  //   }
  // },
  // deleteContacts(state, action) {
  //   state.contacts = state.contacts.filter(
  //     contact => contact.id !== action.payload
  //   );
  // },
  //   updateFilter: (state, action) => {
  //     state.filter = action.payload;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contact.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contact.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(filterContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(filterContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.filter = action.payload;
      })
      .addCase(filterContacts.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  saveContact,
  deleteContacts,
  updateFilter,
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
  // addContact,
  // deleteContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
