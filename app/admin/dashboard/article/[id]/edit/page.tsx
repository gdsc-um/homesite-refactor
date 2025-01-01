import React, { FC } from 'react'
import { ARTICLES } from '../../data/articles';
import { notFound } from 'next/navigation';
import ArticleForm from '../../components/articleForm';

interface EditArticlePageProps {
    params: Promise<{ id: string }>
}

const EditArticlePage: FC<EditArticlePageProps> = async ({ params }) => {
    const { id } = await params;

    const existingArticle = ARTICLES.find(article => article.id === id);
    if (!existingArticle) return notFound()

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Edit Article</h3>
            <ArticleForm type="EDIT" article={existingArticle} />
        </div>
    )
}

export default EditArticlePage