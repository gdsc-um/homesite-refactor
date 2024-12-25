"use client"

import { ColumnDef } from "@tanstack/react-table"
import ActionButton from "./actionButton"
import { Question, Quiz } from "../lib/definition"


export const columns: ColumnDef<Quiz>[] = [
    {
        id: "count",
        header: "#",
        cell: ({ row, }) => {
            return <div className="py-4">{row.index + 1}.</div>
        }
    },
    {
        accessorKey: "question",
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
        header: "Total Question",
        cell: ({ row }) => {
            return <div className="py-4">4</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const quiz = row.original;
            return <ActionButton type="QUIZ" data={quiz} />
        }
    },
]
