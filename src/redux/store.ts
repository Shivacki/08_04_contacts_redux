import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';


import contactsReducer from './contacts'

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

// Определение RootState на основе корневого редьюсера
export type RootState = ReturnType<typeof rootReducer>;

// Создаем redux-store
// В кач-ве middleware исп-ем redux-thunk для выполнения асинхр. запросов в экосистеме redux
export const store = createStore(rootReducer, applyMiddleware(thunk));

