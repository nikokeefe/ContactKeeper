import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

// Set initial state
const AlertState = props => {
  const initialState = [];

  // Pull out state and dispatch from reducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // ACTIONS
  // Set Alert
  const setAlert = (message, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { message, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  }

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;