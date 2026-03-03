import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '@/components/DataTable';
import EditableDailySchedule from '@/components/EditableDailySchedule';
import { Calendar } from '@/components/ui/calendar';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useGetSchedulesQuery } from '@/services/scheduleApi';
import { createSchedule, setSchedules, updateSchedules } from '@/slices/scheduleSlice';
import { RootState } from '@/store/store';
import { formatDate } from '@/utils/formatDate';
import { weekName } from '@/utils/weekName';

function ScheduleEdit() {
    const { data, error, isLoading } = useGetSchedulesQuery();
    const dispatch = useDispatch();
    const schedules = useSelector((state: RootState) => state.scheduleReducer.schedules);
    const [date, setDate] = useState<Date>(new Date());
    const [start, setStart] = useState<number>(7);
    const [finish, setFinish] = useState<number>(16);
    const [lines, setLines] = useState<number>(2);
    return (
        <div className='flex w-full flex-col gap-4 p-4'>
            {error ? (
                <p>エラー</p>
            ) : isLoading ? (
                <p>読み込み中</p>
            ) : (
                <DataTable
                    data={schedules ?? data ?? []}
                    columns={[
                        {
                            accessorKey: 'title',
                            header: 'タイトル',
                            size: 150,
                            meta: {
                                type: 'string',
                            },
                        },
                        {
                            accessorKey: 'start_at',
                            header: '開始日時',
                            size: 150,
                            meta: {
                                type: 'datetime',
                            },
                        },
                        {
                            accessorKey: 'finish_at',
                            header: '終了日時',
                            size: 150,
                            meta: {
                                type: 'datetime',
                            },
                        },
                        {
                            accessorKey: 'line',
                            header: '列',
                            size: 100,
                            meta: {
                                type: 'number',
                            },
                        },
                    ]}
                    updateData={(rowIndex, field, value) => {
                        dispatch(updateSchedules({ rowIndex, field, value }));
                    }}
                />
            )}
            <div className='flex flex-row gap-2'>
                <span>
                    <button
                        className='flex rounded-full bg-slate-600 px-4 py-1 text-white'
                        onClick={() => {
                            dispatch(setSchedules(data ?? []));
                        }}
                    >
                        読込
                    </button>
                </span>
                <span>
                    <button
                        className='flex rounded-full bg-slate-600 px-4 py-1 text-white'
                        onClick={() => {
                            dispatch(createSchedule());
                        }}
                    >
                        追加
                    </button>
                </span>
                <span>
                    <button
                        className='flex rounded-full bg-slate-600 px-4 py-1 text-white'
                        onClick={() => {
                            fetch('https://hbu4jsx8qh.execute-api.ap-southeast-2.amazonaws.com/v1/admin/schedules/edit', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(schedules),
                            })
                                .then((res) => res.json())
                                .then((data) => console.log(data));
                        }}
                    >
                        更新
                    </button>
                </span>
            </div>
            <div className='flex w-auto flex-row gap-2'>
                <Field className='w-auto'>
                    <Label>表示日付</Label>
                    <Popover>
                        <PopoverTrigger>
                            <Input
                                type='date'
                                className='shrink-0 bg-white text-base! [&::-webkit-calendar-picker-indicator]:hidden'
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
                    <Label>開始時間</Label>
                    <Input
                        type='number'
                        className='shrink-0 bg-white text-base! [&::-webkit-calendar-picker-indicator]:hidden'
                        min={0}
                        max={finish}
                        value={start}
                        onChange={(e) => setStart(Number(e.currentTarget.value))}
                    />
                </Field>
                <Field className='w-auto'>
                    <Label>終了時間</Label>
                    <Input
                        type='number'
                        className='shrink-0 bg-white text-base! [&::-webkit-calendar-picker-indicator]:hidden'
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
                        className='shrink-0 bg-white text-base! [&::-webkit-calendar-picker-indicator]:hidden'
                        min={1}
                        max={5}
                        value={lines}
                        onChange={(e) => setLines(Number(e.currentTarget.value))}
                    />
                </Field>
            </div>
            <div>
                <EditableDailySchedule dateStr={formatDate(date, 'YYYY-MM-DD')} start={start} finish={finish} lines={lines} editable />
            </div>
        </div>
    );
}

export default ScheduleEdit;
