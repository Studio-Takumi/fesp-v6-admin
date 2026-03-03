import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useGetSchedulesQuery } from '@/services/scheduleApi';
import { updateScheduleByUI } from '@/slices/scheduleSlice';
import { formatDate } from '@/utils/formatDate';

function EditableDailySchedule({
    className = '',
    dateStr = '2026/03/01',
    start = 7,
    finish = 16,
    lines = 2,
    unitHeight = 60,
    lineNames = [],
    editable = false,
}: {
    className?: string;
    dateStr: string;
    start: number;
    finish: number;
    lines: number;
    unitHeight?: number;
    lineNames?: string[];
    editable?: boolean;
}) {
    const dispatch = useDispatch();
    //const schedules = useSelector((state: RootState) => state.scheduleReducer.schedules);
    const { data: schedules, error, isLoading } = useGetSchedulesQuery();
    const date = new Date(`${dateStr} ${start}:00:00`);
    const [elementY, setElementY] = useState<number>(0);
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setElementY(rect.top);
        }
    }, []);
    return (
        <div className={clsx('flex w-96 shrink-0 flex-col gap-1 rounded-md bg-white p-2', className)}>
            {error ? (
                <p>エラー</p>
            ) : isLoading ? (
                <p>読み込み中</p>
            ) : (
                <>
                    <div className='flex h-6 shrink-0 flex-row'>
                        <div className='w-12 shrink-0'></div>
                        <div className='grid w-full gap-2 px-2' style={{ gridTemplateColumns: `repeat(${lines}, minmax(0, 1fr))` }} ref={ref}>
                            {lineNames.map((name) => (
                                <div className='flex items-center justify-center text-lg font-medium'>
                                    <p>{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex w-full shrink-0 flex-row'>
                        <div className='flex w-12 shrink-0 flex-col text-end'>
                            {[...Array(finish - start + 1)].map((_, i) => (
                                <div className='shrink-0 -translate-y-3' style={{ height: unitHeight }}>
                                    {start + i}:00
                                </div>
                            ))}
                        </div>
                        <div className='relative h-full w-full'>
                            <div className='absolute flex w-full shrink-0 flex-col text-slate-200'>
                                {[...Array(finish - start + 1)].map(() => (
                                    <div className='shrink-0 border-t border-slate-200' style={{ height: unitHeight }}></div>
                                ))}
                            </div>
                            <div className='absolute grid h-full w-full gap-2 px-2' style={{ gridTemplateColumns: `repeat(${lines}, minmax(0, 1fr))` }} ref={ref}>
                                {[...Array(lines)].map((_, line) => (
                                    <div className='relative h-full w-full'>
                                        {schedules
                                            ?.filter((schedule) => schedule.line === line)
                                            .map((schedule) => (
                                                <>
                                                    <div
                                                        className='absolute w-full rounded bg-slate-600 px-1 text-white select-none'
                                                        style={{
                                                            height:
                                                                (unitHeight * (new Date(schedule.finish_at).getTime() - new Date(schedule.start_at).getTime())) / 60 / 60 / 1000,
                                                            top: (unitHeight * (new Date(schedule.start_at).getTime() - date.getTime())) / 60 / 60 / 1000,
                                                        }}
                                                        draggable={false}
                                                    >
                                                        <p>{schedule.title}</p>
                                                        <p className='text-xs'>
                                                            {formatDate(new Date(schedule.start_at), 'H:mm')} - {formatDate(new Date(schedule.finish_at), 'H:mm')}
                                                        </p>
                                                    </div>
                                                    {editable ? (
                                                        <>
                                                            <div
                                                                className='absolute w-full cursor-n-resize select-none'
                                                                style={{
                                                                    height: unitHeight / 2,
                                                                    top: unitHeight * ((new Date(schedule.start_at).getTime() - date.getTime()) / 60 / 60 / 1000 - 1 / 4),
                                                                }}
                                                                draggable={false}
                                                                onMouseDown={() => {
                                                                    setIsDrag(true);
                                                                }}
                                                                onMouseMove={(e) => {
                                                                    if (isDrag) {
                                                                        dispatch(
                                                                            updateScheduleByUI({
                                                                                id: schedule.schedule_id,
                                                                                field: 'start_at',
                                                                                value: formatDate(
                                                                                    new Date(
                                                                                        date.getTime() + Math.floor(((e.clientY - elementY) / unitHeight) * 6) * 10 * 60 * 1000,
                                                                                    ),
                                                                                    'YYYY-MM-DD HH:mm:ss',
                                                                                ),
                                                                            }),
                                                                        );
                                                                    }
                                                                }}
                                                                onMouseUp={() => {
                                                                    setIsDrag(false);
                                                                }}
                                                                onMouseLeave={() => {
                                                                    setIsDrag(false);
                                                                }}
                                                            ></div>
                                                            <div
                                                                className='absolute w-full cursor-n-resize select-none'
                                                                style={{
                                                                    height: unitHeight / 2,
                                                                    top: unitHeight * ((new Date(schedule.finish_at).getTime() - date.getTime()) / 60 / 60 / 1000 - 1 / 4),
                                                                }}
                                                                draggable={false}
                                                                onMouseDown={() => {
                                                                    setIsDrag(true);
                                                                }}
                                                                onMouseMove={(e) => {
                                                                    if (isDrag) {
                                                                        dispatch(
                                                                            updateScheduleByUI({
                                                                                id: schedule.schedule_id,
                                                                                field: 'finish_at',
                                                                                value: formatDate(
                                                                                    new Date(
                                                                                        date.getTime() + Math.floor(((e.clientY - elementY) / unitHeight) * 6) * 10 * 60 * 1000,
                                                                                    ),
                                                                                    'YYYY-MM-DD HH:mm:ss',
                                                                                ),
                                                                            }),
                                                                        );
                                                                    }
                                                                }}
                                                                onMouseUp={() => {
                                                                    setIsDrag(false);
                                                                }}
                                                                onMouseLeave={() => {
                                                                    if (isDrag) {
                                                                        setIsDrag(false);
                                                                    }
                                                                }}
                                                            ></div>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </>
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditableDailySchedule;
