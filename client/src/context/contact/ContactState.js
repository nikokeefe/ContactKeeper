import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

// Set initial state
const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  // Pull out state and dispatch from reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // --- ACTIONS -----------------------------------

  // Get Contacts
  const getContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');

      dispatch({
        type: GET_CONTACTS,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message
      })
    }
  }

  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await axios.post('/api/contacts', contact, config);

      dispatch({
        type: ADD_CONTACT,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message
      })
    }
  }

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message
      })
    }
  };

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await axios.put(`/api/contacts/${contact._id}`, contact, config);

      dispatch({
        type: UPDATE_CONTACT,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message
      })
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    })
  };

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    })
  };

  // Filter Contacts
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    })
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;