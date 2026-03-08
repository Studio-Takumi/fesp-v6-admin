import { useState } from 'react';
import { BlockConfig, BlockNoDefaults } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { BoxesIcon } from 'lucide-react';
import { useEditorInstance } from '@/contexts/EditorContext';
import { Field } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

function Caption(props: {
    block: BlockNoDefaults<
        Record<
            'caption',
            BlockConfig<
                'caption',
                {
                    readonly en: {
                        readonly default: string;
                    };
                    readonly ja: {
                        readonly default: string;
                    };
                },
                'inline'
            >
        >,
        any,
        any
    >;
}) {
    const { block } = props;
    const editor = useEditorInstance();
    const [enText, setEnText] = useState<string>(block.props.en ?? '');
    const [jaText, setJaText] = useState<string>(block.props.ja ?? '');
    return (
        <div className='flex w-full flex-col gap-4 rounded-md bg-sky-50 p-2' contentEditable={false}>
            <div className='flex flex-row items-center gap-1 text-sky-400'>
                <BoxesIcon size={18} strokeWidth={1} />
                <p className='text-sm!'>キャプション</p>
            </div>
            <div className='flex flex-row gap-2'>
                <Field className='gap-2'>
                    <Label>En</Label>
                    <Input
                        type='text'
                        className='shrink-0 bg-white! text-base!'
                        value={enText}
                        onChange={(e) => {
                            editor.updateBlock(block, {
                                props: {
                                    en: e.currentTarget.value,
                                },
                            });
                            setEnText(e.currentTarget.value);
                        }}
                    />
                </Field>
                <Field className='gap-2'>
                    <Label>Ja</Label>
                    <Input
                        type='text'
                        className='shrink-0 bg-white! text-base!'
                        value={jaText}
                        onChange={(e) => {
                            editor.updateBlock(block, {
                                props: {
                                    ja: e.currentTarget.value,
                                },
                            });
                            setJaText(e.currentTarget.value);
                        }}
                    />
                </Field>
            </div>
        </div>
    );
}

export const createCaption = createReactBlockSpec(
    {
        type: 'caption',
        propSchema: {
            en: {
                default: '' as string,
            },
            ja: {
                default: '' as string,
            },
        },
        content: 'inline',
    },
    {
        render: ({ block }) => <Caption block={block} />,
    },
);
