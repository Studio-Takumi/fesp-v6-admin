import { Block } from '@blocknote/core';
import { UUIDTypes } from 'uuid';
import { timestamp } from './timestamp';

export type article = {
    article_id: UUIDTypes;
    create_at: timestamp;
    update_at: timestamp;
    title: string;
    blocks: Block[];
    published_at: timestamp;
    is_published: boolean;
};
