import { ContactsAction, ContactsActionTypes } from './contactsActions'
import { ContactDto } from 'src/types/dto/ContactDto';
import { DATA_CONTACT } from 'src/__data__';


interface ContactsStoreState {
  data: ContactDto[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ContactsStoreState = {
  data: [],
  // data: DATA_CONTACT,  // временно
  isLoading: false,
  error: null,
}

const contactsReducer = (state: ContactsStoreState = initialState, action: ContactsAction): ContactsStoreState => {
  switch (action.type) {

    case ContactsActionTypes.GET_CONTACTS_PENDING:
      console.log(ContactsActionTypes.GET_CONTACTS_PENDING);
      return {
        ...state,
        isLoading: true,
        error: null,
      } 
    case ContactsActionTypes.GET_CONTACTS_FULFILLED: 
      console.log(ContactsActionTypes.GET_CONTACTS_FULFILLED, 'payload:', action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload as ContactDto[],
        error: null,
      };
    case ContactsActionTypes.GET_CONTACTS_REJECTED: 
      console.log(ContactsActionTypes.GET_CONTACTS_REJECTED, 'payload:', action.payload);
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };
    
    default:
      return state;
  }
}

export default contactsReducer
