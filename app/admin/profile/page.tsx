"use client";

import React from "react";
import ProfileForm from "./components/profileForm";
import { useSessionContext } from "@/app/context/sessionContext";

const EditProfilePage = () => {
  const { isLoading, session } = useSessionContext();

  if (isLoading) {
    return <div>Loading...</div>; // TODO: Improve loading UI
  }

  const user = session?.user;

  // Early return if user is undefined
  if (!user) {
    return <div>User not found</div>; // Or any other fallback UI
  }

  // Ensure that name and email are always valid strings
  const userWithDefaults = {
    name: user.name ?? "Default Name", // Set default name if it's null or undefined
    email: user.email ?? "default@example.com", // Set default email if it's null or undefined
  };

  return (
    <div className="px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4">
      <h3 className="text-3xl font-semibold">Edit Profile</h3>
      <ProfileForm user={userWithDefaults} />
    </div>
  );
};

export default EditProfilePage;
