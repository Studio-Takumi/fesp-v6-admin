import { useState } from 'react';
import { BlockConfig, BlockNoDefaults } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { BoxesIcon } from 'lucide-react';
import { useEditorInstance } from '@/contexts/EditorContext';
import { CustomBlock } from '@/contexts/useCustomEditor';
import { Field } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

function MultiSchedule(props: {
    block: BlockNoDefaults<
        Record<
            'multiSchedule',
            BlockConfig<
                'multiSchedule',
                {
                    readonly panelNames: {
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
    const [panelNum, setPanelNum] = useState<number>(block.props.panelNames.split(',').length ?? 1);
    const [panelNames, setPanelNames] = useState<string[]>(block.props.panelNames.split(',') ?? ['']);
    return (
        <div className='flex w-full flex-col gap-4 rounded-md bg-sky-50 p-2' contentEditable={false}>
            <div className='flex flex-row items-center gap-1 text-sky-400'>
                <BoxesIcon size={18} strokeWidth={1} />
                <p className='text-sm!'>スケジュール（複数日）</p>
            </div>
            <div>
                <Field className='gap-2'>
                    <Label>パネル数</Label>
                    <Input
                        type='number'
                        className='w-64! shrink-0 bg-white! text-base!'
                        min={1}
                        value={panelNum}
                        onChange={(e) => {
                            setPanelNum(Number(e.currentTarget.value));
                            setPanelNames([...Array(Number(e.currentTarget.value))].map((_, index) => (index < panelNames.length ? panelNames[index] : '')));
                            editor.updateBlock(block, {
                                children: [...Array(Number(e.currentTarget.value))].map((_, index) =>
                                    index < block.children.length ? block.children[index] : { type: 'dailySchedule' },
                                ) as CustomBlock[],
                            });
                        }}
                    />
                </Field>
            </div>
            <div>
                <Field className='gap-2'>
                    <Label>パネル名</Label>
                    <div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${panelNum}, minmax(0, 1fr))` }}>
                        {panelNames.map((name, index) => (
                            <Input
                                type='text'
                                className='shrink-0 bg-white! text-base!'
                                value={name}
                                onChange={(e) => {
                                    editor.updateBlock(block, {
                                        props: {
                                            panelNames: panelNames.map((panelName, i) => (i === index ? e.currentTarget.value : panelName)).join(','),
                                        },
                                    });
                                    setPanelNames(panelNames.map((panelName, i) => (i === index ? e.currentTarget.value : panelName)));
                                }}
                            />
                        ))}
                    </div>
                </Field>
            </div>
        </div>
    );
}

export const createMultiSchedule = createReactBlockSpec(
    {
        type: 'multiSchedule',
        propSchema: {
            panelNames: {
                default: '' as string,
            },
        },
        content: 'inline',
    },
    {
        render: ({ block }) => <MultiSchedule block={block} />,
    },
);
