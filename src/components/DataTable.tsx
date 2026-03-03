import { useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table';
import EditableCell from './datatable/EditableCell';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, field: string, value: string | number) => void;
        editingRowIndex: number | null;
        editingField: string | null;
        setEditingCell: (rowIndex: number | null, field: string | null) => void;
    }
    interface ColumnMeta<TData extends RowData, TValue> {
        type: 'string' | 'number' | 'date' | 'datetime' | 'boolean' | 'singleSelect';
        headerName?: string;
        valueOptions?: string[];
        valueFormatter?: (value: string | number) => string;
    }
}
function DataTable(props: { data: unknown[]; columns: ColumnDef<unknown, any>[]; updateData: (rowIndex: number, field: string, value: any) => void }) {
    const { data, columns, updateData } = props;
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const [editingField, setEditingField] = useState<string | null>(null);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            updateData,
            editingField,
            editingRowIndex,
            setEditingCell: (rowIndex: number | null, field: string | null) => {
                setEditingRowIndex(rowIndex);
                setEditingField(field);
            },
        },
    });
    return (
        <div className='w-full rounded-md bg-white p-4'>
            <div
                className='grid border-b-2 border-slate-200 py-1'
                style={{
                    gridTemplateColumns: table
                        .getVisibleLeafColumns()
                        .map((column) => `${column.getSize()}px`)
                        .join(' '),
                }}
            >
                {table
                    .getHeaderGroups()
                    .map((headerGroup) =>
                        headerGroup.headers.map((header) => <div className='px-2 font-medium'>{flexRender(header.column.columnDef.header, header.getContext())}</div>),
                    )}
            </div>
            <div className='flex flex-col divide-y divide-slate-200 text-sm'>
                {table.getRowModel().rows.map((row) => (
                    <div
                        key={row.id}
                        className='grid min-h-8'
                        style={{
                            gridTemplateColumns: table
                                .getVisibleLeafColumns()
                                .map((column) => `${column.getSize()}px`)
                                .join(' '),
                        }}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <div
                                key={cell.id}
                                className={`flex items-center ${editingRowIndex === cell.row.index && editingField === cell.column.id ? 'bg-slate-50' : ''} px-2`}
                                onDoubleClick={() => {
                                    table.options.meta?.setEditingCell(row.index, cell.column.id);
                                }}
                            >
                                <EditableCell info={cell.getContext()} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataTable;
