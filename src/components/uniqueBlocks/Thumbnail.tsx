import { createReactBlockSpec } from '@blocknote/react';
import { BoxesIcon } from 'lucide-react';

const Thumbnail = () => {
    return (
        <div className='flex w-full flex-col rounded-md bg-sky-50 p-2' contentEditable={false}>
            <div className='flex flex-row items-center gap-1 text-sky-400'>
                <BoxesIcon size={18} strokeWidth={1} />
                <p className='text-sm!'>サムネイル</p>
            </div>
            <div className='h-36 w-64 shrink-0 bg-slate-100' />
        </div>
    );
};

export const createThumbnail = createReactBlockSpec(
    {
        type: 'thumbnail',
        propSchema: {
            image: {
                default: '' as string,
            },
        },
        content: 'inline',
    },
    {
        render: Thumbnail,
    },
);
