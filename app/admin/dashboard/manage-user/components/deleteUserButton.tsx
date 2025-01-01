import { Trash } from 'lucide-react'
import React, { FC } from 'react'

interface DeleteUserBtnProps {
    id: string
}

const DeleteUserBtn: FC<DeleteUserBtnProps> = ({ id }) => {
    return (
        <form>
            <button type='submit' className="">
                <Trash size={15} />
            </button>
        </form>
    )
}

export default DeleteUserBtn