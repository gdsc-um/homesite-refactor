import React, { FC } from 'react'
import QuestionForm from '../components/questionForm'
import { QUESTIONS } from '../../data/questions';
import { notFound } from 'next/navigation';

interface QuestionPageProps {
    params: Promise<{ questionId: string }>
}

const QuestionPage: FC<QuestionPageProps> = async ({ params }) => {
    const { questionId } = await params;

    const existingQuestion = QUESTIONS.find(question => question.id === questionId);
    if (!existingQuestion) return notFound();

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Detail Question</h3>
            <QuestionForm type="SEE" question={existingQuestion} />
        </div>
    )
}

export default QuestionPage