import { configureStore } from '@reduxjs/toolkit';
import formReducer from './features/forms/formSlice';
import donorsApi from './donors/donorsApi';
import receiversApi from './receivers/receiversApi';

export const store = configureStore({
  reducer: {
    form: formReducer,
    [donorsApi.reducerPath]: donorsApi.reducer,
    [receiversApi.reducerPath]: receiversApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(donorsApi.middleware)
      .concat(receiversApi.middleware),
});