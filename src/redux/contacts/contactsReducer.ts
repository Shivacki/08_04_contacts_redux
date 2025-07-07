import { ContactDto } from 'src/types/dto/ContactDto';
import { DATA_CONTACT } from 'src/__data__';


// type ContactsState = ContactDto[];

export const initialState: ContactDto[] = DATA_CONTACT; // [];  // DATA_CONTACT временно

const contactsReducer = (state: ContactDto[] = initialState, action: any) => {
  switch (action.type) {

    default:
      return state;
  }
}

export default contactsReducer
