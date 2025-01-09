"use client"

import { ColumnDef } from "@tanstack/react-table"
import ActionButton from "./actionButton"
import { Userssss } from "../lib/definition";
import Image from 'next/image' // Import Image from next/image

export const columns: ColumnDef<Userssss>[] = [
    {
        id: "count",
        header: "#",
        cell: ({ row, }) => {
            return <div className="py-4">{row.index + 1}.</div>
        }
    },
    {
        accessorKey: "picture",
        header: "Picture",
        cell: ({ row }) => {
            const user = row.original;
            return <div className="py-4">
                <Image 
                    src={user.avatar} 
                    alt="user" 
                    className="w-10 h-10 rounded-full" 
                    width={40} // Set width
                    height={40} // Set height
                />
            </div>
        }
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            return <div className="py-4">
                {user.name}
            </div>
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const user = row.original;
            return <div className="py-4">
                {user.email}
            </div>
        }
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const user = row.original;
            return <div className="py-4">
                {user.role}
            </div>
        }
    },
    {
        accessorKey: "role-tim",
        header: "Role Tim",
        cell: ({ row }) => {
            const user = row.original;
            return <div className="py-4">
                {user.role_tim}
            </div>
        }
    },
    {
        id: "action",
        header: () => {
            return <p className="text-center">Action</p>
        },
        cell: ({ row }) => {
            const user = row.original;
            return <ActionButton type="USER" data={user} />
        }
    }
]
