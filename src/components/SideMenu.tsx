import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { useEditorInstance } from '@/contexts/EditorContext';
import { useGetArticlesQuery } from '@/services/articleApi';
import { setArticleID, setBlocks, setCreateAt, setIsPublished, setPublishedAt, setTitle, setUpdateAt } from '@/slices/articleSlice';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

function SideMenu() {
    const { data: articles, error, isLoading } = useGetArticlesQuery();
    const dispatch = useDispatch();
    const editor = useEditorInstance();
    return (
        <div className='flex w-48 shrink-0 flex-col bg-slate-200 p-4'>
            <p className='text-xl font-medium'>メニュー</p>
            <div className='flex flex-col gap-1 p-1 text-sm'>
                <Link to='/news'>記事一覧</Link>
                <Link to='/news/edit'>記事編集</Link>
                <Link to='/schedule/edit'>スケジュール編集</Link>
            </div>
            <Accordion type='single' collapsible defaultValue='item'>
                <AccordionItem value='item'>
                    <AccordionTrigger>記事一覧</AccordionTrigger>
                    <AccordionContent>
                        {error ? (
                            <p>エラー</p>
                        ) : isLoading ? (
                            <p>読み込み中</p>
                        ) : (
                            articles?.map((article) => (
                                <p
                                    key={article.article_id as string}
                                    onClick={() => {
                                        dispatch(setArticleID({ articleID: article.article_id }));
                                        dispatch(setTitle(article.title));
                                        dispatch(setBlocks(article.blocks));
                                        dispatch(setCreateAt(article.create_at));
                                        dispatch(setUpdateAt(article.update_at));
                                        dispatch(setPublishedAt(article.published_at));
                                        dispatch(setIsPublished(article.is_published));
                                        editor.replaceBlocks(editor.document, article.blocks);
                                    }}
                                >
                                    {article.title}
                                </p>
                            ))
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default SideMenu;
