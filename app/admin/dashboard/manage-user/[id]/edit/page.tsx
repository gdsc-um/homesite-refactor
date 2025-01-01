import React, { FC } from 'react'
import { USERS } from '../../data/users';
import { notFound } from 'next/navigation';
import UserForm from '../../components/userForm';

interface EditUserPageProps {
    params: Promise<{ id: string }>
}

const EditUserPage: FC<EditUserPageProps> = async ({ params }) => {
    const { id } = await params;

    const existingUser = USERS.find(user => user.id === id);
    if (!existingUser) return notFound()

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>

            <h3 className='text-3xl font-semibold'>Edit User</h3>
            <UserForm type="EDIT" user={existingUser} />
        </div>
    )
}

export default EditUserPage