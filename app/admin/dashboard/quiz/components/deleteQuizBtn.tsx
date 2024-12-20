import { Trash } from 'lucide-react'
import React, { FC } from 'react'
import { deleteQuiz } from '../lib/action'

interface DeleteQuizBtnProps {
    id: string
}

const DeleteQuizBtn: FC<DeleteQuizBtnProps> = ({ id }) => {
    return (
        <form action={deleteQuiz.bind(null, id)}>
            <button type='submit' className="">
                <Trash size={15} />
            </button>
        </form>
    )
}

export default DeleteQuizBtn