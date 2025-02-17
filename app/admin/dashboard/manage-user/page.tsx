"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { columns } from "./components/userColumns";
import { Userssss } from "./lib/definition";

const UserPage: FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Userssss[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Userssss[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data: Userssss[] = await response.json();
          setUsers(data);
          setFilteredUsers(data); // Initialize filteredUsers with the full list
        } else {
          console.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search term updates
  useEffect(() => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role_tim.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nim.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="px-6 max-w-[80rem] mx-auto">
      <header className="flex flex-col gap-4 py-4">
        <h3 className="font-semibold text-3xl">User</h3>
        <div className="grid grid-cols-2">
          <Button onClick={() => router.push(`manage-user/create`)} className="w-[5rem] sm:w-[10rem]">
            Add
          </Button>
          <div className="flex justify-end">
            <Input
              className="max-w-[15rem]"
              type="text"
              name="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <DataTable columns={columns} data={filteredUsers} />
    </div>
  );
};

export default UserPage;
