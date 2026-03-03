import { CellContext } from '@tanstack/react-table';
import { formatDate } from '@/utils/formatDate';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import TimePicker from './TimePicker';

function EditableCell(props: { info: CellContext<unknown, any> }) {
    const { info } = props;
    const isEditing = info.table.options.meta?.editingRowIndex === props.info.row.index && props.info.table.options.meta?.editingField === props.info.column.id;
    const cellType = info.column.columnDef.meta?.type;
    const weekName = ['日', '月', '火', '水', '木', '金', '土'];
    switch (cellType) {
        case 'string':
            if (isEditing) {
                return (
                    <input
                        className='h-full w-full outline-none!'
                        type='text'
                        value={info.getValue() ?? ''}
                        autoFocus
                        onChange={(e) => {
                            info.table.options.meta?.updateData(info.row.index, info.column.id, e.target.value);
                        }}
                        onBlur={() => {
                            props.info.table.options.meta?.setEditingCell(null, null);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                props.info.table.options.meta?.setEditingCell(null, null);
                            }
                        }}
                    />
                );
            } else {
                return <div>{String(info.getValue())}</div>;
            }
        case 'number':
            if (isEditing) {
                return (
                    <input
                        className='h-full w-full outline-none!'
                        type='number'
                        value={info.getValue() ?? ''}
                        autoFocus
                        onChange={(e) => {
                            info.table.options.meta?.updateData(info.row.index, info.column.id, Number(e.target.value));
                        }}
                        onBlur={() => {
                            props.info.table.options.meta?.setEditingCell(null, null);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                props.info.table.options.meta?.setEditingCell(null, null);
                            }
                        }}
                    />
                );
            } else {
                return <div>{String(info.getValue())}</div>;
            }
        case 'date':
            if (isEditing) {
                return (
                    <Popover
                        open
                        onOpenChange={(open) => {
                            if (!open) {
                                props.info.table.options.meta?.setEditingCell(null, null);
                            }
                        }}
                    >
                        <PopoverTrigger>
                            <input
                                className='h-full w-full outline-none! [&::-webkit-calendar-picker-indicator]:hidden'
                                type='date'
                                value={formatDate(new Date(info.getValue()), 'YYYY-MM-DD') ?? ''}
                                onChange={(e) => {
                                    info.table.options.meta?.updateData(info.row.index, info.column.id, Number(e.target.value));
                                }}
                                onBlur={() => {
                                    props.info.table.options.meta?.setEditingCell(null, null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        props.info.table.options.meta?.setEditingCell(null, null);
                                    }
                                }}
                            />
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                            <Calendar
                                mode='single'
                                formatters={{
                                    formatCaption: (date) => formatDate(date, 'YYYY年M月'),
                                    formatWeekdayName: (date: Date) => weekName[date.getDay()],
                                }}
                                selected={new Date(info.getValue())}
                                onSelect={(date) => {
                                    info.table.options.meta?.updateData(info.row.index, info.column.id, formatDate(date as Date, 'YYYY-MM-DD HH:mm:ss'));
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                );
            } else {
                return <div>{formatDate(new Date(info.getValue()), 'YYYY/MM/DD')}</div>;
            }
        case 'datetime':
            if (isEditing) {
                return (
                    <Popover
                        open
                        onOpenChange={(open) => {
                            if (!open) {
                                props.info.table.options.meta?.setEditingCell(null, null);
                            }
                        }}
                    >
                        <PopoverTrigger>
                            <input
                                className='h-full w-full outline-none! [&::-webkit-calendar-picker-indicator]:hidden'
                                type='datetime-local'
                                value={formatDate(new Date(info.getValue()), 'YYYY-MM-DD HH:mm') ?? ''}
                                onChange={(e) => {
                                    info.table.options.meta?.updateData(info.row.index, info.column.id, Number(e.target.value));
                                }}
                                onBlur={() => {
                                    props.info.table.options.meta?.setEditingCell(null, null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        props.info.table.options.meta?.setEditingCell(null, null);
                                    }
                                }}
                            />
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                            <div className='flex flex-row items-center'>
                                <Calendar
                                    mode='single'
                                    formatters={{
                                        formatCaption: (date) => formatDate(date, 'YYYY年M月'),
                                        formatWeekdayName: (date: Date) => weekName[date.getDay()],
                                    }}
                                    selected={new Date(info.getValue())}
                                    onSelect={(date) => {
                                        info.table.options.meta?.updateData(
                                            info.row.index,
                                            info.column.id,
                                            formatDate(date as Date, 'YYYY-MM-DD ') + formatDate(new Date(info.getValue()), 'HH:mm:00'),
                                        );
                                    }}
                                />

                                <TimePicker
                                    onClick={(time) => {
                                        info.table.options.meta?.updateData(
                                            info.row.index,
                                            info.column.id,
                                            formatDate(new Date(info.getValue()), 'YYYY-MM-DD ') + time + ':00',
                                        );
                                    }}
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                );
            } else {
                return <div>{formatDate(new Date(info.getValue()), 'YYYY/MM/DD HH:mm')}</div>;
            }
        default:
            return <div>{String(info.getValue())}</div>;
    }
}

export default EditableCell;
