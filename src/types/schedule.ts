import { UUIDTypes } from 'uuid';
import { timestamp } from './timestamp';

export type schedule = {
    schedule_id: UUIDTypes;
    title: string;
    start_at: timestamp;
    finish_at: timestamp;
    line: number;
};
