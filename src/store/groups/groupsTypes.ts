import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';


// Представление данных по Группам в store
export interface GroupsStoreState {
  data: GroupContactsDto[];
  isLoading: boolean;
  error: string | null;
}

// Описание Action для Групп
export interface GroupsAction {
  type: string;
  payload?: any;
}

// Возможные типы Action для Групп
export enum GroupsActionTypes {
  // Actions: pending, fulfilled и rejected
  GET_GROUPS_PENDING = 'GET_GROUPS_PENDING',
  GET_GROUPS_FULFILLED = 'GET_GROUPS_FULFILLED',
  GET_GROUPS_REJECTED = 'GET_GROUPS_REJECTED',
}

// Типизированный useDispatch для исп-я вовне, чтобы вызывать аснихр. Thunk-Action
export type GroupsDispatch = ThunkDispatch<RootState, null, GroupsAction>;
export const useGroupsDispatch = () => useDispatch<GroupsDispatch>();

