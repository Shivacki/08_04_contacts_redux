import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {Layout} from 'src/components/Layout';
import {ContactListPage, GroupPage, ContactPage, FavoritListPage, GroupListPage} from 'src/pages';
import {ContactDto} from 'src/types/dto/ContactDto';
import {FavoriteContactsDto} from 'src/types/dto/FavoriteContactsDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';
import {DATA_CONTACT, DATA_GROUP_CONTACT} from 'src/__data__';

import { useContactsDispatch, fetchContactsThunk } from 'src/redux/contacts/contactsActions'
// import { ContactsDispatch, fetchContactsThunk_2 } from 'src/redux/contacts/contactsActions'
import { useGroupsDispatch, fetchGroupsThunk } from 'src/redux/groups/groupsActions'


export const App = () => {
  const contactsState = useState<ContactDto[]>(DATA_CONTACT);
  const favoriteContactsState = useState<FavoriteContactsDto>([
    DATA_CONTACT[0].id,
    DATA_CONTACT[1].id,
    DATA_CONTACT[2].id,
    DATA_CONTACT[3].id
  ]);
  const groupContactsState = useState<GroupContactsDto[]>(DATA_GROUP_CONTACT);

  const dispatchContacts = useContactsDispatch();
  // const dispatch = useDispatch<ContactsDispatch>();
  const dispatchGroups = useGroupsDispatch();
  
  useEffect(() => {
    // Асинхронная инициализация хранилища данными
    // ... Контакты
    dispatchContacts(fetchContactsThunk)
    // dispatch(fetchContactsThunk_2);  // или так со штатным useDispatch: dispatch === useDispatch<ContactsDispatch>()
    // ... Группы контактов
    dispatchGroups(fetchGroupsThunk)
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <ContactListPage
              contactsState={contactsState}
              favoriteContactsState={favoriteContactsState}
              groupContactsState={groupContactsState}
            />
          } />
          <Route path="contact">
            <Route index element={
              <ContactListPage
                contactsState={contactsState}
                favoriteContactsState={favoriteContactsState}
                groupContactsState={groupContactsState}
              />
            } />
            <Route path=":contactId" element={
              <ContactPage
                contactsState={contactsState}
                favoriteContactsState={favoriteContactsState}
                groupContactsState={groupContactsState}
              />
            } />
          </Route>
          <Route path="groups">
            <Route index element={
              <GroupListPage
                contactsState={contactsState}
                favoriteContactsState={favoriteContactsState}
                groupContactsState={groupContactsState}
              />
            } />
            <Route path=":groupId" element={
              <GroupPage
                contactsState={contactsState}
                favoriteContactsState={favoriteContactsState}
                groupContactsState={groupContactsState}
              />
            } />
          </Route>
          <Route path="favorit" element={
            <FavoritListPage
              contactsState={contactsState}
              favoriteContactsState={favoriteContactsState}
              groupContactsState={groupContactsState}
            />
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
