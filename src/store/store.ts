import { configureStore } from '@reduxjs/toolkit';
import { articleApi } from '@/services/articleApi';
import { scheduleApi } from '@/services/scheduleApi';
import articleReducer from '@/slices/articleSlice';
import scheduleReducer from '@/slices/scheduleSlice';

export const store = configureStore({
    reducer: {
        articleReducer,
        scheduleReducer,
        [articleApi.reducerPath]: articleApi.reducer,
        [scheduleApi.reducerPath]: scheduleApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware, scheduleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
