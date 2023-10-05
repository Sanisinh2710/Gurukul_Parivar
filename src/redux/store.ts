import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers';

import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;