"use client";

import React, { FC, useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation';
import QuizForm from '../../components/quizForm';
import { QuizWithAllRelations } from '../../lib/definition';

const EditQuizPage = () => {
    const [quiz, setQuiz] = useState<QuizWithAllRelations | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id } = useParams();
    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await fetch(`/api/quizzes/${id}`);
            if (response.status === 404) return notFound();
            const data = await response.json();
            setQuiz(data.data);
            setIsLoading(false);
        }
        fetchQuiz();
    }, []);


    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Edit Quiz</h3>
            {!isLoading && <QuizForm type="EDIT" quiz={quiz!} />}
        </div>
    )
}

export default EditQuizPage