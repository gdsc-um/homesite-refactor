import React, { FC } from 'react'
import { QUIZZES } from '../../data/quizzes';
import { notFound } from 'next/navigation';
import QuizForm from '../../components/quizForm';

interface EditQuizPageProps {
    params: Promise<{ id: string }>
}

const EditQuizPage: FC<EditQuizPageProps> = async ({ params }) => {
    const { id } = await params;

    const existingQuiz = QUIZZES.find(quiz => quiz.id === id);
    if (!existingQuiz) return notFound()

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Edit Quiz</h3>
            <QuizForm type="EDIT" quiz={existingQuiz} />
        </div>
    )
}

export default EditQuizPage