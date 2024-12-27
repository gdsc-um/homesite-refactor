"use client";

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface AddQuestionProps {
    quizId: string
}

const AddQuestionButton: FC<AddQuestionProps> = ({ quizId }) => {
    const router = useRouter();

    return (
        <Button onClick={() => router.push(`${quizId}/create`)} className="max-w-[7rem]">Add</Button>
    )
}

export default AddQuestionButton