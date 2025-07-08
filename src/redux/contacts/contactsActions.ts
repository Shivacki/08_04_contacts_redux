import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from 'src/redux/store'
import { FETCH_PATHS, FETCH_PATHS_MOCK } from 'src/constants/fetchPaths'
import { loadJSON } from 'src/lib/jsonUtilities'
import { ContactDto } from 'src/types/dto/ContactDto';


export interface ContactsAction {
  type: string;
  payload?: any;
}

/*
export interface ContactsAction extends Action {
  // type: string;  // see Action
  payload?: any;
}
*/

export enum ContactsActionTypes {
  GET_CONTACTS = 'GET_CONTACTS',
}


// Типизированный useDispatch для исп-я вовне
type ContactsDispatch = ThunkDispatch<RootState, null, ContactsAction>;
export const useContactsDispatch = () => useDispatch<ContactsDispatch>();

// Типизированная ф-я запроса данных с сервера, к-ую можно передать в dispatch
export const fetchContactsThunk: ThunkAction<void, RootState, null, ContactsAction> = async (dispatch, getState) => {
  // ... логика thunk ...
  // const state = getState();
  // console.log("Current store state:", state);

  // const data = loadJSON(FETCH_PATHS.contacts);
  // const data = loadJSON(FETCH_PATHS_MOCK.contacts);  // bad loading, html
  // const data = await import(FETCH_PATHS_MOCK.contacts);  // dynamic import json: error not a module
  // const data = await import(FETCH_PATHS_MOCK.contacts, { assert: { type: "json" }});  // dynamic import json "importAssertions": true ???
  const {DATA_CONTACT, DATA_GROUP_CONTACT} = await import('src/__data__');  // like static import in MainApp.tsx, see src/__data__/index.ts
  const data = DATA_CONTACT;
  console.log('fetchContactsThunk data:', data);
  dispatch({ type: ContactsActionTypes.GET_CONTACTS, payload: data });
};


///*
type ContactsThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  ContactsAction //Action
>;

// Типизированная ф-я запроса данных с сервера, к-ую можно передать в dispatch. Альтернатива
export const fetchContacts = (): ContactsThunk<Promise<void>> => async (dispatch, getState) => {
  // ... логика thunk ...
  const data = loadJSON(FETCH_PATHS.contacts);
  dispatch({ type: ContactsActionTypes.GET_CONTACTS, payload: data });
};
//*/


// Генератор действия (action creator)
function getItems(): ContactsAction {
  return {
    type: ContactsActionTypes.GET_CONTACTS,
    // payload: null,
  };
}

