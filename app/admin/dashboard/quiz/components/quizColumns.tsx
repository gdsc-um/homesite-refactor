"use client"

import { ColumnDef } from "@tanstack/react-table"
import ActionButton from "./actionButton"
import { QuizWithAuthor } from "../lib/definition"


export const columns: ColumnDef<QuizWithAuthor>[] = [
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
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
            const quiz = row.original;
            return <div className="py-4 max-w-[10rem]">
                <p className="line-clamp-3">{quiz.content}</p>
            </div>
        }
    },
    {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => {
            const quiz = row.original;
            return <div className="py-4">
                {quiz.author.name}
            </div>
        }
    },
    {
        accessorKey: "isPublished",
        header: "Published",
        cell: ({ row }) => {
            const quiz = row.original;
            return <div className="py-4">
                {quiz.isPublished ? "Yes" : "No"}
            </div>
        }
    },
    {
        id: "total",
        header: () => {
            return <p className="text-center">Total Question</p>
        },
        cell: ({ row }) => {
            const quiz = row.original;
            return <div className="py-4 text-center">{quiz.questions?.length}</div>
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
