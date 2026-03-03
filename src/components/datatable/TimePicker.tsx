import { useState } from 'react';

function TimePicker(props: { onClick: (time: string) => void }) {
    const { onClick } = props;
    const hourChar = [...Array(24)].map((_, index) => (index < 10 ? '0' + String(index) : String(index)));
    const minChar = [...Array(60)].map((_, index) => (index < 10 ? '0' + String(index) : String(index)));
    const [hourOffset, setHourOffset] = useState<number>(0);
    const [minOffset, setMinOffset] = useState<number>(0);
    const hour = (24 - hourOffset) % 24;
    const min = (60 - minOffset) % 60;
    return (
        <div className='flex flex-col gap-2 p-2'>
            <div>
                <input
                    className='flex h-10 w-27 items-center justify-center rounded border border-slate-100 outline-none! [&::-webkit-calendar-picker-indicator]:hidden'
                    type='time'
                    value={`${hour < 10 ? '0' + String(hour) : String(hour)}:${min < 10 ? '0' + String(min) : String(min)}`}
                    onChange={(e) => {
                        setHourOffset(24 - Number(e.currentTarget.value.substring(0, 2)));
                        setMinOffset(60 - Number(e.currentTarget.value.substring(3, 5)));
                        onClick(`${hour < 10 ? '0' + String(hour) : String(hour)}:${min < 10 ? '0' + String(min) : String(min)}`);
                    }}
                />
            </div>
            <div className='flex flex-row items-center gap-1'>
                <div
                    className='flex h-48 w-12 items-center justify-center rounded border border-slate-100 bg-white'
                    onWheel={(e) => {
                        setHourOffset(hourOffset - e.deltaY / 100);
                        onClick(`${hour < 10 ? '0' + String(hour) : String(hour)}:${min < 10 ? '0' + String(min) : String(min)}`);
                    }}
                >
                    <div className='relative h-6 w-12 shrink-0 bg-slate-100 tabular-nums'>
                        {hourChar.map((num, index) => {
                            const position = ((index + hourOffset + 12) % 24) - 12;
                            return (
                                <div
                                    className='absolute h-6 w-12 text-center text-base transition-all'
                                    style={{
                                        top: position * 24,
                                        opacity: 1 - position ** 2 / 10,
                                        display: position ** 2 <= 16 ? 'block' : 'none',
                                    }}
                                    onClick={() => {
                                        setHourOffset(hourOffset - position);
                                        onClick(`${hour < 10 ? '0' + String(hour) : String(hour)}:${min < 10 ? '0' + String(min) : String(min)}`);
                                    }}
                                >
                                    {num}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <p>:</p>
                <div
                    className='flex h-48 w-12 items-center justify-center rounded border border-slate-100 bg-white'
                    onWheel={(e) => {
                        setMinOffset(minOffset - e.deltaY / 100);
                        onClick(`${hour < 10 ? '0' + String(hour) : String(hour)}:${min < 10 ? '0' + String(min) : String(min)}`);
                    }}
                >
                    <div className='relative h-6 w-12 shrink-0 bg-slate-100 tabular-nums'>
                        {minChar.map((num, index) => {
                            const position = ((index + minOffset + 30) % 60) - 30;
                            return (
                                <div
                                    className='absolute h-6 w-12 text-center text-base transition-all'
                                    style={{
                                        top: position * 24,
                                        opacity: 1 - position ** 2 / 10,
                                        display: position ** 2 <= 16 ? 'block' : 'none',
                                    }}
                                    onClick={() => {
                                        setMinOffset(minOffset - position);
                                        onClick(`${hour < 10 ? '0' + String(hour) : String(hour)}:${min < 10 ? '0' + String(min) : String(min)}`);
                                    }}
                                >
                                    {num}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimePicker;
