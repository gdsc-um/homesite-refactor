import { Trash } from 'lucide-react'
import React, { FC } from 'react'

interface DeleteQuizBtnProps {
    id: string
}

const DeleteQuizBtn: FC<DeleteQuizBtnProps> = ({ id }) => {
    return (
        <form>
            <button type='submit' className="">
                <Trash size={15} />
            </button>
        </form>
    )
}

export default DeleteQuizBtn