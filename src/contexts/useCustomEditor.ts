import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import * as locales from '@blocknote/core/locales';
import { useCreateBlockNote } from '@blocknote/react';
import { createArticleInfo } from '@/components/uniqueBlocks/ArticleInfo';
import { createCaption } from '@/components/uniqueBlocks/Caption';
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
        caption: createCaption(),
    };
    const schema = BlockNoteSchema.create().extend({
        blockSpecs,
    });
    const editor = useCreateBlockNote({
        dictionary,
        schema,
        initialContent: [{ type: 'caption' }],
    });
    const blocks = editor.document;
    return { editor, blocks };
};
export type UseCustomEditor = ReturnType<typeof useCustomEditor>;
export type CustomEditor = UseCustomEditor['editor'];
export type CustomBlock = UseCustomEditor['blocks'][number];
