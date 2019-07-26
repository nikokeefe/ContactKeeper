import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';


const Contacts = () => {
  const contactContext = useContext(ContactContext);

  // grab contacts(de-structured)
  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts



/*
  Pull in contacts from state...map through, creat a list...output a Contact Item for each one.
*/