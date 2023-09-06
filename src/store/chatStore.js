import {legacy_createStore} from "redux";

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const JOIN_CHAT = 'JOIN_CHAT';
export const SYNC_CHAT = 'SYNC_CHAT';

export const STORAGE_KEY = 'message-ui-react';

const updateLocalStorage = (state = []) => {
  const oldValue = localStorage.getItem(STORAGE_KEY);
  const newValue = JSON.stringify(state);
  localStorage.setItem(STORAGE_KEY, newValue);

  if (oldValue !== newValue) {
    setTimeout(() => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        oldValue,
        newValue
      }));
    });
  }

  return [...state];
};

const chatReducer = (state = [], action) => {
  switch (action.type) {
    case JOIN_CHAT:
      return updateLocalStorage(state.concat([{
        message: `${action.username} has joined the chat.`
      }]));
    case SEND_MESSAGE:
      return updateLocalStorage(state.concat([{
        username: action.username,
        message: action.message
      }]));
    case SYNC_CHAT:
      return updateLocalStorage(action.state);
    default:
      return [...state];
  }
};

export const getChatStore = () => {
  const chatState = localStorage.getItem(STORAGE_KEY) || '[]';

  return legacy_createStore(chatReducer, JSON.parse(chatState));
};
