import DataTable from '@/components/DataTable';
import { useGetArticlesQuery } from '@/services/articleApi';

function NewsManage() {
    const { data: articles, error, isLoading } = useGetArticlesQuery();
    return (
        <div className='flex w-full flex-col gap-4 p-4'>
            {error ? (
                <p>エラー</p>
            ) : isLoading ? (
                <p>読み込み中</p>
            ) : (
                <DataTable
                    data={articles ?? []}
                    columns={[
                        {
                            accessorKey: 'article_id',
                            header: 'ID',
                            size: 100,
                        },
                        {
                            accessorKey: 'create_at',
                            header: '作成日時',
                            size: 100,
                        },
                        {
                            accessorKey: 'update_at',
                            header: '更新日時',
                            size: 100,
                        },
                        {
                            accessorKey: 'title',
                            header: 'タイトル',
                            size: 100,
                        },
                    ]}
                    updateData={() => {}}
                />
            )}
        </div>
    );
}

export default NewsManage;
