"use client";

import React, { FC } from "react";
import { notFound } from "next/navigation";
import UserForm from "../../components/userForm";
import { Userssss } from "../../lib/definition";

interface EditUserPageProps {
  params: Promise<{ email: string }>; // `params` adalah Promise
}

const EditUserPage: FC<EditUserPageProps> = ({ params }) => {
  const { email } = React.use(params); // Unwrap `params` menggunakan `React.use()`

  const [user, setUser] = React.useState<Userssss | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${email}`);
        if (!res.ok) {
          throw new Error("User not found");
        }
        const userData: Userssss = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4">
      <h3 className="text-3xl font-semibold">Edit User</h3>
      <UserForm type="EDIT" user={user} />
    </div>
  );
};

export default EditUserPage;
