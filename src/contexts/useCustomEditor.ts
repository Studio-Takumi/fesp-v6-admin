import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import * as locales from '@blocknote/core/locales';
import { useCreateBlockNote } from '@blocknote/react';
import { createArticleInfo } from '@/components/uniqueBlocks/ArticleInfo';
import { createDailySchedule } from '@/components/uniqueBlocks/DailySchedule';
import { createMultiSchedule } from '@/components/uniqueBlocks/MultiSchedule';
import { createThumbnail } from '@/components/uniqueBlocks/Thumbnail';

export const useCustomEditor = () => {
    const dictionary = locales.ja;
    dictionary.placeholders = {
        ...dictionary.placeholders,
        default: 'テキストまたは「/」でコマンドを入力',
    };
    const blockSpecs = {
        ...defaultBlockSpecs,
        articleInfo: createArticleInfo(),
        thumbnail: createThumbnail(),
        dailySchedule: createDailySchedule(),
        multiSchedule: createMultiSchedule(),
    };
    const schema = BlockNoteSchema.create().extend({
        blockSpecs,
    });
    const editor = useCreateBlockNote({
        dictionary,
        schema,
        initialContent: [{ type: 'multiSchedule' }],
    });
    return { editor, blockSpecs };
};
export type UseCustomEditor = ReturnType<typeof useCustomEditor>;
export type CustomEditor = UseCustomEditor['editor'];
export type CustomBlockSpecs = UseCustomEditor['blockSpecs'];
