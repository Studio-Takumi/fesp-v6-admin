import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { article } from '@/types/article';

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    endpoints: (builder) => ({
        getArticles: builder.query<article[], void>({
            query: () => 'articles',
        }),
    }),
});

export const { useGetArticlesQuery } = articleApi;
