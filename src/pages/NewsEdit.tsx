import ArticleEditor from '@/components/ArticleEditor';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function NewsEdit() {
    return (
        <div className='flex min-h-screen flex-row bg-slate-100'>
            <div className='w-64 bg-slate-200 p-4'>
                <p className='text-xl font-medium'>メニュー</p>
            </div>
            <div className='flex w-full flex-col gap-4 p-4'>
                <Field>
                    <Label>記事タイトル</Label>
                    <Input className='bg-slate-50' />
                </Field>
                <Field>
                    <Label>本文</Label>
                    <ArticleEditor />
                </Field>
            </div>
        </div>
    );
}

export default NewsEdit;
