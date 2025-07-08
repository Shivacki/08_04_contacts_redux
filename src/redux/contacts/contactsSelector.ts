import { ContactDto } from 'src/types/dto/ContactDto';
import { RootState } from 'src/redux/store'


export const selectContacts = (state: RootState): ContactDto[] => state.contacts.data;