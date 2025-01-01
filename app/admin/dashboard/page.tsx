"use client"
import React from 'react';
import { useSession } from "next-auth/react";
function Page() {
  const { data: session } = useSession();
  return (
    <>
      <p>{JSON.stringify(session)}</p>
    </>
  );
}

export default Page;