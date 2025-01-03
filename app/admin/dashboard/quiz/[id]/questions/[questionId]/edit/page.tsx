"use client";

import React, { useEffect, useState } from 'react'
import QuestionForm from '../../../components/questionForm'
import { QUESTIONS } from '../../../../data/questions';
import { notFound, useParams } from 'next/navigation';
import { Questions } from '@prisma/client';


const EditQuestionPage = () => {
    const [question, setQuestion] = useState<Questions | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id: quizId, questionId } = useParams();
    useEffect(() => {
        const fetchQuestion = async () => {
            const response = await fetch(`/api/quizzes/${quizId}/questions/${questionId}`);
            if (response.status === 404) return notFound();
            const data = await response.json();
            setQuestion(data.data);
            setIsLoading(false);
        }
        fetchQuestion();
    }, [])

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Edit Question</h3>
            {!isLoading && <QuestionForm type="EDIT" question={question!} />}
        </div>
    )
}

export default EditQuestionPage