import { Trash } from 'lucide-react';
import React, { FC } from 'react';

interface DeleteUserBtnProps {
    id: string;
}

const DeleteUserBtn: FC<DeleteUserBtnProps> = ({ id }) => {
    const handleDelete = (event: React.FormEvent) => {
        event.preventDefault();
        // Logic to delete the user with the given id
        console.log(`Delete user with id: ${id}`);
        // You can make an API call or trigger any deletion logic here
    };

    return (
        <form onSubmit={handleDelete}>
            <button type="submit" className="">
                <Trash size={15} />
            </button>
        </form>
    );
};

export default DeleteUserBtn;
