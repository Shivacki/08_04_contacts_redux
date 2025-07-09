import React, {memo, useState, useEffect} from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux'
import { selectContactsData, selectContactsError, selectContactsIsLoading } from 'src/redux/contacts'
import { fetchContacts, useContactsDispatch, fetchContactsThunk } from 'src/redux/contacts/contactsActions'
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { RootState } from 'src/redux/store'


export const ContactListPage = /*memo<CommonPageProps>(*/({
  contactsState, groupContactsState
}: CommonPageProps) => {
  
  console.log('render ContactListPage');
  
  const store = useStore<RootState>();
  const storeState = store.getState();
  console.log('storeState:', storeState);
  
  
  // const dispatch = useDispatch();
  const dispatch = useContactsDispatch();
  
  const contactsStoreState: ContactDto[] = useSelector(selectContactsData);
  const contactsInitialState = contactsStoreState;  // contactsState[0]
  console.log('contactsStoreState: ', contactsStoreState);

  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  

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

  useEffect(() => {
    setContacts(contactsStoreState);
  }, [contactsStoreState])


  if (isLoading)
    return <>Загрузка контактов...</>
  if (!!error)
    return <>Ошибка при загрузке контактов</>

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
} 

/*
  // propsAreEqual
  () => {
    return false
  }

)
*/
