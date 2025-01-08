"use client";

import CardName from "@/components/CardName";
import Head from "next/head";
import { Userssss } from "@/app/admin/dashboard/manage-user/lib/definition";
import { useState, useEffect } from "react";

export default function Team() {
  const [users, getUsers] = useState<Userssss[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data: Userssss[] = await response.json();
          getUsers(data);
          console.log(data);
        } else {
          console.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Head>
        <title>Core Team | GDSC Universitas Negeri Malang</title>
        <meta name="description" content="Core Team GDSC Universitas Negeri Malang" />
      </Head>
      <div className="mx-auto container py-32 flex flex-col gap-8 justify-center items-center">
        <h1 className="text-3xl lg:text-6xl text-center font-bold text-blue-500">
          Ini adalah tim kami
        </h1>
        <div className="grid lg:grid-cols-4 gap-5 mt-8">
          {users.length === 0 ? (
            <p className="text-gray-500">No team members found.</p>
          ) : (
            users.map((user) => (
              <CardName
                key={user.nim}
                name={user.name}
                roleTim={user.role_tim}
                picture={user.avatar}
                profile_url={user.profil_bevy} // Pastikan data ini ada di API
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
