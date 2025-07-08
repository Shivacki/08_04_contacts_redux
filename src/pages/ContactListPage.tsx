import React, {memo, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectContacts } from 'src/redux/contacts'
import { fetchContacts, useContactsDispatch, fetchContactsThunk } from 'src/redux/contacts/contactsActions'
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';


export const ContactListPage = memo<CommonPageProps>(({
  contactsState, groupContactsState
}) => {
  // const dispatch = useDispatch();
  const dispatch = useContactsDispatch();
  
  const contactsStoreState: ContactDto[] = useSelector(selectContacts);
  const contactsInitialState = contactsStoreState;  // contactsState[0]

  const [contacts, setContacts] = useState<ContactDto[]>(contactsInitialState);
  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contactsInitialState;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupContacts = groupContactsState[0].find(({id}) => id === fv.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({id}) => (
          groupContacts.contactIds.includes(id)
        ))
      }
    }

    setContacts(findContacts)
  }


  useEffect(() => {
    dispatch(fetchContactsThunk)
    // dispatch(fetchContacts);  // или так
  }, [])


  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groupContactsState[0]} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {contacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
})
