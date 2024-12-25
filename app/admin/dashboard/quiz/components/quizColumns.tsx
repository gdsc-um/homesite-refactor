"use client"

import { ColumnDef } from "@tanstack/react-table"
import ActionButton from "./actionButton"
import { Quiz } from "../lib/definition"


export const columns: ColumnDef<Quiz>[] = [
    {
        id: "count",
        header: "#",
        cell: ({ row, }) => {
            return <div className="py-4">{row.index + 1}.</div>
        }
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const quiz = row.original;
            return <div className="py-4">
                {quiz.title}
            </div>
        }
    },
    {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => {
            const quiz = row.original;
            return <div className="py-4">
                {quiz.author}
            </div>
        }
    },
    {
        id: "total",
        header: () => {
            return <p className="text-center">Total Question</p>
        },
        cell: ({ row }) => {
            return <div className="py-4 text-center">4</div>
        }
    },
    {
        id: "action",
        header: () => {
            return <p className="text-center">Action</p>
        },
        cell: ({ row }) => {
            const quiz = row.original;
            return <ActionButton type="QUIZ" data={quiz} />
        }
    },
]
