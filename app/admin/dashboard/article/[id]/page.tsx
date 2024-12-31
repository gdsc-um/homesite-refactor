import { FC } from "react";
import ArticleForm from "../components/articleForm";
import { articles } from "../data/articles";

interface PageProps {
    params: Promise<{ id: string }>
}

const Page: FC<PageProps> = async ({ params }) => {
    const { id } = await params;

    const existingArticle = articles.find(article => article.id === id);

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Edit Article</h3>
            <ArticleForm type="EDIT" article={existingArticle} />
        </div>
    )
}

export default Page