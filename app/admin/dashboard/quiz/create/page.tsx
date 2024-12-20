import QuizForm from "../components/quizForm"

const Page = () => {
    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Add New Question</h3>
            <QuizForm type="ADD" />
        </div>
    )
}

export default Page