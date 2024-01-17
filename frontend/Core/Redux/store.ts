import { combineReducers, Store } from 'redux';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as reducers from './Reducers';
import thunk from 'redux-thunk';
import { Context, createWrapper } from 'next-redux-wrapper';
const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

const makeStore = (context: Context) => configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
}),
  devTools: true
});

export const wrapper = createWrapper<Store>(makeStore);

export type RootState = ReturnType<typeof persistedReducer>