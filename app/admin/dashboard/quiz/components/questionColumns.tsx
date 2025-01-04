"use client"

import { ColumnDef } from "@tanstack/react-table"
import ActionButton from "./actionButton"
import { Questions } from "@prisma/client"


export const columns: ColumnDef<Questions>[] = [
    {
        id: "count",
        header: "#",
        cell: ({ row, }) => {
            return <div className="py-4">{row.index + 1}.</div>
        }
    },
    {
        accessorKey: "question",
        header: "Question",
        cell: ({ row }) => {
            const question = row.original;
            return <div className="py-4">
                {question.question}
            </div>
        }
    },
    {
        id: "action",
        header: () => {
            return <p className="text-center">Action</p>
        },
        cell: ({ row }) => {
            const question = row.original;
            return <ActionButton type="QUESTION" data={question} />
        }
    },
]
