import { Trash } from 'lucide-react';
import React, { FC } from 'react';

interface DeleteArticleBtnProps {
    id: string;  // Ensure the id is used
}

const DeleteArticleBtn: FC<DeleteArticleBtnProps> = ({ id }) => {
    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        // Call the delete function here using the id
        console.log(`Delete article with ID: ${id}`);
        // You can call an API or perform other actions based on the id
    };

    return (
        <form onSubmit={handleDelete}>
            <button type="submit" className="">
                <Trash size={15} />
            </button>
        </form>
    );
};

export default DeleteArticleBtn;
