import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from 'src/redux/store'
import { FETCH_PATHS } from 'src/constants/fetchPaths'
import { loadJSON, dynamicImportJSON } from 'src/lib/jsonUtilities'
import { ContactDto } from 'src/types/dto/ContactDto';
import { sleepAsync } from 'src/lib/commonUtilities'


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
  // Actions: pending, fulfilled и rejected
  GET_CONTACTS_PENDING = 'GET_CONTACTS_PENDING',
  GET_CONTACTS_FULFILLED = 'GET_CONTACTS_FULFILLED',
  GET_CONTACTS_REJECTED = 'GET_CONTACTS_REJECTED',
}


// Типизированный useDispatch для исп-я вовне
export type ContactsDispatch = ThunkDispatch<RootState, null, ContactsAction>;
export const useContactsDispatch = () => useDispatch<ContactsDispatch>();

// Типизированная ф-я запроса данных с сервера в рамках redux thunk, к-ую можно передать в dispatch
export const fetchContactsThunk: ThunkAction<void, RootState, null, ContactsAction> = async (dispatch, getState) => {
  // ... логика thunk ...
  // const state = getState();
  // console.log("Current store state:", state);

  dispatch({ type: ContactsActionTypes.GET_CONTACTS_PENDING });
  try {
    const data = await loadJSON(FETCH_PATHS.contacts);
    // const data = await loadJSON(FETCH_PATHS_MOCK.contacts);  // bad loading, html
    // const data = await import(FETCH_PATHS_MOCK.contacts);  // error "Cannot find module", because need static string in path, not variable
    // const data = await import('src/__data__', { assert: { type: "json" }});  // dynamic import json, error need "importAssertions": true ???

    // Имитация динамической загрузки локального json-файла
    // const { DATA_CONTACT } = await import('src/__data__');  // like static import in MainApp.tsx, see src/__data__/index.ts
    // const data = DATA_CONTACT;
    await sleepAsync(1000);  // имитация доп. задержки при загрузке

    console.log('fetchContactsThunk data:', data);
    dispatch({ type: ContactsActionTypes.GET_CONTACTS_FULFILLED, payload: data });
  } catch(err) {
    dispatch({ type: ContactsActionTypes.GET_CONTACTS_REJECTED, payload: (err as Error).message  });
  }
};


///*
type ContactsThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  ContactsAction //Action
>;

// Типизированная ф-я запроса данных с сервера в рамках redux thunk, к-ую можно передать в dispatch. Альтернатива fetchContactsThunk
export const fetchContactsThunk_2 = (): ContactsThunk<Promise<void>> => async (dispatch, getState) => {
  // ... повторить здесь код fetchContactsThunk
};
//*/


// Генератор действия (action creator)
function getItems(): ContactsAction {
  return {
    type: ContactsActionTypes.GET_CONTACTS_FULFILLED,
    // payload: null,
  };
}

