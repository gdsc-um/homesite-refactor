import ArticleForm from "../components/articleForm"

const Page = () => {
    return (
        <div className='px-2 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>
            <h3 className='text-3xl font-semibold'>Add New Article</h3>
            <ArticleForm type="ADD" />
        </div>
    )
}

export default Page