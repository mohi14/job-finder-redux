import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import JobsReducer from '../features/jobs/JobsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    jobs: JobsReducer,
  },
});
