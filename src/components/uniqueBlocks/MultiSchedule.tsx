import { useState } from 'react';
import { createReactBlockSpec } from '@blocknote/react';
import { BoxesIcon } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { weekName } from '@/utils/weekName';
import { Calendar } from '../ui/calendar';
import { Field } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const MultiSchedule = () => {
    const [panelNum, setPanelNum] = useState<number>(1);
    type schedulePanel = {
        panel: string;
        date: Date;
        start: number;
        finish: number;
        lines: number;
        lineNames: string[];
    };
    const defaultPanel: schedulePanel = {
        panel: 'Day',
        date: new Date(),
        start: 7,
        finish: 16,
        lines: 2,
        lineNames: ['', ''],
    };
    const [panels, setPanels] = useState<schedulePanel[]>([defaultPanel]);

    return (
        <div className='flex w-full flex-col gap-2 rounded-md bg-sky-50 p-2' contentEditable={false}>
            <div className='flex flex-row items-center gap-1 text-sky-400'>
                <BoxesIcon size={18} strokeWidth={1} />
                <p className='text-sm!'>スケジュール（一日）</p>
            </div>
            <div className='flex w-auto flex-row gap-2'>
                <Field>
                    <Label>パネル数</Label>
                    <Input
                        type='number'
                        className='w-64! shrink-0 bg-white! text-base!'
                        min={1}
                        value={panelNum}
                        onChange={(e) => {
                            setPanelNum(Number(e.currentTarget.value));
                            setPanels([...Array(Number(e.currentTarget.value))].map((_, index) => (index < panels.length ? panels[index] : defaultPanel)));
                        }}
                    />
                </Field>
            </div>
            <div className='flex flex-col gap-2'>
                {panels.map((panel, panelIndex) => (
                    <div className='flex flex-col gap-2 rounded-md border-4 border-sky-100 p-2'>
                        <div className='flex w-auto flex-row gap-2'>
                            <Field>
                                <Label>パネル名</Label>
                                <Input
                                    type='text'
                                    className='w-64! shrink-0 bg-white! text-base!'
                                    value={panel.panel}
                                    onChange={(e) => setPanels(panels.map((panel, index) => (panelIndex === index ? { ...panel, panel: e.currentTarget.value } : panel)))}
                                />
                            </Field>
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
                                            value={formatDate(panel.date, 'YYYY-MM-DD')}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0'>
                                        <Calendar
                                            mode='single'
                                            selected={panel.date}
                                            onSelect={(date) => {
                                                setPanels(panels.map((panel, index) => (panelIndex === index ? { ...panel, date: date as Date } : panel)));
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
                                <Input
                                    type='number'
                                    className='shrink-0 bg-white! text-base!'
                                    min={0}
                                    max={panel.finish}
                                    value={panel.start}
                                    onChange={(e) => setPanels(panels.map((panel, index) => (panelIndex === index ? { ...panel, start: Number(e.currentTarget.value) } : panel)))}
                                />
                            </Field>
                            <Field className='w-auto'>
                                <Label>終了時</Label>
                                <Input
                                    type='number'
                                    className='shrink-0 bg-white! text-base!'
                                    min={panel.start + 1}
                                    max={24}
                                    value={panel.finish}
                                    onChange={(e) => setPanels(panels.map((panel, index) => (panelIndex === index ? { ...panel, finish: Number(e.currentTarget.value) } : panel)))}
                                />
                            </Field>
                            <Field className='w-auto'>
                                <Label>列数</Label>
                                <Input
                                    type='number'
                                    className='shrink-0 bg-white! text-base!'
                                    min={1}
                                    max={5}
                                    value={panel.lines}
                                    onChange={(e) =>
                                        setPanels(
                                            panels.map((panel, index) =>
                                                panelIndex === index
                                                    ? {
                                                          ...panel,
                                                          lines: Number(e.currentTarget.value),
                                                          lineNames: [...Array(Number(e.currentTarget.value))].map((_, index) =>
                                                              index < panel.lineNames.length ? panel.lineNames[index] : '',
                                                          ),
                                                      }
                                                    : panel,
                                            ),
                                        )
                                    }
                                />
                            </Field>
                        </div>
                        <div className='flex w-auto flex-row gap-2'>
                            <Field className='max-w-96'>
                                <Label>列名</Label>
                                <div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${panel.lines}, minmax(0, 1fr))` }}>
                                    {panel.lineNames.map((name, lineIndex) => (
                                        <Input
                                            type='text'
                                            className='shrink-0 bg-white! text-base!'
                                            value={name}
                                            onChange={(e) =>
                                                setPanels(
                                                    panels.map((panel, index) =>
                                                        panelIndex === index
                                                            ? { ...panel, lineNames: panel.lineNames.map((lineName, i) => (i === lineIndex ? e.currentTarget.value : lineName)) }
                                                            : panel,
                                                    ),
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </Field>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const createMultiSchedule = createReactBlockSpec(
    {
        type: 'multiSchedule',
        propSchema: {},
        content: 'inline',
    },
    {
        render: MultiSchedule,
    },
);
