import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlockConfig, BlockNoDefaults } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { BoxesIcon } from 'lucide-react';
import { useCustomEditor } from '@/contexts/useCustomEditor';
import { setTitle } from '@/slices/articleSlice';
import { RootState } from '@/store/store';
import { timestamp } from '@/types/timestamp';
import { formatDate } from '@/utils/formatDate';

function ArticleInfo(props: {
    block: BlockNoDefaults<
        Record<
            'articleInfo',
            BlockConfig<
                'articleInfo',
                {
                    readonly title: {
                        readonly default: string;
                    };
                    readonly published_at: {
                        readonly default: timestamp;
                    };
                    readonly update_at: {
                        readonly default: timestamp;
                    };
                },
                'none'
            >
        >,
        any,
        any
    >;
}) {
    const { block } = props;
    const { editor } = useCustomEditor();
    const dispatch = useDispatch();
    const title = useSelector((state: RootState) => state.articleReducer.title);
    const published_at = useSelector((state: RootState) => state.articleReducer.published_at);
    const update_at = useSelector((state: RootState) => state.articleReducer.update_at);
    useEffect(() => {
        queueMicrotask(() => {
            editor.updateBlock(block, {
                props: {
                    title,
                },
            });
        });
    }, [title]);
    useEffect(() => {
        queueMicrotask(() => {
            editor.updateBlock(block, {
                props: {
                    published_at,
                },
            });
        });
    }, [published_at]);
    useEffect(() => {
        queueMicrotask(() => {
            editor.updateBlock(block, {
                props: {
                    update_at,
                },
            });
        });
    }, [update_at]);
    return (
        <div className='flex w-full flex-col rounded-md bg-sky-50 p-2' contentEditable={false}>
            <div className='flex flex-row items-center gap-1 text-sky-400'>
                <BoxesIcon size={18} strokeWidth={1} />
                <p className='text-sm!'>記事情報</p>
            </div>
            <input
                className='py-1 text-3xl font-semibold placeholder-slate-300 outline-none!'
                placeholder='記事タイトル'
                value={title}
                onChange={(e) => dispatch(setTitle(e.currentTarget.value))}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const currentBlock = editor.getTextCursorPosition().block;
                        editor.insertBlocks([{ type: 'paragraph' }], currentBlock, 'after');
                    }
                }}
            />
            <p className='py-0.5 text-xs! text-slate-500'>公開日時：{formatDate(new Date(published_at), 'YYYY年M月D日 H:mm')}</p>
            <p className='py-0.5 text-xs! text-slate-500'>更新日時：{formatDate(new Date(update_at), 'YYYY年M月D日 H:mm')}</p>
            <div className='flex flex-row items-center gap-1'>
                <div className='h-6 w-6 rounded-full bg-slate-300' />
                <p>委員会【公式】</p>
            </div>
        </div>
    );
}

export const createArticleInfo = createReactBlockSpec(
    {
        type: 'articleInfo',
        propSchema: {
            title: {
                default: '' as string,
            },
            published_at: {
                default: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') as timestamp,
            },
            update_at: {
                default: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') as timestamp,
            },
        },
        content: 'none',
    },
    {
        render: ({ block }) => <ArticleInfo block={block} />,
    },
);
