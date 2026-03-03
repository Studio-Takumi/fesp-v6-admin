import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UUIDTypes, v4 as uuidv4 } from 'uuid';
import { schedule } from '@/types/schedule';
import { timestamp } from '@/types/timestamp';
import { formatDate } from '@/utils/formatDate';

export type ScheduleState = {
    schedules: schedule[];
};
const initialState: ScheduleState = {
    schedules: [],
};
export const scheduleSlice = createSlice({
    name: 'Schedule',
    initialState,
    reducers: {
        setSchedules: (state, action: PayloadAction<schedule[]>) => {
            state.schedules = action.payload;
        },
        updateSchedules: (state, action: PayloadAction<{ rowIndex: number; field: string; value: string | number }>) => {
            const { rowIndex, field, value } = action.payload;
            state.schedules = state.schedules.map((schedule, index) => (index === rowIndex ? { ...schedule, [field]: value } : schedule));
        },
        createSchedule: (state) => {
            state.schedules.push({
                schedule_id: uuidv4(),
                title: '',
                start_at: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') as timestamp,
                finish_at: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') as timestamp,
                line: 0,
            });
        },
        updateScheduleByUI: (state, action: PayloadAction<{ id: UUIDTypes; field: string; value: string | number }>) => {
            const { id, field, value } = action.payload;
            state.schedules = state.schedules.map((schedule) => (schedule.schedule_id === id ? { ...schedule, [field]: value } : schedule));
        },
    },
});

export const { setSchedules, updateSchedules, createSchedule, updateScheduleByUI } = scheduleSlice.actions;
export default scheduleSlice.reducer;
