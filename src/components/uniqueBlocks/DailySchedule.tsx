import { useState } from 'react';
import { BlockConfig, BlockNoDefaults } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { BoxesIcon } from 'lucide-react';
import { useEditorInstance } from '@/contexts/EditorContext';
import { formatDate } from '@/utils/formatDate';
import { weekName } from '@/utils/weekName';
import EditableDailySchedule from '../EditableDailySchedule';
import { Calendar } from '../ui/calendar';
import { Field } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

function DailySchedule(props: {
    block: BlockNoDefaults<
        Record<
            'dailySchedule',
            BlockConfig<
                'dailySchedule',
                {
                    readonly date: {
                        readonly default: string;
                    };
                    readonly start: {
                        readonly default: number;
                    };
                    readonly finish: {
                        readonly default: number;
                    };
                    readonly lines: {
                        readonly default: number;
                    };
                    readonly lineNames: {
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
    const [date, setDate] = useState<Date>(new Date(block.props.date) ?? new Date());
    const [start, setStart] = useState<number>(block.props.start ?? 7);
    const [finish, setFinish] = useState<number>(block.props.finish ?? 16);
    const [lines, setLines] = useState<number>(block.props.lines ?? 2);
    const [lineNames, setLineNames] = useState<string[]>(block.props.lineNames.split(',') ?? ['', '']);
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    return (
        <div className='flex w-full flex-col gap-4 rounded-md bg-sky-50 p-2' contentEditable={false}>
            <div className='flex flex-row items-center gap-1 text-sky-400'>
                <BoxesIcon size={18} strokeWidth={1} />
                <p className='text-sm!'>スケジュール（一日）</p>
            </div>
            <div className='flex w-auto flex-row gap-2'>
                <Field className='w-auto gap-2'>
                    <Label>表示日付</Label>
                    <Popover>
                        <PopoverTrigger>
                            <Input
                                type='date'
                                className='shrink-0 bg-white! text-base! [&::-webkit-calendar-picker-indicator]:hidden'
                                placeholder='日付'
                                value={formatDate(date, 'YYYY-MM-DD')}
                            />
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                            <Calendar
                                mode='single'
                                selected={date}
                                onSelect={(date) => {
                                    editor.updateBlock(block, {
                                        props: {
                                            date: formatDate(date as Date, 'YYYY-MM-DD'),
                                        },
                                    });
                                    setDate(date as Date);
                                }}
                                formatters={{
                                    formatCaption: (date) => formatDate(date, 'YYYY年M月'),
                                    formatWeekdayName: (date: Date) => weekName[date.getDay()],
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </Field>
                <Field className='w-auto gap-2'>
                    <Label>開始時</Label>
                    <Input
                        type='number'
                        className='shrink-0 bg-white! text-base!'
                        min={0}
                        max={finish}
                        value={start}
                        onChange={(e) => {
                            editor.updateBlock(block, {
                                props: {
                                    start: Number(e.currentTarget.value),
                                },
                            });
                            setStart(Number(e.currentTarget.value));
                        }}
                    />
                </Field>
                <Field className='w-auto gap-2'>
                    <Label>終了時</Label>
                    <Input
                        type='number'
                        className='shrink-0 bg-white! text-base!'
                        min={start + 1}
                        max={24}
                        value={finish}
                        onChange={(e) => {
                            editor.updateBlock(block, {
                                props: {
                                    finish: Number(e.currentTarget.value),
                                },
                            });
                            setFinish(Number(e.currentTarget.value));
                        }}
                    />
                </Field>
                <Field className='w-auto gap-2'>
                    <Label>列数</Label>
                    <Input
                        type='number'
                        className='shrink-0 bg-white! text-base!'
                        min={1}
                        max={5}
                        value={lines}
                        onChange={(e) => {
                            editor.updateBlock(block, {
                                props: {
                                    lines: Number(e.currentTarget.value),
                                    lineNames: [...Array(Number(e.currentTarget.value))].map((_, index) => (index < lineNames.length ? lineNames[index] : '')).join(','),
                                },
                            });
                            setLines(Number(e.currentTarget.value));
                            setLineNames([...Array(Number(e.currentTarget.value))].map((_, index) => (index < lineNames.length ? lineNames[index] : '')));
                        }}
                    />
                </Field>
            </div>
            <div className='flex w-auto flex-row gap-2'>
                <Field className='max-w-96 gap-2'>
                    <Label>列名</Label>
                    <div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${lines}, minmax(0, 1fr))` }}>
                        {lineNames.map((name, index) => (
                            <Input
                                type='text'
                                className='shrink-0 bg-white! text-base!'
                                value={name}
                                onChange={(e) => {
                                    editor.updateBlock(block, {
                                        props: {
                                            lineNames: lineNames.map((lineName, i) => (i === index ? e.currentTarget.value : lineName)).join(','),
                                        },
                                    });
                                    setLineNames(lineNames.map((lineName, i) => (i === index ? e.currentTarget.value : lineName)));
                                }}
                            />
                        ))}
                    </div>
                </Field>
            </div>
            <div className='flex flex-col gap-4'>
                <Label onClick={() => setOpenPreview(!openPreview)}>{openPreview ? '▼プレビューを非表示' : '▼プレビューを表示'}</Label>
                {openPreview ? <EditableDailySchedule dateStr={formatDate(date, 'YYYY-MM-DD')} start={start} finish={finish} lines={lines} lineNames={lineNames} /> : <></>}
            </div>
        </div>
    );
}

export const createDailySchedule = createReactBlockSpec(
    {
        type: 'dailySchedule',
        propSchema: {
            date: {
                default: formatDate(new Date(), 'YYYY-MM-DD') as string,
            },
            start: {
                default: 7 as number,
            },
            finish: {
                default: 16 as number,
            },
            lines: {
                default: 2 as number,
            },
            lineNames: {
                default: ',' as string, //コンマ区切り文字列
            },
        },
        content: 'inline',
    },
    {
        render: ({ block }) => <DailySchedule block={block} />,
    },
);
