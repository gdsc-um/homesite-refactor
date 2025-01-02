"use client";

import React, { FC, useEffect, useState } from 'react';
import { USERS } from '../../data/users';
import { notFound } from 'next/navigation';
import UserForm from '../../components/userForm';

// Assuming the User and UserRole types are defined as shown above
import { User, UserRole } from '../../lib/definition';

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

const EditUserPage: FC<EditUserPageProps> = ({ params }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const existingUser = USERS.find((user) => user.id === id);
      if (!existingUser) {
        notFound();
      } else {
        // Ensure the role is set correctly
        const updatedUser: User = {
          ...existingUser,
          role: existingUser.role as UserRole, // Cast if necessary, or ensure role is a valid UserRole
        };
        setUser(updatedUser);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>
      <h3 className='text-3xl font-semibold'>Edit User</h3>
      <UserForm type="EDIT" user={user} />
    </div>
  );
}

export default EditUserPage;
