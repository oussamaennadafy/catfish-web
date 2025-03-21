import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./slices/authenticationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { userSlice } from "./slices/userSlice";

const persistAuthenticationConfig = {
  key: 'authentication',
  storage,
};

const persistUserConfig = {
  key: 'user',
  storage,
};

const persistedAuthenticationReducer = persistReducer(persistAuthenticationConfig, authenticationSlice.reducer);
const persistedUserReducer = persistReducer(persistUserConfig, userSlice.reducer);

const rootReducer = combineReducers({
  authentication: persistedAuthenticationReducer,
  user: persistedUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };