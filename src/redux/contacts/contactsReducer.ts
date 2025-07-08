import { ContactsAction, ContactsActionTypes } from './contactsActions'
import { ContactDto } from 'src/types/dto/ContactDto';
import { DATA_CONTACT } from 'src/__data__';


interface ContactsStoreState {
  data: ContactDto[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ContactsStoreState = {
  // data: [],
  data: DATA_CONTACT,  // временно
  isLoading: false,
  error: null,
}

const contactsReducer = (state: ContactsStoreState = initialState, action: ContactsAction): ContactsStoreState => {
  switch (action.type) {

    case ContactsActionTypes.GET_CONTACTS: 
      // return state;
      return {
        ...state,
        data: action.payload as ContactDto[],
        // ...action.payload as ContactDto[],
      };
    
    default:
      return state;
  }
}

export default contactsReducer
