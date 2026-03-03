import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Block } from '@blocknote/core';
import { UUIDTypes, v4 as uuidv4 } from 'uuid';
import { article } from '@/types/article';
import { timestamp } from '@/types/timestamp';
import { formatDate } from '@/utils/formatDate';

export type ArticleState = {
    articles: article[];
    articleID: UUIDTypes;
    title: string;
    blocks: Block[];
    create_at: timestamp;
    update_at: timestamp;
    is_published: boolean;
    published_at: timestamp;
};
const initialState: ArticleState = {
    articles: [],
    articleID: uuidv4(),
    title: '',
    blocks: [],
    create_at: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') as timestamp,
    update_at: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') as timestamp,
    is_published: false,
    published_at: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') as timestamp,
};
export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setArticleID: (state, action: PayloadAction<{ articleID: UUIDTypes }>) => {
            state.articleID = action.payload.articleID;
            state.title = state.articles.find((article) => article.article_id === action.payload.articleID)?.title ?? '';
            state.blocks = state.articles.find((article) => article.article_id === action.payload.articleID)?.blocks ?? [];
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setBlocks: (state, action: PayloadAction<Block[]>) => {
            state.blocks = action.payload;
        },
        setCreateAt: (state, action: PayloadAction<timestamp>) => {
            state.create_at = action.payload;
        },
        setUpdateAt: (state, action: PayloadAction<timestamp>) => {
            state.create_at = action.payload;
        },
        setIsPublished: (state, action: PayloadAction<boolean>) => {
            state.is_published = action.payload;
        },
        setPublishedAt: (state, action: PayloadAction<timestamp>) => {
            state.published_at = action.payload;
        },
    },
});

export const { setArticleID, setTitle, setBlocks, setCreateAt, setUpdateAt, setIsPublished, setPublishedAt } = articleSlice.actions;
export default articleSlice.reducer;
