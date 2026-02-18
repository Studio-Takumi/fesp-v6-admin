import { BasicTextStyleButton, CreateLinkButton, FormattingToolbarController, SuggestionMenuController, TextAlignButton, useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import { ClipboardIcon, Heading1Icon, Heading2Icon, Heading3Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, MinusIcon, PaletteIcon, TableIcon, TextQuoteIcon, TypeIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

function ArticleEditor() {
    const editor = useCreateBlockNote();
    const SlashMenu = () => {
        const currentBlock = editor.getTextCursorPosition().block;
        return (
            <div className='flex w-64 flex-col gap-1 rounded-md border border-slate-200 bg-white p-2 shadow-xl'>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'paragraph' }], currentBlock, 'before');
                    }}
                >
                    <TypeIcon size={18} />
                    <p className='text-sm'>テキスト</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'heading', props: { level: 1 } }], currentBlock, 'before');
                    }}
                >
                    <Heading1Icon size={18} />
                    <p className='text-sm'>見出し1</p>
                    <p className='ml-auto text-xs text-slate-400'>#</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'heading', props: { level: 2 } }], currentBlock, 'before');
                    }}
                >
                    <Heading2Icon size={18} />
                    <p className='text-sm'>見出し2</p>
                    <p className='ml-auto text-xs text-slate-400'>##</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'heading', props: { level: 3 } }], currentBlock, 'before');
                    }}
                >
                    <Heading3Icon size={18} />
                    <p className='text-sm'>見出し3</p>
                    <p className='ml-auto text-xs text-slate-400'>###</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'bulletListItem' }], currentBlock, 'before');
                    }}
                >
                    <ListIcon size={18} />
                    <p className='text-sm'>箇条書きリスト</p>
                    <p className='ml-auto text-xs text-slate-400'>-</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'numberedListItem' }], currentBlock, 'before');
                    }}
                >
                    <ListOrderedIcon size={18} />
                    <p className='text-sm'>番号付きリスト</p>
                    <p className='ml-auto text-xs text-slate-400'>1.</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'checkListItem' }], currentBlock, 'before');
                    }}
                >
                    <ListTodoIcon size={18} />
                    <p className='text-sm'>ToDoリスト</p>
                    <p className='ml-auto text-xs text-slate-400'>[]</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'toggleListItem' }], currentBlock, 'before');
                    }}
                >
                    <ListCollapseIcon size={18} />
                    <p className='text-sm'>トグルリスト</p>
                    <p className='ml-auto text-xs text-slate-400'>{'>'}</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'quote' }], currentBlock, 'before');
                    }}
                >
                    <TextQuoteIcon size={18} />
                    <p className='text-sm'>引用</p>
                    <p className='ml-auto text-xs text-slate-400'>{'"'}</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks(
                            [
                                {
                                    type: 'table',
                                    content: {
                                        type: 'tableContent',
                                        rows: [
                                            {
                                                cells: [
                                                    {
                                                        type: 'tableCell',
                                                    },
                                                    {
                                                        type: 'tableCell',
                                                    },
                                                    {
                                                        type: 'tableCell',
                                                    },
                                                ],
                                            },
                                            {
                                                cells: [
                                                    {
                                                        type: 'tableCell',
                                                    },
                                                    {
                                                        type: 'tableCell',
                                                    },
                                                    {
                                                        type: 'tableCell',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            ],
                            currentBlock,
                            'before',
                        );
                    }}
                >
                    <TableIcon size={18} />
                    <p className='text-sm'>テーブル</p>
                </div>
                <div
                    className='flex flex-row items-center gap-2 rounded p-1 transition-colors hover:bg-slate-50'
                    onClick={() => {
                        editor.insertBlocks([{ type: 'divider' }], currentBlock, 'before');
                    }}
                >
                    <MinusIcon size={18} />
                    <p className='text-sm'>区切り線</p>
                    <p className='ml-auto text-xs text-slate-400'>---</p>
                </div>
            </div>
        );
    };
    const Toolbar = () => {
        return (
            <div className='flex flex-row gap-1 rounded-md border border-slate-200 bg-white p-1 shadow'>
                <div className='flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-slate-100'>
                    <ClipboardIcon size={16} />
                </div>
                <div className='flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-slate-100'>
                    <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
                </div>
                <div className='flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-slate-100'>
                    <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
                </div>
                <div className='flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-slate-100'>
                    <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
                </div>
                <div className='flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-slate-100'>
                    <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} />
                </div>
                <div className='flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-slate-100'>
                    <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
                </div>
                <div className='flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-slate-100'>
                    <CreateLinkButton key={'createLinkButton'} />
                </div>
                <div className='flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-slate-100'>
                    <Popover>
                        <PopoverTrigger>
                            <PaletteIcon size={16} />
                        </PopoverTrigger>
                        <PopoverContent className='w-40 p-2'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-sm text-slate-500'>文字色</p>
                                <div className='grid grid-cols-5 gap-1'>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-gray-300'>A</div>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-pink-300 text-pink-500'>A</div>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-red-300 text-red-500'>A</div>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-orange-300 text-orange-500'>A</div>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-yellow-300 text-yellow-500'>A</div>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-green-300 text-green-500'>A</div>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-sky-300 text-sky-500'>A</div>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-indigo-300 text-indigo-500'>A</div>
                                    <div className='flex h-6 w-6 items-center justify-center rounded border border-purple-300 text-purple-500'>A</div>
                                </div>
                                <p className='text-sm text-slate-500'>背景色</p>
                                <div className='grid grid-cols-5 gap-1'>
                                    <div className='flex h-6 w-6 rounded border border-gray-300 bg-gray-100'></div>
                                    <div className='flex h-6 w-6 rounded border border-pink-300 bg-pink-100'></div>
                                    <div className='flex h-6 w-6 rounded border border-red-300 bg-red-100'></div>
                                    <div className='flex h-6 w-6 rounded border border-orange-300 bg-orange-100'></div>
                                    <div className='flex h-6 w-6 rounded border border-yellow-300 bg-yellow-100'></div>
                                    <div className='flex h-6 w-6 rounded border border-green-300 bg-green-100'></div>
                                    <div className='flex h-6 w-6 rounded border border-sky-300 bg-sky-100'></div>
                                    <div className='flex h-6 w-6 rounded border border-indigo-300 bg-indigo-100'></div>
                                    <div className='flex h-6 w-6 rounded border border-purple-300 bg-purple-100'></div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        );
    };
    return (
        <>
            <BlockNoteView className='rounded-md border bg-white py-4 shadow-xs' data-color-scheme='light' editor={editor} slashMenu={false} formattingToolbar={false}>
                <SuggestionMenuController
                    triggerCharacter='/'
                    getItems={async () => {
                        return [];
                    }}
                    suggestionMenuComponent={SlashMenu}
                />
                <FormattingToolbarController formattingToolbar={Toolbar} />
            </BlockNoteView>
        </>
    );
}

export default ArticleEditor;
