"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { columns } from "./components/userColumns";
import { USERS } from "./data/users";


const UserPage: FC = () => {
    const router = useRouter();

    return (
        <div className="px-6 max-w-[80rem] mx-auto">
            <header className="flex flex-col gap-4 py-4">
                <h3 className="font-semibold text-3xl ">User</h3>
                <div className="grid grid-cols-2">
                    <Button onClick={() => router.push(`manage-user/create`)} className="w-[5rem] sm:w-[10rem]">Add</Button>
                    <div className="flex justify-end">
                        <Input className="max-w-[15rem]" type="text" name="search" placeholder="Search..." />
                    </div>
                </div>
            </header>

            <DataTable columns={columns} data={USERS} />
        </div>
    )
}

export default UserPage;