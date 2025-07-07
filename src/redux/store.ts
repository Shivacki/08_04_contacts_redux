import { createStore, combineReducers } from 'redux'


import contactsReducer from './contacts'

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

// Определение RootState на основе корневого редьюсера
export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

