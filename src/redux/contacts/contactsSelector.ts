import { ContactDto } from 'src/types/dto/ContactDto';
import { RootState } from 'src/redux/store'


export const selectContactsData = (state: RootState): ContactDto[] => state.contacts.data;
export const selectContactsIsLoading = (state: RootState) => state.contacts.isLoading;
export const selectContactsError = (state: RootState) => state.contacts.error;
