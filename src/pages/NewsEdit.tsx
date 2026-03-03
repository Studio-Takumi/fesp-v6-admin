import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Block } from '@blocknote/core';
import { UUIDTypes } from 'uuid';
import ArticleEditor from '@/components/ArticleEditor';
import { Calendar } from '@/components/ui/calendar';
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue } from '@/components/ui/combobox';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { setIsPublished, setPublishedAt, setTitle } from '@/slices/articleSlice';
import { RootState } from '@/store/store';
import { timestamp } from '@/types/timestamp';
import { formatDate } from '@/utils/formatDate';

function NewsEdit() {
    const dispatch = useDispatch();
    const title: string = useSelector((state: RootState) => state.articleReducer.title);
    const blocks: Block[] = useSelector((state: RootState) => state.articleReducer.blocks);
    const articleID: UUIDTypes = useSelector((state: RootState) => state.articleReducer.articleID);
    const create_at: timestamp = useSelector((state: RootState) => state.articleReducer.create_at);
    const is_published: boolean = useSelector((state: RootState) => state.articleReducer.is_published);
    const published_at: timestamp = useSelector((state: RootState) => state.articleReducer.published_at);
    const weekName = ['日', '月', '火', '水', '木', '金', '土'];
    const [sharedTags, setSharedTags] = useState<string[]>(['A', 'B']);
    const [tags, setTags] = useState<string[]>([]);
    const [inputTag, setInputTag] = useState<string>('');
    return (
        <div className='flex w-full flex-col gap-4 p-4'>
            <div className='flex justify-end'>
                <button
                    className='rounded-full bg-slate-600 px-3 py-1 text-white'
                    onClick={() => {
                        fetch('https://hbu4jsx8qh.execute-api.ap-southeast-2.amazonaws.com/v1/admin/articles/edit', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                article_id: articleID,
                                create_at,
                                update_at: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                                title,
                                blocks,
                                published_at,
                                is_published,
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => console.log(data));
                    }}
                >
                    更新
                </button>
            </div>
            <Field>
                <Label>公開（公開日時）</Label>
                <Switch checked={is_published} onCheckedChange={(check) => dispatch(setIsPublished(check))} />
                <div className='flex flex-row gap-2'>
                    <Popover>
                        <PopoverTrigger>
                            <Input
                                type='date'
                                className='w-40 shrink-0 bg-white text-base! [&::-webkit-calendar-picker-indicator]:hidden'
                                placeholder='日付'
                                value={formatDate(new Date(published_at), 'YYYY-MM-DD')}
                            />
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                            <Calendar
                                mode='single'
                                onSelect={(date) =>
                                    dispatch(setPublishedAt((formatDate(date as Date, 'YYYY-MM-DD ') + formatDate(new Date(published_at), 'HH:mm:ss')) as timestamp))
                                }
                                formatters={{
                                    formatCaption: (date) => formatDate(date, 'YYYY年M月'),
                                    formatWeekdayName: (date: Date) => weekName[date.getDay()],
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <Input
                        type='time'
                        className='w-40 shrink-0 appearance-none bg-white text-base! [&::-webkit-calendar-picker-indicator]:hidden'
                        placeholder='時間'
                        value={formatDate(new Date(published_at), 'HH:mm')}
                        onChange={(e) => dispatch(setPublishedAt((formatDate(new Date(published_at), 'YYYY-MM-DD ') + e.currentTarget.value + ':00') as timestamp))}
                    />
                </div>
            </Field>
            <Field>
                <Label>記事タイトル</Label>
                <Input value={title} onChange={(e) => dispatch(setTitle(e.currentTarget.value))} className='bg-white' />
            </Field>
            <Field>
                <Label>タグ</Label>
                <Combobox multiple items={sharedTags} value={tags} onValueChange={(value) => setTags(value)}>
                    <ComboboxChips className='bg-white'>
                        <ComboboxValue>
                            {(values) =>
                                values.map((value: string) => (
                                    <ComboboxChip key={value} className='rounded-full px-2 text-sm'>
                                        {value}
                                    </ComboboxChip>
                                ))
                            }
                        </ComboboxValue>
                        <ComboboxChipsInput
                            value={inputTag}
                            onChange={(e) => setInputTag(e.currentTarget.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (sharedTags.some((tag) => tag === inputTag)) {
                                        if (tags.some((tag) => tag === inputTag)) {
                                            setTags(tags.filter((tag) => tag !== inputTag));
                                            setInputTag('');
                                        } else {
                                            setTags([...tags, inputTag]);
                                            setInputTag('');
                                        }
                                    } else if (inputTag !== '') {
                                        setSharedTags([...sharedTags, inputTag]);
                                        setTags([...tags, inputTag]);
                                        setInputTag('');
                                    }
                                }
                            }}
                        />
                    </ComboboxChips>
                    <ComboboxContent align='start' className='w-20'>
                        <ComboboxEmpty className='flex-row items-start justify-start p-2.5'>
                            <div className='rounded-full bg-slate-100 px-2 text-black'>{inputTag}</div>を新しく追加
                        </ComboboxEmpty>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item} value={item}>
                                    {item}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </Field>
            <Field>
                <Label>本文</Label>
                <ArticleEditor />
            </Field>
        </div>
    );
}

export default NewsEdit;
