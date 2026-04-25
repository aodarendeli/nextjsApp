import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './feature/counter/counterslice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // slice burada tanımlandı
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
