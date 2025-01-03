"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { columns } from "./components/quizColumns";
import { QUIZZES } from "./data/quizzes";
import { Quiz, User } from "@prisma/client";
import { QuizWithAuthor } from "./lib/definition";



const QuizPage: FC = () => {
    const [quizzes, setQuizzes] = useState<QuizWithAuthor[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await fetch('/api/quizzes');
            const data = await response.json();
            setQuizzes(data.quizzes);
        }
        fetchQuizzes();
    }, [])

    return (
        <div className="px-6 max-w-[80rem] mx-auto">
            <header className="flex flex-col gap-4 py-4">
                <h3 className="font-semibold text-3xl ">Quiz</h3>
                <div className="grid grid-cols-2">
                    <Button onClick={() => router.push(`quiz/create`)} className="w-[5rem] sm:w-[10rem]">Add</Button>
                    <div className="flex justify-end">
                        <Input className="max-w-[15rem]" type="text" name="search" placeholder="Search..." />
                    </div>
                </div>
            </header>

            <DataTable columns={columns} data={quizzes} />
        </div>
    )
}

export default QuizPage;