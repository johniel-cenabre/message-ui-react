import {legacy_createStore} from "redux";

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const JOIN_CHAT = 'JOIN_CHAT';
export const UPDATE_CHAT = 'UPDATE_CHAT';

const updateLocalStorage = (state = []) => {
  const oldValue = localStorage.getItem('message-ui-react');
  const newValue = JSON.stringify([...state]);
  localStorage.setItem('message-ui-react', newValue);

  if (oldValue !== newValue) {
    setTimeout(() => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'message-ui-react',
        oldValue,
        newValue
      }));
    });
  }

  return [...state];
};

const chatReducer = (state = [], action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return updateLocalStorage(state.concat([{
        username: action.username,
        message: action.message
      }]));
    case JOIN_CHAT:
      return updateLocalStorage(state.concat([{
        message: `${action.username} has joined the chat.`
      }]));
    case UPDATE_CHAT:
      return updateLocalStorage(action.state);
    default:
      return [...state];
  }
};

const chatState = localStorage.getItem('message-ui-react') || '[]';

export const chatStore = legacy_createStore(chatReducer, JSON.parse(chatState));
