import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const loadState = () => {
  try {
    const reduxState = localStorage.getItem('reduxState');
    if (reduxState !== null && typeof reduxState === "string") {
      return JSON.parse(reduxState);
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const reduxState = JSON.stringify(state);
    localStorage.setItem('reduxState', reduxState);
  } catch (err) {
    console.log(err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: rootReducer, preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});