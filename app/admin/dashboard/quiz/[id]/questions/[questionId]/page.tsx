"use client";

import React, { useEffect, useState } from 'react'
import QuestionForm from '../../components/questionForm'
import { notFound, useParams } from 'next/navigation';
import { Questions } from '@prisma/client';

const QuestionPage = () => {
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
    }, [quizId, questionId]);

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Detail Question</h3>
            {!isLoading && <QuestionForm type="SEE" question={question!} />}
        </div>
    )
}

export default QuestionPage