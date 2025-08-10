// Общие типы и объявления для работы с Контактами в store
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store'
import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';


// Представление данных по Контактам в store
export interface ContactsStoreState {
  data: ContactDto[];
  isLoading: boolean;
  error: string | null;
  favorites: FavoriteContactsDto,  // Избранные контакты
}

// Описание Action для Контактов
export interface ContactsAction {
  type: string;
  payload?: any;
}

/*
export interface ContactsAction extends Action {
  // type: string;  // see Action: import { Action } from 'redux';
  payload?: any;
}
*/


// Возможные типы Action для Контактов
export enum ContactsActionTypes {
  // Actions: pending, fulfilled и rejected
  GET_CONTACTS_PENDING = 'GET_CONTACTS_PENDING',
  GET_CONTACTS_FULFILLED = 'GET_CONTACTS_FULFILLED',
  GET_CONTACTS_REJECTED = 'GET_CONTACTS_REJECTED',
}

// Типизированный useDispatch для исп-я вовне, чтобы вызывать аснихр. Thunk-Action
export type ContactsDispatch = ThunkDispatch<RootState, null, ContactsAction>;
export const useContactsDispatch = () => useDispatch<ContactsDispatch>();
