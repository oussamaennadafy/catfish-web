import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./slices/authenticationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'authentication',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authenticationSlice.reducer);

const rootReducer = combineReducers({
  authentication: persistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };