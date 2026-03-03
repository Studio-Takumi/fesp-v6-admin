import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { schedule } from '@/types/schedule';

export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    endpoints: (builder) => ({
        getSchedules: builder.query<schedule[], void>({
            query: () => 'schedules',
        }),
    }),
});

export const { useGetSchedulesQuery } = scheduleApi;
