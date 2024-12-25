"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"
import ActionButton from "./actionButton"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type QuizOption = {
    answer: string
    image: string
    isCorrect: boolean
}

export type Quiz = {
    uuid: string
    question: string
    image: string
    options: QuizOption[]
    author: string
}

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
        header: "Question",
        cell: ({ row }) => {
            const quiz = row.original;
            return <div className="py-4">
                {quiz.question}
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
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const quiz = row.original;
            return <ActionButton quiz={quiz} />
        }
    },
]
