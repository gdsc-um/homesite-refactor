import { FC } from 'react';
import { QUESTIONS } from '../data/questions';
import QuizForm from '../components/quizForm';
import { QUIZZES } from '../data/quizzes';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>
}

const Page: FC<PageProps> = async ({ params }) => {
    const { id } = await params;

    const existingQuiz = QUIZZES.find(quiz => quiz.id === id);
    if (!existingQuiz) return notFound()

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Edit Question</h3>
            <QuizForm type="EDIT" quiz={existingQuiz} />
        </div>
    )
}

export default Page;