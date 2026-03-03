import { useState } from 'react';
import { createReactBlockSpec } from '@blocknote/react';
import { BoxesIcon } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { weekName } from '@/utils/weekName';
import EditableDailySchedule from '../EditableDailySchedule';
import { Calendar } from '../ui/calendar';
import { Field } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const DailySchedule = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [start, setStart] = useState<number>(7);
    const [finish, setFinish] = useState<number>(16);
    const [lines, setLines] = useState<number>(2);
    const [lineNames, setLineNames] = useState<string[]>(['', '']);

    return (
        <div className='flex w-full flex-col gap-2 rounded-md bg-sky-50 p-2' contentEditable={false}>
            <div className='flex flex-row items-center gap-1 text-sky-400'>
                <BoxesIcon size={18} strokeWidth={1} />
                <p className='text-sm!'>スケジュール（一日）</p>
            </div>
            <div className='flex w-auto flex-row gap-2'>
                <Field className='w-auto'>
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
                <Field className='w-auto'>
                    <Label>開始時</Label>
                    <Input type='number' className='shrink-0 bg-white! text-base!' min={0} max={finish} value={start} onChange={(e) => setStart(Number(e.currentTarget.value))} />
                </Field>
                <Field className='w-auto'>
                    <Label>終了時</Label>
                    <Input
                        type='number'
                        className='shrink-0 bg-white! text-base!'
                        min={start + 1}
                        max={24}
                        value={finish}
                        onChange={(e) => setFinish(Number(e.currentTarget.value))}
                    />
                </Field>
                <Field className='w-auto'>
                    <Label>列数</Label>
                    <Input
                        type='number'
                        className='shrink-0 bg-white! text-base!'
                        min={1}
                        max={5}
                        value={lines}
                        onChange={(e) => {
                            setLines(Number(e.currentTarget.value));
                            setLineNames([...Array(Number(e.currentTarget.value))].map((_, index) => (index < lineNames.length ? lineNames[index] : '')));
                        }}
                    />
                </Field>
            </div>
            <div className='flex w-auto flex-row gap-2'>
                <Field className='max-w-96'>
                    <Label>列名</Label>
                    <div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${lines}, minmax(0, 1fr))` }}>
                        {lineNames.map((name, index) => (
                            <Input
                                type='text'
                                className='shrink-0 bg-white! text-base!'
                                value={name}
                                onChange={(e) => setLineNames(lineNames.map((lineName, i) => (i === index ? e.currentTarget.value : lineName)))}
                            />
                        ))}
                    </div>
                </Field>
            </div>
            <div>
                <EditableDailySchedule dateStr={formatDate(date, 'YYYY-MM-DD')} start={start} finish={finish} lines={lines} lineNames={lineNames} />
            </div>
        </div>
    );
};

export const createDailySchedule = createReactBlockSpec(
    {
        type: 'dailySchedule',
        propSchema: {},
        content: 'inline',
    },
    {
        render: DailySchedule,
    },
);
